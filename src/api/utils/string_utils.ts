import { BinaryLike, randomBytes, hash } from "crypto";

function convertStringToBinary(str: string): BinaryLike {
  return str
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
}

function createSessionToken(): string {
  return randomBytes(64).toString("hex");
}

function hashString(val: string, hashFunc: string): string {
  return hash(hashFunc, convertStringToBinary(val));
}

export { convertStringToBinary, createSessionToken, hashString };
