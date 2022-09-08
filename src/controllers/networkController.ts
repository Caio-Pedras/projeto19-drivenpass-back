import { Request, Response } from "express";
import {
  createNetworkService,
  getNetworksByUserIdService,
  getNetworkByIdService,
  deleteNetworkService,
} from "../services/networkService.js";
export async function createNetwork(req: Request, res: Response) {
  const { userId } = res.locals.userId;
  const network = { ...req.body, userId: Number(userId) };
  await createNetworkService(network);
  return res.sendStatus(201);
}
export async function getNetworks(req: Request, res: Response) {
  const { userId } = res.locals.userId;
  const networks = await getNetworksByUserIdService(Number(userId));
  return res.status(200).send(networks);
}
export async function getNetworkById(req: Request, res: Response) {
  const { id } = req.params;
  const network = await getNetworkByIdService(Number(id));
  return res.status(200).send(network);
}
export async function deleteNetworkById(req: Request, res: Response) {
  const { userId } = res.locals.userId;
  const { id } = req.params;
  await deleteNetworkService(Number(id), Number(userId));
  return res.sendStatus(204);
}
