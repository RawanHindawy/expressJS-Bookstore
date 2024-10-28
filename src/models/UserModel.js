import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addUser = async (user) => {
  return await prisma.user.create({
    data: {
      email: user.email,
      password: user.password,
      age: user.age,
    },
  });
};

export const getUsers = async () => {
  return await prisma.user.findMany();
};

export const getUser = async (id) => {
  return await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
};

export const updateUser = async (id, userData) => {
  return await prisma.user.update({
    where: { id: parseInt(id) },
    data: userData,
  });
};

export const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id: parseInt(id) },
  });
};
