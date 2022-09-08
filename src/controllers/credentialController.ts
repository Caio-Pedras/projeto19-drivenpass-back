import { Request, Response } from "express";
import * as credentialService from "../services/credentialService.js";
export async function createCredential(req: Request, res: Response) {
  const { userId } = res.locals.userId;

  console.log(userId);
  const data = { ...req.body, userId: Number(userId) };
  await credentialService.createCredential(data);
  return res.sendStatus(201);
}
export async function getCredentials(req: Request, res: Response) {
  const { userId } = res.locals.userId;
  const credentials = await credentialService.getCredentialsByUserId(
    Number(userId)
  );
  return res.status(200).send(credentials);
}
export async function getCredentialById(req: Request, res: Response) {
  const { id } = req.params;
  const credential = await credentialService.getCredential(Number(id));
  return res.status(200).send(credential);
}
export async function deleteCredentialById(req: Request, res: Response) {
  const { userId } = res.locals.userId;
  const { id } = req.params;
  await credentialService.deleteCredential(Number(id), Number(userId));
  return res.sendStatus(204);
}
