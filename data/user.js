import prisma from "@/lib/client";

export const getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch {
    return null;
  }
};

export const getUserByPhoneNumber = async (phoneNumber) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        phoneNumber,
      },
    });
    return user;
  } catch {
    return null;
  }
};
