import express from 'express';
import {
  createAuthor,
  deleteAuthor,
  getAuthor,
  getAuthors,
  updateAuthor,
} from '../controllers/AuthorController.js';
import { validateData } from '../middleware/ValidationMiddleware.js';
import { AuthorSchema } from '../schemas/AuthorSchema.js';
import { AuthMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAuthors);
router.get('/:id', getAuthor);
router.post('/', validateData(AuthorSchema), createAuthor);
router.put('/:id', updateAuthor);
router.delete('/:id', AuthMiddleware, deleteAuthor);

export default router;
