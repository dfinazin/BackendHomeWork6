import jws from "jsonwebtoken";
import "dotenv/config";

const jwtSign = process.env.JWT_SIGN;

export const generateTocken = (data) =>
  jws.sign(data, jwtSign, { expiresIn: "10m" });
export const verifyToken = (token) => jws.verify(token, jwtSign);
