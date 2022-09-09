import { Request, Response } from "express";
import {
  createDocumentService,
  getDocumentsByUserIdService,
  getDocumentByIdService,
  deleteDocumentService,
} from "../services/documentService.js";
export async function createDocument(req: Request, res: Response) {
  const { userId } = res.locals.userId;
  const document = { ...req.body, userId: Number(userId) };
  await createDocumentService(document);
  return res.sendStatus(201);
}
export async function getDocuments(req: Request, res: Response) {
  const { userId } = res.locals.userId;
  const documents = await getDocumentsByUserIdService(Number(userId));
  return res.status(200).send(documents);
}
export async function getDocumentById(req: Request, res: Response) {
  const { id } = req.params;
  const document = await getDocumentByIdService(Number(id));
  return res.status(200).send(document);
}
export async function deleteDocumentById(req: Request, res: Response) {
  const { userId } = res.locals.userId;
  const { id } = req.params;
  await deleteDocumentService(Number(id), Number(userId));
  return res.sendStatus(204);
}
