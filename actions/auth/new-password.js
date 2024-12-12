"use server";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import prisma from "@/lib/client";
import { NewPasswordSchema } from "@/schemas";
import bcrypt from "bcryptjs";

export const newPassword = async (values, token) => {
  if (!token) return { error: "Missing Token!" };

  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) return { error: "Invalid token" };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token has expired!" };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingToken) return { error: "کاربری با این ایمیل یافت نشد" };

  const hashedPassword = await bcrypt.hash(password, 10);

  // Change password in database
  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  // Delete change password token in db
  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "رمز عبور تغییر یافت" };
};
