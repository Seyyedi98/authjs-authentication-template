"use server";

import { signIn } from "@/auth";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import prisma from "@/lib/client";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

// Login returns 'error', 'success', 'twoFactor'

export const login = async (values) => {
  // server side values validation
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  // code is 2FA code entered by user
  const { email, password, code } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "نام کاربری یا رمز عبور اشتباه است" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "لینک فعالسازی به ایمیل شما ارسال شد" };
  }

  // Check 2FA
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken) return { error: "کد نامعتبر" };

      if (twoFactorToken.token !== code) {
        return { error: "کد وارد شده اشتباه است", twoFactor: false };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) {
        return { error: "کد منقضی شده است" };
      }

      await prisma.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
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
      // Enter 2FA code menu
      const previousTwoFactorToken = await getTwoFactorTokenByEmail(
        existingUser.email
      );
      // Send 2FA code for first time
      if (!previousTwoFactorToken) {
        const twoFactorToken = await generateTwoFactorToken(existingUser.email);
        await sendTwoFactorTokenEmail(
          twoFactorToken.email,
          twoFactorToken.token
        );
        return { twoFactor: true }; // Change login page
      } else {
        // If code already sent in last 2 min
        const hasExpired =
          new Date(previousTwoFactorToken.expires) < new Date();
        if (!hasExpired) {
          return {
            error: "لطفا ۲ دقیقه تا ارسال مجدد کد فعالسازی منتظر باشید",
          };
        } else {
          // send new code
          const twoFactorToken = await generateTwoFactorToken(
            existingUser.email
          );
          await sendTwoFactorTokenEmail(
            twoFactorToken.email,
            twoFactorToken.token
          );
          return {
            twoFactor: true, // Change login page
            success: "رمز عبور یکبار مصرف به موبایل شما ارسال شد",
          };
        }
      }
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "رمز عبور اشتباه است" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
