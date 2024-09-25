import Joi from "joi";
// @ts-ignore
import joiObjectId from "joi-objectid";

const objectId = (joiObjectId as any)(Joi);

const locationRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+-[A-Z]{2},\s[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

export const createAboutSchema = Joi.object({
  companyName: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().pattern(locationRegex).required().messages({
    "string.pattern.base": `O campo "localização" deve estar no formato "Cidade-Sigla do estado, País"`,
  }),
});

export const editAboutSchema = Joi.object({
  id: objectId().required(),
  name: Joi.string().required(),
  companyName: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().pattern(locationRegex).required().messages({
    "string.pattern.base": `"location" deve estar no formato "Cidade-Estado, País"`,
  }),
  imagePath: Joi.string().required(),
  imageName: Joi.string().required(),
});
