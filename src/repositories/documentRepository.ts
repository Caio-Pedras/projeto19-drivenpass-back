import { prisma } from "./../config/database.js";
import { createDocumentData } from "../services/DocumentService.js";

export async function findDocumentByTitle(title: string, userId: number) {
  return prisma.document.findFirst({ where: { title, userId } });
}
export async function insertDocument(data: createDocumentData) {
  return prisma.document.create({ data });
}
export async function getUserDocuments(userId: number) {
  return prisma.document.findMany({ where: { userId } });
}
export async function getDocumentById(id: number) {
  return prisma.document.findUnique({ where: { id } });
}
export async function deleteDocumentById(id: number) {
  return prisma.document.delete({ where: { id } });
}
