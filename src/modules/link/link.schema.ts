import Joi from "joi";

export const createLinkSchema = Joi.object({
  url: Joi.string().required(),
  app: Joi.string().required(),
});
