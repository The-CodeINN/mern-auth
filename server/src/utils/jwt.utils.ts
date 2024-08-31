import jwt from "jsonwebtoken";
import config from "config";
import { log } from "./logger";

const privateKey: string = config.get("privateKey");
const publicKey: string = config.get("publicKey");

export function signJwt(object: object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error) {
    log.error(error);
    return {
      valid: false,
      expired: (error as Error).message === "jwt expired",
      decoded: null,
    };
  }
}
