import { Request, Response } from "express";
import {
  createSafeNoteService,
  deleteSafeNoteService,
  getSafeNoteByIdService,
  getSafeNotesByUserIdService,
} from "../services/safeNoteService.js";

export async function createSafeNote(req: Request, res: Response) {
  const { userId } = res.locals.userId;
  const safeNote = { ...req.body, userId: Number(userId) };
  await createSafeNoteService(safeNote);
  return res.sendStatus(201);
}
export async function getSafeNotes(req: Request, res: Response) {
  const { userId } = res.locals.userId;
  const safeNotes = await getSafeNotesByUserIdService(Number(userId));
  return res.status(200).send(safeNotes);
}
export async function getSafeNoteById(req: Request, res: Response) {
  const { id } = req.params;
  const safeNote = await getSafeNoteByIdService(Number(id));
  return res.status(200).send(safeNote);
}
export async function deleteSafeNoteById(req: Request, res: Response) {
  const { userId } = res.locals.userId;
  const { id } = req.params;
  await deleteSafeNoteService(Number(id), Number(userId));
  return res.sendStatus(204);
}
