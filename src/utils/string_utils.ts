import { BinaryLike } from "crypto";

function convertStringToBinary(str: String): BinaryLike {
  return str
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
}

export { convertStringToBinary }