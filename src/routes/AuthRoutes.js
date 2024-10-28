import express from 'express';
import { login } from '../controllers/AuthController.js';
import { validateData } from '../middleware/ValidationMiddleware.js';
import { LoginSchema } from '../schemas/AuthSchema.js';

const router = express.Router();

router.post('/login', validateData(LoginSchema), login);

export default router;
