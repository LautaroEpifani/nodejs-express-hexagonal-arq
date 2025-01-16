import { User } from "./User";
import { UserEmail } from "./UserEmail";
import { UserId } from "./UserId";

export interface UserRepository {
  create(user: User): Promise<string>;
  getAll(): Promise<User[]>;
  getOneById(id: UserId): Promise<User | null>;
  findByEmail(email: UserEmail): Promise<User | null>;
  update(user: User): Promise<void>;
  delete(id: UserId): Promise<void>;
}
