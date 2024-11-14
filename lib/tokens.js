import { getVerificatoinTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import prisma from "./client";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";

export const generateVerificationToken = async (email) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // Expire token in an hour

  // If there is a verification tokne, delete it and generate new one
  const existingToken = await getVerificatoinTokenByEmail(email);
  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // Expire token in an hour
  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};
