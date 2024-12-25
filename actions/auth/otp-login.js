"use server";

import { signIn } from "@/auth";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getOtpTokenByPhoneNumber } from "@/data/two-factor-token";
import { getUserByPhoneNumber } from "@/data/user";
import prisma from "@/lib/client";
import { sendTwoFactorTokenEmail } from "@/lib/mail";
import { generateOtpToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { OtpLoginSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

// Login returns 'error', 'success', 'twoFactor'

export const otpLogin = async (values) => {
  // server side values validation
  const validatedFields = OtpLoginSchema.safeParse(values);

  const hashedPassword = await bcrypt.hash("password", 10);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  // code is 2FA code entered by user
  const { phoneNumber, password, code } = validatedFields.data;
  const existingUser = await getUserByPhoneNumber(phoneNumber);

  if (!existingUser) {
    // create new account
    const newUser = await prisma.user.create({
      data: {
        phoneNumber,
        password: hashedPassword,
        isTwoFactorEnabled: true,
        emailVerified: new Date(),
      },
    });

    // Send OTP
    const otpToken = await generateOtpToken(newUser.phoneNumber);
    // await sendTwoFactorTokenEmail(otpToken.phoneNumber, otpToken.token);
    await sendTwoFactorTokenEmail("seyyedi98@outlook.com", otpToken.token);
    return {
      showOtpInput: true,
      success: "رمز یکبار مصرف به موبایل شما ارسال شد",
    }; // Change login page
  }

  // Check 2FA
  if (existingUser.phoneNumber) {
    if (code) {
      const otpToken = await getOtpTokenByPhoneNumber(existingUser.phoneNumber);
      if (!otpToken) return { error: "کد وارد شده اشتباه است" };

      if (otpToken.token !== code) {
        return { error: "کد وارد شده اشتباه است" };
      }

      const hasExpired = new Date(otpToken.expires) < new Date();
      if (hasExpired) {
        return { error: "کد منقضی شده است" };
      }

      await prisma.otpToken.delete({
        where: { id: otpToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await prisma.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const previousOtpToken = await getOtpTokenByPhoneNumber(
        existingUser.phoneNumber
      );
      if (!previousOtpToken) {
        const otpToken = await generateOtpToken(existingUser.phoneNumber);
        // await sendTwoFactorTokenEmail(otpToken.phoneNumber, otpToken.token);
        await sendTwoFactorTokenEmail("seyyedi98@outlook.com", otpToken.token);
        return {
          showOtpInput: true, // Change login page
          success: "رمز عبور یکبار مصرف به موبایل شما ارسال شد",
        };
      } else {
        // If code already sent in last 2 min
        const hasExpired = new Date(previousOtpToken.expires) < new Date();
        if (!hasExpired) {
          return {
            error: "لطفا ۲ دقیقه تا ارسال مجدد کد فعالسازی منتظر باشید",
          };
        } else {
          const otpToken = await generateOtpToken(existingUser.phoneNumber);
          // await sendTwoFactorTokenEmail(otpToken.phoneNumber, otpToken.token);
          await sendTwoFactorTokenEmail(
            "seyyedi98@outlook.com",
            otpToken.token
          );
          return {
            showOtpInput: true, // Change login page
            success: "رمز عبور یکبار مصرف به موبایل شما ارسال شد",
          };
        }
      }
    }
  }

  try {
    await signIn("otpLogin", {
      phoneNumber,
      password: "password",
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
