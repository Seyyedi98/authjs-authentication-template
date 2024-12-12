"use server";

import bcrypt from "bcryptjs";

import { getUserByEmail } from "@/data/user";
import prisma from "@/lib/client";
import { RegisterSchema } from "@/schemas";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values) => {
  // server side values validation
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { name, email, password } = validatedFields.data;

  // Encrypt use password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if user with this email already registered
  const existingUser = await getUserByEmail(email);

  if (existingUser)
    return { error: "کاربری با این ایمیل قبلا ثبت نام کرده است" };

  // Create user
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "لینک تایید به ایمیل شما ارسال شد" };
};
