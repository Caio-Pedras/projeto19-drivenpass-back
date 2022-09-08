import { Network } from "@prisma/client";
import {
  deleteNetworkById,
  findNetworkByTitle,
  getNetworkById,
  getUserNetworks,
  insertNetwork,
} from "../repositories/networkRepository.js";
import {
  cryptrDecryptString,
  cryptrEncryptString,
} from "../utils/encryptUtils.js";
import {
  badRequestError,
  notFoundError,
  unauthorizedError,
} from "../utils/errorUtils.js";
export type createNetworkData = Omit<Network, "id">;

export async function createNetworkService(data: createNetworkData) {
  await checkNetworkIsUnique(data.title, data.userId);
  const password = cryptrEncryptString(data.password);
  await insertNetwork({ ...data, password });
  return;
}
export async function getNetworksByUserIdService(userId: number) {
  let networks = await getUserNetworks(userId);
  networks?.map(
    (network) => (network.password = cryptrDecryptString(network.password))
  );
  return networks;
}
export async function getNetworkByIdService(id: number) {
  const network = await getNetworkById(id);
  if (!network) {
    throw notFoundError("Network not found");
  }
  const password = cryptrDecryptString(network.password);
  return { ...network, password };
}
export async function deleteNetworkService(id: number, userId: number) {
  const network = await getNetworkById(id);
  if (!network) {
    throw notFoundError("Safe Note not found");
  }
  if (network.userId !== userId) {
    throw unauthorizedError("Unauthorized operation");
  }
  await deleteNetworkById(id);
  return;
}

async function checkNetworkIsUnique(title: string, userId: number) {
  const validateTitle = await findNetworkByTitle(title, userId);
  if (validateTitle) {
    throw badRequestError("title already used");
  }
}
