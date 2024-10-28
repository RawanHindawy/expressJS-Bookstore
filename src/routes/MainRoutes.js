import express from 'express';
import UserRouter from './UserRoutes.js';
import AuthRouter from './AuthRoutes.js';
import AuthorRouter from './AuthorRoutes.js';
import BookRouter from './BookRoutes.js';
const router = express.Router();

router.use('/users', UserRouter);
router.use('/authors', AuthorRouter);
router.use('/auth', AuthRouter);
router.use('/books', BookRouter);

export default router;
