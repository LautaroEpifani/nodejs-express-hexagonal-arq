import { Validator } from "../../../Shared/validators/ZodValidator";
import { User } from "../../domain/User";
import { UserCreatedAt } from "../../domain/UserCreatedAt";
import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";
import { UserName } from "../../domain/UserName";
import { UserRepository } from "../../domain/UserRepository";
import { UserSchema } from "../../../Shared/schemas/UserSchema";
import { v4 as uuidv4 } from "uuid";

export class UserCreate {
  private validator = new Validator(UserSchema);

  constructor(private repository: UserRepository) {}

  async run(name: string, email: string, createdAt: Date): Promise<string> {
    const id = uuidv4();
    const parsed = this.validator.validate({ id, name, email, createdAt });

    const user = new User(
      new UserId(parsed.id),
      new UserName(parsed.name),
      new UserEmail(parsed.email),
      new UserCreatedAt(parsed.createdAt)
    );

    const userId = await this.repository.create(user);

    return userId;
  }
}
