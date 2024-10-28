import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addBook = async (bookData) => {
  try {
    const book = await prisma.book.create({
      data: bookData,
    });
    return book;
  } catch (error) {
    throw new Error(`Failed to add book: ${error.message}`);
  }
};

export const getBooks = async (queryParams) => {
  try {
    const page = parseInt(queryParams.page) || 1;
    const pageSize = parseInt(queryParams.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    const whereClause = {
      ...(queryParams.title && {
        title: { contains: queryParams.title, mode: 'insensitive' },
      }),
      ...(queryParams.description && {
        description: { contains: queryParams.description, mode: 'insensitive' },
      }),
      ...((queryParams.publicationYearFrom ||
        queryParams.publicationYearTo) && {
        publicationYear: {
          ...(queryParams.publicationYearFrom && {
            gte: parseInt(queryParams.publicationYearFrom),
          }),
          ...(queryParams.publicationYearTo && {
            lte: parseInt(queryParams.publicationYearTo),
          }),
        },
      }),
      ...(queryParams.authorId && { authorId: parseInt(queryParams.authorId) }),
      ...(queryParams.authorName && {
        author: {
          name: { contains: queryParams.authorName, mode: 'insensitive' },
        },
      }),
    };

    const [books, totalCount] = await Promise.all([
      prisma.book.findMany({
        where: whereClause,
        select: {
          id: true,
          title: true,
          description: true,
          publicationYear: true,
          author: true,
        },
        skip: skip,
        take: pageSize,
        orderBy: {
          [queryParams.sortBy || 'id']: queryParams.sortOrder || 'asc',
        },
      }),
      prisma.book.count({ where: whereClause }),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      data: books,
      pagination: {
        page,
        pageSize,
        totalCount,
        totalPages,
      },
    };
  } catch (error) {
    throw new Error(`Failed to get books: ${error.message}`);
  }
};

export const getBook = async (id) => {
  try {
    const book = await prisma.book.findUnique({
      where: { id: parseInt(id) },
    });
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
  } catch (error) {
    throw new Error(`Failed to get book: ${error.message}`);
  }
};

export const updateBook = async (id, bookData) => {
  try {
    const book = await prisma.book.update({
      where: { id: parseInt(id) },
      data: bookData,
    });
    return book;
  } catch (error) {
    throw new Error(`Failed to update book: ${error.message}`);
  }
};

export const deleteBook = async (id) => {
  const book = await prisma.book.findUnique({
    where: { id: parseInt(id) },
  });
  if (!book) {
    throw { status: 404, message: 'Book not found' };
  }
  return await prisma.book.delete({
    where: { id: parseInt(id) },
  });
};
