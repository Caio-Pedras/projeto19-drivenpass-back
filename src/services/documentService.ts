import { Document } from "@prisma/client";
import {
  deleteDocumentById,
  findDocumentByTitle,
  getDocumentById,
  getUserDocuments,
  insertDocument,
} from "../repositories/documentRepository.js";

import {
  badRequestError,
  notFoundError,
  unauthorizedError,
} from "../utils/errorUtils.js";
export type createDocumentData = Omit<Document, "id">;

export async function createDocumentService(data: createDocumentData) {
  await checkDocumentIsUnique(data.title, data.userId);
  await insertDocument({ ...data });
  return;
}
export async function getDocumentsByUserIdService(userId: number) {
  let Documents = await getUserDocuments(userId);
  return Documents;
}
export async function getDocumentByIdService(id: number) {
  const Document = await getDocumentById(id);
  if (!Document) {
    throw notFoundError("Document not found");
  }

  return { ...Document };
}
export async function deleteDocumentService(id: number, userId: number) {
  const Document = await getDocumentById(id);
  if (!Document) {
    throw notFoundError("Document not found");
  }
  if (Document.userId !== userId) {
    throw unauthorizedError("Unauthorized operation");
  }
  await deleteDocumentById(id);
  return;
}

async function checkDocumentIsUnique(title: string, userId: number) {
  const validateTitle = await findDocumentByTitle(title, userId);
  if (validateTitle) {
    throw badRequestError("title already used");
  }
}
