import Joi from "joi";
// @ts-ignore
import joiObjectId from "joi-objectid";

const objectId = (joiObjectId as any)(Joi);

export const signupUserSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .max(50)
    .message(
      'O campo "Primeiro nome" pode ter no máximo {{#limit}} caracters.'
    ),
  lastName: Joi.string()
    .required()
    .max(50)
    .message('O campo "Sobrenome" pode ter no máximo {{#limit}} caracters.'),
  user: Joi.string()
    .required()
    .max(30)
    .message('O campo "usuário" pode ter no máximo {{#limit}} caracters.'),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .max(100)
    .messages({
      "string.email": `Por favor digite um e-mail válido.`,
      "string.max": `O campo "email" pode ter no máximo {{#limit}} caracteres.`,
    }),

  password: Joi.string()
    .required()
    .max(50)
    .message('O campo "usuário" pode ter no máximo {{#limit}} caracters.')
    .min(6)
    .message('O campo "senha" precisa ter no minimo {{#limit}} caracters.'),
  number: Joi.string()
    .pattern(/^[0-9]{12,15}$/)
    .required()
    .messages({
      "string.pattern.base": `O campo "número" deve estar no formato: código do país + DDD + número.`,
    }),
});
export const loginSchema = Joi.object({
  userOrEmail: Joi.string().required(),
  password: Joi.string().required(),
});
export const editUserSchema = Joi.object({
  id: objectId().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .max(100)
    .messages({
      "string.email": `Por favor digite um e-mail válido.`,
      "string.max": `O campo "email" pode ter no máximo {{#limit}} caracteres.`,
    }),
  number: Joi.string()
    .pattern(/^[0-9]{12,15}$/)
    .required()
    .messages({
      "string.pattern.base": `O campo "número" deve estar no formato: código do país + DDD + número.`,
    }),
  password: Joi.string()
    .required()
    .min(6)
    .message('O campo "senha" precisa ter no minimo {{#limit}} caracters.'),
});
export const verifyPasswordSchema = Joi.object({
  password: Joi.string().required(),
});
