import { CREATED } from '../constants/http';
import { registerSchema } from '../schema';
import { createAccount } from '../services/auth.service';
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
