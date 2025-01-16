import { UserNotFoundError } from "../../../Shared/errors/CustomError";
import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";
import { Validator } from "../../../Shared/validators/ZodValidator";
import { UserEmailSchema } from "../../../Shared/schemas/UserEmailSchema";
import { UserEmail } from "../../domain/UserEmail";

export class UserGetByEmail {
  private validator = new Validator(UserEmailSchema);
  constructor(private repository: UserRepository) {}

  async run(email: string): Promise<User> {
    const parsed = this.validator.validate({ email });
    const userEmail = new UserEmail(parsed.email);
    const user = await this.repository.findByEmail(userEmail);

    if (!user) throw new UserNotFoundError(); 

    return user;
  }
}
