import { sign, verify } from "jsonwebtoken";
import { Request, Response } from "express";
import uuid4 from "uuid4";

const createRefreshToken = (id : string) =>
  sign(
    {
      id,
    },
    process.env.JWT_REFRESH_KEY,
    {
      expiresIn: process.env.REFRESH_TOKEN_LIFE,
    }
  );

const createAccessToken = (id : string) =>
  sign(
    {
      id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_TOKEN_LIFE,
    }
  );

const verifyRefreshToken = (token: string) =>
  verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);

const verifyAccessToken = (token: string) => verify(token, process.env.JWT_SECRET_KEY);

const sendRefreshTokenCookie = (res: Response, token: string) => {
  res.cookie("_crid", token, {
    httpOnly: true, // TODO: path and domain options
  });
};

const genUUID = () => uuid4();

export {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  sendRefreshTokenCookie,
  genUUID,
};
