import { CREATED, OK } from '../constants/http';
import { loginSchema, registerSchema } from '../schema';
import { createAccount, loginUser } from '../services/auth.service';
import { catchErrors } from '../utils/catchErrors';
import { setAuthCookies } from '../utils/cookies';

export const registerHandler = catchErrors(async (req, res) => {
  // validate request body
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers['user-agent'],
  });

  // call service
  const { user, accessToken, refreshToken } = await createAccount(request);

  // return response
  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json({ user });
});

export const loginHandler = catchErrors(async (req, res) => {
  // validate request body
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers['user-agent'],
  });

  // call service
  const { accessToken, refreshToken } = await loginUser(request);

  // return response
  return setAuthCookies({ res, accessToken, refreshToken }).status(OK).json({
    message: 'Login successful',
  });
});
