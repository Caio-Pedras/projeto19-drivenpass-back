import { Router } from "express";
import {
  createCard,
  deleteCardById,
  getCardById,
  getCards,
} from "../controllers/cardController.js";
import { schemaValidator } from "../middlewares/validateSchema.js";
import { tokenValidator } from "../middlewares/validateToken.js";
import cardSchema from "../schemas/cardSchema.js";

const cardRouter = Router();

cardRouter.post(
  "/cards",
  tokenValidator,
  schemaValidator(cardSchema),
  createCard
);
cardRouter.get("/cards", tokenValidator, getCards);
cardRouter.get("/cards/:id", tokenValidator, getCardById);
cardRouter.delete("/cards/:id", tokenValidator, deleteCardById);

export default cardRouter;
