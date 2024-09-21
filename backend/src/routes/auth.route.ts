import { Router } from 'express';
import { registerHandler } from '../controllers/auth.controller';

const authRoutes = Router();

// POST /auth/register
authRoutes.post('/register', registerHandler);

export { authRoutes };
