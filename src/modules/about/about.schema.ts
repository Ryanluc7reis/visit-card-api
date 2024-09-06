import Joi from "joi";
// @ts-ignore
import joiObjectId from "joi-objectid";

const objectId = (joiObjectId as any)(Joi);

export const createAboutSchema = Joi.object({
  companyName: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
});
export const editAboutSchema = Joi.object({
  id: objectId().required(),
  companyName: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
});
