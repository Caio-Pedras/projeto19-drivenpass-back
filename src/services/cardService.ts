import { Card } from "@prisma/client";
import {
  deleteCardById,
  findCardByTitle,
  getCardById,
  getUserCards,
  insertCard,
} from "../repositories/cardRepository.js";
import {
  cryptrDecryptString,
  cryptrEncryptString,
} from "../utils/encryptUtils.js";

import {
  badRequestError,
  notFoundError,
  unauthorizedError,
} from "../utils/errorUtils.js";
export type createCardData = Omit<Card, "id">;

export async function createCardService(data: createCardData) {
  await checkCardIsUnique(data.title, data.userId);
  const password = cryptrEncryptString(data.password);
  const securityCode = cryptrEncryptString(data.securityCode);
  await insertCard({ ...data, password, securityCode });
  return;
}
export async function getCardByUserIdService(userId: number) {
  let cards = await getUserCards(userId);
  cards?.map((card) => {
    card.password = cryptrDecryptString(card.password);
    card.securityCode = cryptrDecryptString(card.securityCode);
  });
  return cards;
}
export async function getCardByIdService(id: number) {
  let card = await getCardById(id);
  if (!card) {
    throw notFoundError("Card not found");
  }
  card.password = cryptrDecryptString(card.password);
  card.securityCode = cryptrDecryptString(card.securityCode);
  return card;
}
export async function deleteCardService(id: number, userId: number) {
  const card = await getCardById(id);
  if (!card) {
    throw notFoundError("card not found");
  }
  if (card.userId !== userId) {
    throw unauthorizedError("Unauthorized operation");
  }
  await deleteCardById(id);
  return;
}

async function checkCardIsUnique(title: string, userId: number) {
  const validateTitle = await findCardByTitle(title, userId);
  if (validateTitle) {
    throw badRequestError("title already used");
  }
}
