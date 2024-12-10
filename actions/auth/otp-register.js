"use server";

import bcrypt from "bcryptjs";

import { getUserByPhoneNumber } from "@/data/user";
import prisma from "@/lib/client";
import { OtpRegisterSchema } from "@/schemas";

export const otpRegister = async (values) => {
  // server side values validation
  const validatedFields = OtpRegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { name, phoneNumber, password } = validatedFields.data;

  // Encrypt use password
  const hashedPassword = await bcrypt.hash("password", 10);

  // Check if user with this email already registered
  const existingUser = await getUserByPhoneNumber(phoneNumber);

  if (existingUser) return { error: "Phone Number already in use" };

  // Create user
  await prisma.user.create({
    data: {
      name,
      phoneNumber,
      password: hashedPassword,
      isTwoFactorEnabled: true,
      emailVerified: new Date(),
    },
  });

  return { success: "Account Created!" };
};
