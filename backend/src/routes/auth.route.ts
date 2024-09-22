import { Router } from 'express';
import {
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
  sendPasswordHandler,
  verifyEmailHandler,
} from '../controllers/auth.controller';

const authRoutes = Router();

// prefix /auth
authRoutes.post('/register', registerHandler);
authRoutes.post('/login', loginHandler);
authRoutes.get('/logout', logoutHandler);
authRoutes.get('/refresh', refreshHandler);
authRoutes.get('/email/verify/:code', verifyEmailHandler);
authRoutes.post('/password/forgot', sendPasswordHandler);

export { authRoutes };
