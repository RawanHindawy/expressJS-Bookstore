import { z } from 'zod';

export const AuthorSchema = z.object({
  name: z.string(),
  bio: z.string(),
});
