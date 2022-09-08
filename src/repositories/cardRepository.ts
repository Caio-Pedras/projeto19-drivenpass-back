import { createCardData } from "../services/cardService.js";
import { prisma } from "./../config/database.js";

export async function findCardByTitle(title: string, userId: number) {
  return prisma.card.findFirst({ where: { title, userId } });
}
export async function insertCard(data: createCardData) {
  return prisma.card.create({ data });
}
export async function getUserCards(userId: number) {
  return prisma.card.findMany({ where: { userId } });
}
export async function getCardById(id: number) {
  return prisma.card.findUnique({ where: { id } });
}
export async function deleteCardById(id: number) {
  return prisma.card.delete({ where: { id } });
}
