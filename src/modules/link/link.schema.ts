import Joi from "joi";

export const createLinkSchema = Joi.object({
  links: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().required(),
        app: Joi.string().required(),
      })
    )
    .required(),
});
