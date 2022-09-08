import { Router } from "express";
import {
  createSafeNote,
  deleteSafeNoteById,
  getSafeNoteById,
  getSafeNotes,
} from "../controllers/safeNotesController.js";
import { schemaValidator } from "../middlewares/validateSchema.js";
import { tokenValidator } from "../middlewares/validateToken.js";
import safeNoteSchema from "../schemas/safeNoteSchema.js";

const safeNoteRouter = Router();
safeNoteRouter.post(
  "/safenotes",
  tokenValidator,
  schemaValidator(safeNoteSchema),
  createSafeNote
);
safeNoteRouter.get("/safenotes", tokenValidator, getSafeNotes);
safeNoteRouter.get("/safenotes/:id", tokenValidator, getSafeNoteById);
safeNoteRouter.delete("/safenotes/:id", tokenValidator, deleteSafeNoteById);
export default safeNoteRouter;
