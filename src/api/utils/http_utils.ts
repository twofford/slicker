import { IncomingMessage } from "http";

function getBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve) => {
    const bodyParts: Uint8Array[] = [];
    let body;
    req
      .on("data", (chunk: Uint8Array) => {
        bodyParts.push(chunk);
      })
      .on("end", () => {
        body = Buffer.concat(bodyParts).toString();
        resolve(body);
      });
  });
}

export { getBody };
