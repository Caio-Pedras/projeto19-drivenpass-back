import { prisma } from "./../config/database.js";
import { createCredentialData } from "../services/credentialService.js";

export async function FindCredentialByTitle(title: string, userId: number) {
  return prisma.credential.findFirst({ where: { title, userId } });
}
export async function insertCredential(data: createCredentialData) {
  return prisma.credential.create({ data });
}
export async function getUserCredentials(userId: number) {
  return prisma.credential.findMany({ where: { userId } });
}
export async function getCredentialById(id: number) {
  return prisma.credential.findUnique({ where: { id } });
}
export async function deleteCredentialById(id: number) {
  return prisma.credential.delete({ where: { id } });
}
