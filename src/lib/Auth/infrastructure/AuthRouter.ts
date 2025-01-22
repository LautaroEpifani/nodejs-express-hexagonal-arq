import { Router } from "express";
import { AuthController } from "./AuthController";

const controller = new AuthController();

const AuthRouter = Router();

AuthRouter.post("/auth/register", controller.register);
AuthRouter.post("/auth/login/", controller.login);
AuthRouter.post("/auth/logout/", controller.logout);

export { AuthRouter };
