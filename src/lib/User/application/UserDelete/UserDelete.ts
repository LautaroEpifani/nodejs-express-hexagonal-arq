import { UserNotFoundError } from "../../../Shared/errors/CustomError";
import { UserId } from "../../domain/UserId";
import { UserRepository } from "../../domain/UserRepository";

export class UserDelete {
  constructor(private repository: UserRepository) {}

  async run(id: string): Promise<void> {
    const userId = new UserId(id);

    const userExists = await this.repository.getOneById(userId);

    if (!userExists) throw new UserNotFoundError();

    await this.repository.delete(userId);
  }
}
