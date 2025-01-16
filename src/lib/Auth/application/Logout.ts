import { Response } from "express";

export class LogoutUseCase {
  async execute(res: Response): Promise<void> {
    res.clearCookie('auth_token'); 
    return; 
  }
}
