import { Request, Response } from "express";
import {
  createCardService,
  deleteCardService,
  getCardByIdService,
  getCardByUserIdService,
} from "../services/cardService.js";

export async function createCard(req: Request, res: Response) {
  const { userId } = res.locals.userId;
  const card = { ...req.body, userId: Number(userId) };
  await createCardService(card);
  return res.sendStatus(201);
}
export async function getCards(req: Request, res: Response) {
  const { userId } = res.locals.userId;
  const cards = await getCardByUserIdService(Number(userId));
  return res.status(200).send(cards);
}
export async function getCardById(req: Request, res: Response) {
  const { id } = req.params;
  const card = await getCardByIdService(Number(id));
  return res.status(200).send(card);
}
export async function deleteCardById(req: Request, res: Response) {
  const { userId } = res.locals.userId;
  const { id } = req.params;
  await deleteCardService(Number(id), Number(userId));
  return res.sendStatus(204);
}
