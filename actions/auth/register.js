"use server";

import bcrypt from "bcrypt";

import { RegisterSchema } from "@/schemas";
import prisma from "@/lib/client";
import { getUserByEmail } from "@/data/user";

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

  if (existingUser) return { error: "Email already in use" };

  // Create user
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  //TODO: send verification token email

  return { success: "User created" };
};
