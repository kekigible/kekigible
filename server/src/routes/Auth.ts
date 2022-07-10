import { Router } from "express";
import { loginUser, registerUser } from "../controllers/Auth";
import authMiddleware from "../middleware/Auth";

const AuthRouter = Router();

AuthRouter.route("/auth/login/user").post(authMiddleware, loginUser);
AuthRouter.route("/auth/register/user").post(registerUser);

export default AuthRouter;
