import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 100; i++) {
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: faker.internet.password(),
        age: faker.number.int({ min: 18, max: 80 }),
      },
    });
  }

  for (let i = 0; i < 50; i++) {
    await prisma.author.create({
      data: {
        name: faker.person.fullName(),
        bio: faker.lorem.paragraph(),
      },
    });
  }

  const authors = await prisma.author.findMany();
  for (let i = 0; i < 20; i++) {
    await prisma.book.create({
      data: {
        title: faker.lorem.words({ min: 1, max: 5 }),
        description: faker.lorem.paragraph(),
        publicationYear: faker.number.int({ min: 1900, max: 2023 }),
        authorId: authors[Math.floor(Math.random() * authors.length)].id,
      },
    });
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
