const { default: prisma } = require("@/lib/client");

export const getTwoFactorTokenByToken = async (token) => {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findUnique({
      where: token,
    });
    return twoFactorToken();
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email) => {
  try {
    const twoFactorToken = await prisma.TwoFactorToken.findFirst({
      where: { email },
    });

    return twoFactorToken;
  } catch {
    return null;
  }
};

export const getOtpTokenByPhoneNumber = async (phoneNumber) => {
  try {
    const twoOtpToken = await prisma.OtpToken.findFirst({
      where: { phoneNumber },
    });

    return twoOtpToken;
  } catch {
    return null;
  }
};
