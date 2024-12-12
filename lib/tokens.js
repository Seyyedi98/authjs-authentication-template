import { getVerificatoinTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import prisma from "./client";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import crypt from "crypto";
import {
  getOtpTokenByPhoneNumber,
  getTwoFactorTokenByEmail,
} from "@/data/two-factor-token";

export const generateTwoFactorToken = async (email) => {
  const token = String(crypt.randomInt(100_000, 1_000_000));
  const expires = new Date(new Date().getTime() + 2 * 60 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await prisma.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
  }

  const twoFactorToken = await prisma.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return twoFactorToken;
};

export const generateOtpToken = async (phoneNumber) => {
  const token = String(crypt.randomInt(100_000, 1_000_000));
  const expires = new Date(new Date().getTime() + 2 * 60 * 1000);

  const existingToken = await getOtpTokenByPhoneNumber(phoneNumber);
  if (existingToken) {
    await prisma.otpToken.delete({
      where: { id: existingToken.id },
    });
  }

  const otpToken = await prisma.otpToken.create({
    data: {
      phoneNumber,
      token,
      expires,
    },
  });
  return otpToken;
};

export const generateVerificationToken = async (email) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000); // Expire token in an hour

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
