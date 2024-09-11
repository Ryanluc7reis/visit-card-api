import Joi from "joi";

export const signupUserSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .max(50)
    .message('O campo "nome" pode ter no máximo {{#limit}} caracters.'),
  lastName: Joi.string()
    .required()
    .max(50)
    .message('O campo "nome" pode ter no máximo {{#limit}} caracters.'),
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
});
export const loginSchema = Joi.object({
  userOrEmail: Joi.string().required(),
  password: Joi.string().required(),
});
