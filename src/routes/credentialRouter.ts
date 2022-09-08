import { Router } from "express";
import {
  createCredential,
  deleteCredentialById,
  getCredentialById,
  getCredentials,
} from "../controllers/credentialController.js";
import { schemaValidator } from "../middlewares/validateSchema.js";
import { tokenValidator } from "../middlewares/validateToken.js";
import credentialSchema from "../schemas/credentialSchema.js";

const credentialRouter = Router();

credentialRouter.post(
  "/credentials",
  tokenValidator,
  schemaValidator(credentialSchema),
  createCredential
);
credentialRouter.get("/credentials", tokenValidator, getCredentials);
credentialRouter.get("/credentials/:id", tokenValidator, getCredentialById);
credentialRouter.delete(
  "/credentials/:id",
  tokenValidator,
  deleteCredentialById
);

export default credentialRouter;
