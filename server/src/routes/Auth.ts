import { Router } from "express";
import {
  loginUser,
  refreshToken,
  registerUser,
  loginCompany,
  registerCompany,
  registerAdmin,
  loginAdmin,
} from "../controllers/Auth";
import authMiddleware from "../middleware/Auth";

const AuthRouter = Router();

AuthRouter.route("/refreshToken").get(refreshToken);
AuthRouter.route("/auth/login/user").post(authMiddleware, loginUser);
AuthRouter.route("/auth/register/user").post(registerUser);

//company
AuthRouter.route("/auth/login/company").post(authMiddleware, loginCompany);
AuthRouter.route("/auth/register/cpmpany").post(registerCompany);

//admin
AuthRouter.route("/auth/login/admin").post(authMiddleware, loginAdmin);
AuthRouter.route("/auth/register/admin").post(registerAdmin);
export default AuthRouter;
