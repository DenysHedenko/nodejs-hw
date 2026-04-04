import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
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

export default router;
