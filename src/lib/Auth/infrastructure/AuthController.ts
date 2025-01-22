import { NextFunction, Request, Response } from "express";
import { ServiceContainer } from "../../Shared/infrastructure/ServiceContainer";

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    const { userName, email, password } = req.body as {
      userName: string;
      email: string;
      password: string;
    };
    try {
      const newUserId = await ServiceContainer.user.create.run(
        userName,
        email,
        new Date(),
        password
      );
      const { token } = await ServiceContainer.auth.register.execute(newUserId);
      res.cookie("access_token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 1000,
        sameSite: "none",
        secure: true,
      });
      res.send(token);
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const user = await ServiceContainer.user.findByEmail.run(email);
      const { token } = await ServiceContainer.auth.login.execute(
        user,
        password
      );
      res.cookie("access_token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 1000,
        sameSite: "none",
        secure: true,
      });
      res.send(token);
    } catch (error) {
      next(error);
    }
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    res.clearCookie("access_token", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.send({ message: "Logged out successfully" });
  }
}
