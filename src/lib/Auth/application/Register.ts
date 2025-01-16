import { AuthJwtService } from "../../Shared/infrastructure/AuthJwtService";
import { AuthToken } from "../domain/AuthToken";

export class RegisterUseCase {
  private authJwtService: AuthJwtService;

  constructor(
    authJwtService: AuthJwtService
  ) {
    this.authJwtService = authJwtService;
  }

  async execute(newUserId: string): Promise<{ token: AuthToken }> {
    const jwt = await this.authJwtService.generateToken(newUserId);
    const token = new AuthToken(jwt);
    return { token };
  }
}
