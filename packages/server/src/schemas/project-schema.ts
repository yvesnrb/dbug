import { Joi } from 'express-validation';

export const newProjectSchema = Joi.object({
  body: Joi.string().min(25).max(500).message('invalid project body'),
});

export const projectQuerySchema = Joi.object({
  page: Joi.number().default(0),
  limit: Joi.number().default(10),
  isArchived: Joi.boolean().default(false),
  myOwn: Joi.boolean().default(false),
});
