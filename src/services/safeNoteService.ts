import { SafeNote } from "@prisma/client";
import {
  deleteSafeNoteById,
  findSafeNoteByTitle,
  getSafeNoteById,
  getUserSafeNotes,
  insertSafeNote,
} from "../repositories/safeNoteRepository.js";
import {
  badRequestError,
  notFoundError,
  unauthorizedError,
} from "../utils/errorUtils.js";
export type createSafeNoteData = Omit<SafeNote, "id">;

export async function createSafeNoteService(data: createSafeNoteData) {
  await checkSafeNoteIsUnique(data.title, data.userId);
  await insertSafeNote(data);
  return;
}
export async function getSafeNotesByUserIdService(userId: number) {
  const safeNotes = await getUserSafeNotes(userId);
  return safeNotes;
}
export async function getSafeNoteByIdService(id: number) {
  const safeNote = await getSafeNoteById(id);
  if (!safeNote) {
    throw notFoundError("SafeNote not found");
  }
  return safeNote;
}
export async function deleteSafeNoteService(id: number, userId: number) {
  const safeNote = await getSafeNoteById(id);
  if (!safeNote) {
    throw notFoundError("Safe Note not found");
  }
  if (safeNote.userId !== userId) {
    throw unauthorizedError("Unauthorized operation");
  }
  await deleteSafeNoteById(id);
  return;
}

async function checkSafeNoteIsUnique(title: string, userId: number) {
  const validateTitle = await findSafeNoteByTitle(title, userId);
  if (validateTitle) {
    throw badRequestError("title already used");
  }
}
