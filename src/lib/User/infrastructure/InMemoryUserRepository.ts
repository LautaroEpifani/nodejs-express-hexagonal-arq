import { User } from "../domain/User";
import { UserEmail } from "../domain/UserEmail";
import { UserId } from "../domain/UserId";
import { UserRepository } from "../domain/UserRepository";

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async create(user: User): Promise<string> {
    this.users.push(user);
    return user.id.value;
  }

  async getAll(): Promise<User[]> {
    return this.users;
  }

  async getOneById(id: UserId): Promise<User | null> {
    return this.users.find((user) => user.id.value === id.value) || null;
  }

  async findByEmail(email: UserEmail): Promise<User | null> {
    return this.users.find((user) => user.email.value === email.value) || null;
  }

  async update(user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.id.value == user.id.value);
    this.users[index] = user;
  }

  async delete(id: UserId): Promise<void> {
    this.users = this.users.filter((user) => user.id.value !== id.value);
  }
}
