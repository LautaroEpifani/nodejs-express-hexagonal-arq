import { Validator } from "../../../Shared/validators/ZodValidator";
import { User } from "../../domain/User";
import { UserCreatedAt } from "../../domain/UserCreatedAt";
import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";
import { UserName } from "../../domain/UserName";
import { UserRepository } from "../../domain/UserRepository";
import { UserSchema } from "../../../Shared/schemas/UserSchema";
import { v4 as uuidv4 } from "uuid";
import { CustomError } from "../../../Shared/errors/CustomError";
import { AuthBcryptService } from "../../../Shared/infrastructure/AuthBcryptService";
import { UserPassword } from "../../domain/UserPassword";

export class UserCreate {
  private validator = new Validator(UserSchema);
  private authBcryptService = new AuthBcryptService();

  constructor(private repository: UserRepository) {}

  async run(
    name: string,
    email: string,
    createdAt: Date,
    password?: string
  ): Promise<string> {
    const id = uuidv4();
    const parsed = this.validator.validate({
      id,
      name,
      email,
      createdAt,
      password,
    });

    const existingUser = await this.repository.findByEmail(
      new UserEmail(email)
    );
    if (existingUser) {
      throw new CustomError("Email already in use", 400, "EMAIL_IN_USE");
    }

    const hashedPassword = await this.authBcryptService.hashPassword(
      parsed.password
    );

    const user = new User(
      new UserId(parsed.id),
      new UserName(parsed.name),
      new UserEmail(parsed.email),
      new UserCreatedAt(parsed.createdAt),
      new UserPassword(hashedPassword)
    );

    const userId = await this.repository.create(user);

    return userId;
  }
}
