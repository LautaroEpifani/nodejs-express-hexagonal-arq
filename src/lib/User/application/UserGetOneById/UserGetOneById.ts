import { UserNotFoundError } from "../../../Shared/errors/CustomError";
import { User } from "../../domain/User";
import { UserId } from "../../domain/UserId";
import { UserRepository } from "../../domain/UserRepository";
import { Validator } from "../../../Shared/validators/ZodValidator";
import { UserIdSchema } from "../../../Shared/schemas/UserIdSchema";

export class UserGetOneById {
  private validator = new Validator(UserIdSchema);
  constructor(private repository: UserRepository) {}

  async run(id: string): Promise<User> {
    const parsed = this.validator.validate({ id });
    const userId = new UserId(parsed.id);
    const user = await this.repository.getOneById(userId);

    if (!user) throw new UserNotFoundError(); 

    return user;
  }
}
