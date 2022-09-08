import joi from "joi";

const networkSchema = joi.object({
  title: joi.string().required(),
  network: joi.string().required(),
  password: joi.string().required(),
});
export default networkSchema;
