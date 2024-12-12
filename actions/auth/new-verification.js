"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificatoinTokenByToken } from "@/data/verification-token";
import prisma from "@/lib/client";

export const newVerification = async (token) => {
  const existingToken = await getVerificatoinTokenByToken(token);

  if (!existingToken) return { error: "Token does not found!" };

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) return { error: "Token has expired" };

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingToken) {
    return { error: "ایمیل وجود ندارد" };
  }

  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email, // In case if user wants to change their email
    },
  });

  await prisma.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "ایمیل با موفقیت تایید شد" };
};
