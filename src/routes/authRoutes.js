import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validations/authValidation.js';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
  requestResetEmail,
  resetPassword,
} from '../controllers/authController.js';

const router = Router();

// POST /auth/register
router.post('/auth/register', celebrate(registerUserSchema), registerUser);

// POST /auth/login
router.post('/auth/login', celebrate(loginUserSchema), loginUser);

// POST /auth/refresh
router.post('/auth/refresh', refreshUserSession);

// POST /auth/logout
router.post('/auth/logout', logoutUser);

// POST /auth/request-reset-email
router.post(
  '/auth/request-reset-email',
  celebrate(requestResetEmailSchema),
  requestResetEmail,
);

// POST /auth/reset-password
router.post(
  '/auth/reset-password',
  celebrate(resetPasswordSchema),
  resetPassword,
);

export default router;
