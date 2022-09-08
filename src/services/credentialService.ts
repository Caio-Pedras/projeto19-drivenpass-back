import { Credential } from "@prisma/client";
import {
  deleteCredentialById,
  FindCredentialByTitle,
  getCredentialById,
  getUserCredentials,
  insertCredential,
} from "../repositories/credentialRepository.js";
import {
  badRequestError,
  notFoundError,
  unauthorizedError,
} from "../utils/errorUtils.js";
import {
  cryptrDecryptString,
  cryptrEncryptString,
} from "../utils/encryptUtils.js";

export type createCredentialData = Omit<Credential, "id">;

export async function createCredential(data: createCredentialData) {
  await checkCredentialIsUnique(data.title, data.userId);
  const hashedPassword = cryptrEncryptString(data.password);
  await insertCredential({ ...data, password: hashedPassword });
}

export async function getCredentialsByUserId(userId: number) {
  let credentials = await getUserCredentials(userId);
  credentials?.map(
    (credential) =>
      (credential.password = cryptrDecryptString(credential.password))
  );
  return credentials;
}
export async function getCredential(id: number) {
  const credential = await getCredentialById(id);
  if (!credential) {
    throw notFoundError("Credential not found");
  }
  return { ...credential, password: cryptrDecryptString(credential.password) };
}
export async function deleteCredential(id: number, userId: number) {
  const credential = await getCredentialById(id);
  if (!credential) {
    throw notFoundError("Credential not found");
  }
  if (credential.userId !== userId) {
    throw unauthorizedError("Unauthorized operation");
  }
  await deleteCredentialById(id);
  return;
}

async function checkCredentialIsUnique(title: string, userId: number) {
  const validateTitle = await FindCredentialByTitle(title, userId);
  if (validateTitle) {
    throw badRequestError("title already used");
  }
}
