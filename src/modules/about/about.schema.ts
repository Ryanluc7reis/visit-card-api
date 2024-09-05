import Joi from "joi";

export const createAboutSchema = Joi.object({
  companyName: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
});
