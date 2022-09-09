import { Router } from "express";
import authRouter from "./authRouter.js";
import cardRouter from "./cardRouter.js";
import credentialRouter from "./credentialRouter.js";
import documentRouter from "./documentRouter.js";
import networkRouter from "./networkRouter.js";
import safeNoteRouter from "./safeNoteRouter.js";

const router = Router();
router.use(authRouter);
router.use(credentialRouter);
router.use(safeNoteRouter);
router.use(cardRouter);
router.use(networkRouter);
router.use(documentRouter);
export default router;
