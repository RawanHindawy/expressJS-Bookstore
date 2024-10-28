import express from 'express';
import limiter from '../middleware/RateLimiterMiddleware.js';
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from '../controllers/BookController.js';
import { validateData } from '../middleware/ValidationMiddleware.js';
import { BookSchema } from '../schemas/BookSchema.js';
import { AuthMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBook);
router.post('/', limiter, validateData(BookSchema), createBook);
router.put('/:id', updateBook);
router.delete('/:id', AuthMiddleware, deleteBook);

export default router;
