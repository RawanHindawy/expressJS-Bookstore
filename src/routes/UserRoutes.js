import express from 'express';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/UserController.js';
import { validateData } from '../middleware/ValidationMiddleware.js';
import { UserSchema } from '../schemas/UserSchema.js';
import { AuthMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', AuthMiddleware, validateData(UserSchema), createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
