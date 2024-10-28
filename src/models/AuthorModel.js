import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addAuthor = async (author) => {
  return await prisma.author.create({
    data: {
      name: author.name,
      bio: author.bio,
    },
  });
};

export const getAuthors = async () => {
  return await prisma.author.findMany();
};

export const getAuthor = async (id) => {
  return await prisma.author.findUnique({
    where: { id: parseInt(id) },
  });
};

export const updateAuthor = async (id, authorData) => {
  return await prisma.author.update({
    where: { id: parseInt(id) },
    data: authorData,
  });
};

export const deleteAuthor = async (id) => {
  const author = await prisma.author.findUnique({
    where: { id: parseInt(id) },
  });

  if (!author) {
    throw { status: 404, message: 'Author not found' };
  }
  return await prisma.author.delete({
    where: { id: parseInt(id) },
  });
};
