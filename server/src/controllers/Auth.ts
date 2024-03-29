import bcrypt from "bcryptjs";
import { Request, Response, NextFunction, response } from "express";
import User from "../models/User";
import AsyncWrapper from "../middleware/Async";
import { BadRequest, ErrorClass, Unauthorized } from "../errors/Error";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshTokenCookie,
  verifyRefreshToken,
} from "../utils/Utils";
import { PayloadType } from "../types";
import Company from "../models/Company";
import Admin from "../models/Admin";
import { json } from "stream/consumers";

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line no-underscore-dangle
  // console.log(req.co);
  const token = req.cookies._crid;
  if (!token) {
    // res.status(400).json({ status: "No refreshToken" });
    res.status(500).json({ status: "failure", message: "cookie not present" });
    return;
  }

  try {
    const payload = verifyRefreshToken(token) as unknown as PayloadType;
    const user = await User.findOne({ id: payload.id });
    if (!user) {
      throw new Unauthorized("User not present");
      return;
    }
    sendRefreshTokenCookie(res, createRefreshToken(user.id));
    res.status(200).json({ status: "success", token: createAccessToken(payload.id) });
  } catch (err) {
    throw new ErrorClass(500, "Couldn't refresh token");
  }
};

const refreshTokenCompany = async (req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line no-underscore-dangle
  const token = req.cookies._crid;
  if (!token) {
    // res.status(400).json({ status: "No refreshToken" });
    throw new BadRequest("No refresh token");
    return;
  }

  try {
    const payload = verifyRefreshToken(token) as unknown as PayloadType;
    const company = await Company.findOne({ id: payload.id });
    if (!company) {
      throw new Unauthorized("Company not present");
      return;
    }
    sendRefreshTokenCookie(res, createRefreshToken(company.id));
    res.status(200).json({ accessToken: createAccessToken(payload.id) });
  } catch (err) {
    throw new ErrorClass(500, "Couldn't refresh token");
  }
};

const refreshTokenAdmin = async (req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line no-underscore-dangle
  const token = req.cookies._crid;
  if (!token) {
    // res.status(400).json({ status: "No refreshToken" });
    throw new BadRequest("No refresh token");
    return;
  }

  try {
    const payload = verifyRefreshToken(token) as unknown as PayloadType;
    const admin = await Admin.findOne({ id: payload.id });
    if (!admin) {
      throw new Unauthorized("Company not present");
      return;
    }
    sendRefreshTokenCookie(res, createRefreshToken(admin.id));
    res.status(200).json({ accessToken: createAccessToken(payload.id) });
  } catch (err) {
    throw new ErrorClass(500, "Couldn't refresh token");
  }
};

//USER login/register

const registerUser = async (req, res) => {
  const { firstname, lastname, password, email } = req.body;
  console.log("working signin", req.body);
  let hashedPassword = bcrypt.hashSync(password, 8);
  try {
    if (!firstname || !password) throw new BadRequest("Please enter username and password");

    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) res.status(500).json({ status: "failure", message: "User already present" });

    user = await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword,
    });

    console.log(user);
    const token = createAccessToken(user._id);
    sendRefreshTokenCookie(res, createRefreshToken(user._id));
    res.status(200).json({ auth: true, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failure", message: error });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(500).json({ status: "failure", message: "No user found" });
      return;
    }
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid)
      return res
        .status(401)
        .json({ auth: false, token: null, message: "Password is incorrect" });

    const token = createAccessToken(user._id);
    res.status(200).json({ status: "success , loged in", data: user, token: token });
  } catch (error) {
    res.status(500).json({ status: "failure", message: error });
  }
};

//Company

const registerCompany = async (req, res) => {
  const { storeName, password, email, phoneNumber } = req.body;
  let hashedPassword = bcrypt.hashSync(password, 8);
  console.log(req.body, storeName, password);

  try {
    if (!storeName || !password) {
      res
        .status(500)
        .json({ status: "failure", message: "shopname and password not present" });
      return;
    }

    let user = await Company.findOne({ email: req.body.email });
    if (user)
      res.status(500).json({ status: "failure", message: "username already present " });

    user = await Company.create({
      storeName,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    const token = createAccessToken(user._id);
    sendRefreshTokenCookie(res, createRefreshToken(user.id));
    res.status(200).json({ auth: true, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failure", message: error });
  }
};

const loginCompany = AsyncWrapper(async (req, res) => {
  try {
    const user = await Company.findOne({ email: req.body.email });
    if (!user) {
      res.status(500).json({ status: "failure", message: "No user found" });
      return;
    }
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid)
      return res
        .status(401)
        .json({ auth: false, token: null, message: "Password is incorrect" });

    const token = createAccessToken(user._id);
    res.status(200).json({ status: "success , loged in", data: user, token: token });
  } catch (error) {
    res.status(500).json({ status: "success", message: error });
  }
});

//ADMIN

const registerAdmin = AsyncWrapper(async (req, res) => {
  const { username, password, email } = req.body;
  let hashedPassword = bcrypt.hashSync(password, 8);

  if (!username || !password) throw new BadRequest("Please enter username and password");

  let user = await Admin.findOne({ email: req.body.email });
  if (user) throw new BadRequest("User already present");

  user = await Admin.create({
    username: username,
    email: email,
    password: hashedPassword,
  });

  const token = createAccessToken(user._id);
  sendRefreshTokenCookie(res, createRefreshToken(user.id));
  res.status(200).json({ auth: true, token: token });
});

const loginAdmin = AsyncWrapper(async (req, res) => {
  try {
    const user = await Admin.findOne({ email: req.body.email });
    if (!user) throw new ErrorClass(400, "No such user present");
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid)
      return res
        .status(401)
        .json({ auth: false, token: null, message: "Password is incorrect" });

    const token = createAccessToken(user._id);
    res.status(200).json({ status: "success , loged in", data: user, token: token });
  } catch (error) {
    res.status(500).json({ status: "success", message: error });
  }
});

export {
  registerUser,
  loginUser,
  refreshToken,
  refreshTokenCompany,
  refreshTokenAdmin,
  loginCompany,
  loginAdmin,
  registerCompany,
  registerAdmin,
};
