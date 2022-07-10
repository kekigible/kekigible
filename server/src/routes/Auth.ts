import { Router } from "express";
import { loginUser, refreshToken, registerUser } from "../controllers/Auth";
import authMiddleware from "../middleware/Auth";

const AuthRouter = Router();

AuthRouter.route("/refreshToken").get(refreshToken);
AuthRouter.route("/auth/login/user").post(authMiddleware, loginUser);
AuthRouter.route("/auth/register/user").post(registerUser);

export default AuthRouter;
