import { Router } from 'express';
import { loginHandler, registerHandler } from '../controllers/auth.controller';

const authRoutes = Router();

// POST /auth
authRoutes.post('/register', registerHandler);
authRoutes.post('/login', loginHandler);

export { authRoutes };
