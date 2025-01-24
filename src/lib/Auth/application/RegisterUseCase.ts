import { ServiceContainer } from "../../Shared/infrastructure/ServiceContainer";
import { AuthJwtService } from "../../Shared/infrastructure/AuthJwtService";
import { AuthToken } from "../domain/AuthToken";

export class RegisterUseCase {
  private authJwtService: AuthJwtService;

  constructor(private authService: AuthJwtService) {
    this.authJwtService = authService;
  }

  async execute(
    userName: string,
    email: string,
    password: string
  ): Promise<{ token: string, newUserId: string }> {
    const newUserId = await ServiceContainer.user.create.run(
      userName,
      email,
      new Date(),
      password
    );

    const token = await this.authJwtService.generateToken(newUserId);
    
    return { token, newUserId };
  }
}
