import { prisma } from "./../config/database.js";
import { createNetworkData } from "../services/networkService.js";

export async function findNetworkByTitle(title: string, userId: number) {
  return prisma.network.findFirst({ where: { title, userId } });
}
export async function insertNetwork(data: createNetworkData) {
  return prisma.network.create({ data });
}
export async function getUserNetworks(userId: number) {
  return prisma.network.findMany({ where: { userId } });
}
export async function getNetworkById(id: number) {
  return prisma.network.findUnique({ where: { id } });
}
export async function deleteNetworkById(id: number) {
  return prisma.network.delete({ where: { id } });
}
