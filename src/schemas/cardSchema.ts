import joi from "joi";

const cardSchema = joi.object({
  title: joi.string().required(),
  number: joi.string().creditCard().required(),
  cardHolderName: joi.string().required(),
  securityCode: joi
    .string()
    .pattern(/[0-9]$/)
    .min(3)
    .max(3)
    .required(),
  expirationDate: joi
    .string()
    .pattern(/^((0[1-9])|(1[0-2]))\/(\d{2})|((0[1-9])|(1[0-2]))\-(\d{2})$/)
    .required(),
  password: joi
    .string()
    .pattern(/[0-9]$/)
    .min(4)
    .max(6)
    .required(),
  isVirtual: joi.boolean().required(),
  type: joi.string().valid("credit", "debit", "both").required(),
});
export default cardSchema;
