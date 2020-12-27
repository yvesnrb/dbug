import { Joi } from 'express-validation';

export default Joi.object({
  code: Joi.string().required(),
});
