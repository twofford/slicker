import { BinaryLike, randomBytes } from "crypto";

function convertStringToBinary(str: String): BinaryLike {
  return str
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
}

function createSessionToken(): String{
  return randomBytes(64).toString("hex")
}

export { convertStringToBinary, createSessionToken }