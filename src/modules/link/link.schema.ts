import Joi from "joi";
// @ts-ignore
import joiObjectId from "joi-objectid";

const objectId = (joiObjectId as any)(Joi);

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
export const editLinkSchema = Joi.object({
  id: objectId().required(), // ID do documento pai
  linkId: objectId().required(), // ID do item específico dentro do array
  url: Joi.string().required(),
  app: Joi.string().required(),
});
