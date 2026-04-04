import { Joi, Segments } from 'celebrate';

//* ==========================================================
// for POST (/auth/register)
export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    username: Joi.string().trim(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
};

//* ==========================================================
// for POST (/auth/login)
export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
