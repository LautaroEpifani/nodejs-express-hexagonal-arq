import { UserNotFoundError } from "../../../Shared/errors/CustomError";
import { UserId } from "../../domain/UserId";
import { UserRepository } from "../../domain/UserRepository";
import { Validator } from "../../../Shared/validators/ZodValidator";
import { UserIdSchema } from "../../../Shared/schemas/UserIdSchema";

export class UserDelete {
  private validator = new Validator(UserIdSchema);
  constructor(private repository: UserRepository) {}

  async run(id: string): Promise<void> {
    const parsed = this.validator.validate({ id });
    const userId = new UserId(parsed.id);

    const userExists = await this.repository.getOneById(userId);

    if (!userExists) throw new UserNotFoundError();

    await this.repository.delete(userId);
  }
}
