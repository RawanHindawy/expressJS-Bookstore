import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email, password },
    select: {
      id: true,
      email: true,
      password: false,
      age: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
