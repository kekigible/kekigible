import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import User from "../entities/User";
import AsyncWrapper from "../middleware/Async";
import { BadRequest, ErrorClass, Unauthorized } from "../errors/Error";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshTokenCookie,
  verifyRefreshToken,
} from "../utils/Utils";
import { PayloadType } from "../types";

const registerUser = AsyncWrapper(async (req, res) => {
  const { username, password, email } = req.body;
  let hashedPassword = bcrypt.hashSync(password, 8);

  if (!username || !password) throw new BadRequest("Please enter username and password");

  let user = await User.findOne({ email: req.body.email });
  if (user) throw new BadRequest("User already present");

  user = await User.create({
    username: username,
    email: email,
    password: hashedPassword,
  });
  // create a token
  // var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
  //   expiresIn: 86400, // expires in 24 hours
  // });

  const token = createAccessToken(user._id);
  sendRefreshTokenCookie(res, createRefreshToken(user.id));
  res.status(200).json({ auth: true, token: token });
});

const loginUser = AsyncWrapper(async (req, res) => {
  // console.log("req user", req.id);

  const user = await User.findOne({ id: req.id });
  if (!user) throw new ErrorClass(400, "No such user present");

  var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

  if (!passwordIsValid)
    return res
      .status(401)
      .json({ auth: false, token: null, message: "Password is incorrect" });

  // var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
  //   expiresIn: "5min", // expires in 24 hours
  // });

  const token = createAccessToken(user._id);
  res.status(200).json({ status: "success , loged in", data: user, token: token });
  //   if (!username || !password) throw new ErrorClass(400, "Please enter username and password");
});

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line no-underscore-dangle
  const token = req.cookies._crid;
  if (!token) {
    // res.status(400).json({ status: "No refreshToken" });
    throw new BadRequest("No refresh token");
    return;
  }

  try {
    const payload = verifyRefreshToken(token) as PayloadType;
    const user = await User.findOne({ id: payload.id });
    if (!user) {
      throw new Unauthorized("User not present");
      return;
    }
    sendRefreshTokenCookie(res, createRefreshToken(user.id));
    res.status(200).json({ accessToken: createAccessToken(payload.id) });
  } catch (err) {
    throw new ErrorClass(500, "Couldn't refresh token");
  }
};

export { registerUser, loginUser, refreshToken };
