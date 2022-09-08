import { Router } from "express";
import {
  createNetwork,
  deleteNetworkById,
  getNetworkById,
  getNetworks,
} from "../controllers/networkController.js";
import { schemaValidator } from "../middlewares/validateSchema.js";
import { tokenValidator } from "../middlewares/validateToken.js";
import networkSchema from "../schemas/networkSchema.js";

const networkRouter = Router();
networkRouter.post(
  "/networks",
  tokenValidator,
  schemaValidator(networkSchema),
  createNetwork
);
networkRouter.get("/networks", tokenValidator, getNetworks);
networkRouter.get("/networks/:id", tokenValidator, getNetworkById);
networkRouter.delete("/networks/:id", tokenValidator, deleteNetworkById);
export default networkRouter;
