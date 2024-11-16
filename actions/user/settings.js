"use server";
import { getUserByEmail, getUserById } from "@/data/user";
import prisma from "@/lib/client";
import { currentUser } from "@/lib/get-user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import bcrypt from "bcryptjs";
export const settings = async (values) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email allready in user." };
    }

    const verficationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(verficationToken.email, verficationToken.token);

    return { success: "Verification email sent!" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwrdsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwrdsMatch) {
      return { error: "Incorret Password" };
    }
    if (values.password === values.newPassword) {
      return { error: "Cant use tour current password" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await prisma.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...values,
    },
  });

  return { success: "Settings Updated!" };
};
