import jwt from "jsonwebtoken";
import User from "../entities/User";
import { ErrorClass, Unauthorized } from "../errors/Error";
import { PayloadType } from "../types";
import AsyncWrapper from "./Async";

const authMiddleware = async (req, res, next) => {
  console.log("header", req.headers.authorization);

  const authHeader = req.headers.authorization;

  //   console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthorized("No Authorization Header");
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY) as PayloadType;

    // const user = await User.findOne({ id: payload.id });
    // console.log(user);
    req.id = { id: payload.id };
    next();
  } catch (err) {
    throw new Unauthorized("unauthorized request");
  }
};

export default authMiddleware;
