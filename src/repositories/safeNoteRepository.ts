import { prisma } from "./../config/database.js";
import { createSafeNoteData } from "../services/safeNoteService.js";

export async function findSafeNoteByTitle(title: string, userId: number) {
  return prisma.safeNote.findFirst({ where: { title, userId } });
}
export async function insertSafeNote(data: createSafeNoteData) {
  return prisma.safeNote.create({ data });
}
export async function getUserSafeNotes(userId: number) {
  return prisma.safeNote.findMany({ where: { userId } });
}
export async function getSafeNoteById(id: number) {
  return prisma.safeNote.findUnique({ where: { id } });
}
export async function deleteSafeNoteById(id: number) {
  return prisma.safeNote.delete({ where: { id } });
}
