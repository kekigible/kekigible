import { Router } from "express";
import {
  loginUser,
  refreshToken,
  refreshTokenCompany,
  refreshTokenAdmin,
  registerUser,
  loginCompany,
  registerCompany,
  registerAdmin,
  loginAdmin,
} from "../controllers/Auth";
import authMiddleware from "../middleware/Auth";

const AuthRouter = Router();

AuthRouter.get("/refreshToken", refreshToken);
AuthRouter.post("/auth/login/user", authMiddleware, loginUser);
AuthRouter.post("/auth/register/user", registerUser);

//company
AuthRouter.get("/refreshToken/company", refreshTokenCompany);
AuthRouter.post("/auth/login/company", authMiddleware, loginCompany);
AuthRouter.post("/auth/register/company", registerCompany);

//admin
AuthRouter.get("/refreshToken/admin", refreshTokenAdmin);
AuthRouter.post("/auth/login/admin", authMiddleware, loginAdmin);
AuthRouter.post("/auth/register/admin", registerAdmin);
export default AuthRouter;
