import { z } from 'zod';

export const BookSchema = z.object({
  title: z.string(),
  description: z.string(),
  publicationYear: z.number().int().min(1000).max(new Date().getFullYear()),
  authorId: z.number().int().positive(),
});
