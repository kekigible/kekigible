import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../entities/User";
import AsyncWrapper from "../middleware/Async";
import { BadRequest, ErrorClass } from "../errors/Error";

const registerUser = AsyncWrapper(async (req, res) => {
  const { username, password, email } = req.body;
  var hashedPassword = bcrypt.hashSync(password, 8);

  if (!username || !password) throw new BadRequest("Please enter username and password");

  const user = await User.create({
    name: username,
    email: email,
    password: hashedPassword,
  });
  // create a token
  var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: 86400, // expires in 24 hours
  });
  res.status(200).json({ auth: true, token: token });
});

const loginUser = AsyncWrapper(async (req, res) => {
  console.log("req user", req.id);
  res.status(200).json({ status: "loged in" });
  //   if (!username || !password) throw new ErrorClass(400, "Please enter username and password");
});

export { registerUser, loginUser };
