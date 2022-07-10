import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../entities/User";
import AsyncWrapper from "../middleware/Async";
import { BadRequest, ErrorClass } from "../errors/Error";

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
  var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: 86400, // expires in 24 hours
  });
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

  var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: 86400, // expires in 24 hours
  });

  res.status(200).json({ status: "success , loged in", data: user, token: token });
  //   if (!username || !password) throw new ErrorClass(400, "Please enter username and password");
});

export { registerUser, loginUser };
