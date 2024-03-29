import { verify } from "jsonwebtoken";
import User from "../models/User";
import Company from "../models/Company";
import { ErrorClass, Unauthorized } from "../errors/Error";
import { PayloadType } from "../types";
import Admin from "../models/Admin";

export const authMiddleware = async (req, res, next) => {
  // console.log("header", req.headers.authorization);

  const authHeader = req.headers.authorization;

  console.log(authHeader);

  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Unauthorized("No Authorization Header");
    }

    const token = authHeader.split("Bearer ")[1];

    const payload = verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as unknown as PayloadType;

    console.log("payload", payload);

    req.user = await User.findOne({ id: payload.id });

    return next();
  } catch (err) {
    res.status(500).json({ status: "failure", message: err });
  }
};

export const authMiddlewareCompany = async (req, res, next) => {
  // console.log("header", req.headers.authorization);

  const authHeader = req.headers.authorization;

  //   console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthorized("No Authorization Header");
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const payload = verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as unknown as PayloadType;

    req.user = await Company.findOne({ id: payload.id });

    return next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "failure", message: err });
  }
};

export const authMiddlewareAdmin = async (req, res, next) => {
  // console.log("header", req.headers.authorization);

  const authHeader = req.headers.authorization;

  //   console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthorized("No Authorization Header");
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const payload = verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as unknown as PayloadType;

    req.user = await Admin.findOne({ id: payload.id });

    return next();
  } catch (err) {
    throw new Unauthorized("There was a problem authenticating the user ");
  }
};
