import Joi from "joi";
// @ts-ignore
import joiObjectId from "joi-objectid";

const objectId = (joiObjectId as any)(Joi);

export const createLinkSchema = Joi.object({
  links: Joi.array()
    .items(
      Joi.object({
        app: Joi.string().required(),
        url: Joi.string()
          .required()
          .when("app", {
            is: "Whatsapp",
            then: Joi.string()
              .pattern(/^https:\/\/wa\.me\/\d+$/)
              .message(
                'A URL do WhatsApp deve estar no formato: "https://wa.me/<número>".'
              ),
            otherwise: Joi.when("app", {
              is: "Telegram",
              then: Joi.string()
                .pattern(/^https:\/\/t\.me\/\+\d+$/)
                .message(
                  'A URL do Telegram deve estar no formato: "https://t.me/+<número>".'
                ),
              otherwise: Joi.string(),
            }),
          }),
      })
    )
    .required(),
});

export const editLinkSchema = Joi.object({
  id: objectId().required(),
  linkId: objectId().required(),
  app: Joi.string().required(),
  url: Joi.string()
    .required()
    .when("app", {
      is: "Whatsapp",
      then: Joi.string()
        .pattern(/^https:\/\/wa\.me\/\d+$/)
        .message(
          'A URL do WhatsApp deve estar no formato: "https://wa.me/<número>".'
        ),
      otherwise: Joi.when("app", {
        is: "Telegram",
        then: Joi.string()
          .pattern(/^https:\/\/t\.me\/\+\d+$/)
          .message(
            'A URL do Telegram deve estar no formato: "https://t.me/+<número>".'
          ),
        otherwise: Joi.string(),
      }),
    }),
});

export const deleteLinkSchema = Joi.object({
  id: objectId().required(),
  linkId: objectId().required(),
});
