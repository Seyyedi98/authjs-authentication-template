import prisma from "@/lib/client";

export const getPasswordResetTokenByToken = async (token) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: {
        token,
      },
    });
    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findFirst({
      where: {
        email,
      },
    });
    return passwordResetToken;
  } catch {
    return null;
  }
};
