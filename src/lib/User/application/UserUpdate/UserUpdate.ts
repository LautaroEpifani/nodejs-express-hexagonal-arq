import {
  CustomError,
  UserNotFoundError,
} from "../../../Shared/errors/CustomError";
import { User } from "../../domain/User";
import { UserCreatedAt } from "../../domain/UserCreatedAt";
import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";
import { UserName } from "../../domain/UserName";
import { UserRepository } from "../../domain/UserRepository";
import { Validator } from "../../../Shared/validators/ZodValidator";
import { UserSchema } from "../../../Shared/schemas/UserSchema";
import { UserPassword } from "../../domain/UserPassword";

export class UserUpdate {
  private validator = new Validator(UserSchema);
  constructor(private repository: UserRepository) {}

  async run(
    id: string,
    name: string,
    email: string,
    createdAt: Date,
    password?: string
  ): Promise<void> {
    const parsed = this.validator.validate({
      id,
      name,
      email,
      createdAt,
      password,
    });
    const user = new User(
      new UserId(parsed.id),
      new UserName(parsed.name),
      new UserEmail(parsed.email),
      new UserCreatedAt(parsed.createdAt)
    );
    const userExists = await this.repository.getOneById(user.id);

    if (!userExists) throw new UserNotFoundError();

    return this.repository.update(user);
  }
}
