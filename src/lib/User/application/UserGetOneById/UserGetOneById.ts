import { UserNotFoundError } from "../../../Shared/errors/CustomError";
import { User } from "../../domain/User";
import { UserId } from "../../domain/UserId";
import { UserRepository } from "../../domain/UserRepository";

export class UserGetOneById {
  constructor(private repository: UserRepository) {}

  async run(id: string): Promise<User> {
    const user = await this.repository.getOneById(new UserId(id));

    if (!user) throw new UserNotFoundError(); 

    return user;
  }
}
