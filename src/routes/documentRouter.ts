import { Router } from "express";
import {
  createDocument,
  deleteDocumentById,
  getDocumentById,
  getDocuments,
} from "../controllers/documentController.js";
import { schemaValidator } from "../middlewares/validateSchema.js";
import { tokenValidator } from "../middlewares/validateToken.js";
import documentSchema from "../schemas/documentSchema.js";

const documentRouter = Router();
documentRouter.post(
  "/documents",
  tokenValidator,
  schemaValidator(documentSchema),
  createDocument
);
documentRouter.get("/documents", tokenValidator, getDocuments);
documentRouter.get("/documents/:id", tokenValidator, getDocumentById);
documentRouter.delete("/documents/:id", tokenValidator, deleteDocumentById);
export default documentRouter;
