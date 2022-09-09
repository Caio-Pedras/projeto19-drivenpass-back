import joi from "joi";

const documentSchema = joi.object({
  title: joi.string().required(),
  type: joi.string().valid("CNH", "RG").required(),
  name: joi.string().required(),
  issueDate: joi
    .string()
    .pattern(/^((0[1-9])|(1[0-2]))\/(\d{2})|((0[1-9])|(1[0-2]))\-(\d{2})$/)
    .required(),
  registerNumber: joi.string().required(),
  issuingBody: joi.string().required(),
});
export default documentSchema;
