import { AuthJwtService } from "../../Shared/infrastructure/AuthJwtService";
import { AuthBcryptService } from "../../Shared/infrastructure/AuthBcryptService";
import { CustomError } from "../../../lib/Shared/errors/CustomError";
import { AuthToken } from "../domain/AuthToken";
import { User } from "src/lib/User/domain/User";

export class LoginUseCase {
  private authJwtService: AuthJwtService;
  private authBcryptService: AuthBcryptService;

  constructor(
    authJwtService: AuthJwtService,
    authBcryptService: AuthBcryptService
  ) {
    this.authJwtService = authJwtService;
    this.authBcryptService = authBcryptService;
  }

  async execute(
    user: User,
    password: string
  ): Promise<{ token: AuthToken; userName: string }> {
    if (!user || !user.password) {
      throw new CustomError(
        "Email or password incorrect",
        404,
        "USER_NOT_FOUND"
      );
    }

    const isValidPassword = await this.authBcryptService.comparePassword(
      user.password.value,
      password
    );
    if (!isValidPassword) {
      throw new CustomError("Invalid credentials", 401, "UNAUTHORIZED");
    }

    const jwt = await this.authJwtService.generateToken(user.id.value);

    const token = new AuthToken(jwt);

    return { token, userName: user.name.value };
  }
}
