import { Joi } from 'express-validation';

export default Joi.object({
  meet: Joi.string().email().message('invalid meet address'),
  discord: Joi.string()
    .regex(/^((.{2,32})#\d{4})/)
    .message('invalid discord username'),
  zoom: Joi.string().min(2).max(20).message('invalid zoom username'),
}).min(1);
