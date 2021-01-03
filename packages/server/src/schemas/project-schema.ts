import { Joi } from 'express-validation';

// eslint-disable-next-line import/prefer-default-export
export const newProjectSchema = Joi.object({
  body: Joi.string().min(25).max(500).message('invalid project body'),
});
