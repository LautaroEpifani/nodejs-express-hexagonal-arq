import { users } from "./schema";
import { User } from "../../domain/User";
import { UserId } from "../../domain/UserId";
import { UserRepository } from "../../domain/UserRepository";
import { UserName } from "../../domain/UserName";
import { UserEmail } from "../../domain/UserEmail";
import { UserCreatedAt } from "../../domain/UserCreatedAt";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { UserPassword } from "../../domain/UserPassword";

type DrizzlePostgresUser = {
  id: string;
  userName: string;
  email: string;
  password: string;
  createdAt: string;
};

export class DrizzlePostgresUserRepository implements UserRepository {
  private db;

  constructor(databaseUrl: string) {
    this.db = drizzle(databaseUrl);
  }

  getAll = async (): Promise<User[]> => {
    const result = await this.db.select().from(users);
    return result.map((item) => this.mapToDomain(item));
  };

  getOneById = async (id: UserId): Promise<User | null> => {
    const [userFound] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id.value));

    if (!userFound) return null;

    return this.mapToDomain(userFound);
  };

  async findByEmail(email: UserEmail): Promise<User | null> {
    const [userFound] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email.value));

    if (!userFound) return null;

    return this.mapToDomain(userFound);
  }

  create = async (user: User): Promise<string> => {
    const dbUser = {
      id: user.id.value,
      userName: user.name.value,
      email: user.email.value,
      createdAt: user.createdAt.format(),
      password: user.password?.value || " ",
    };

    const [insertedUser] = await this.db
      .insert(users)
      .values(dbUser)
      .returning({ id: users.id });

    if (!insertedUser) {
      throw new Error("Failed to insert user");
    }

    return insertedUser.id;
  };

  update = async (user: User): Promise<void> => {
    const dbUser = {
      userName: user.name.value,
      email: user.email.value,
      createdAt: user.createdAt.format(),
      password: user.password?.value,
    };

    await this.db.update(users).set(dbUser).where(eq(users.id, user.id.value));
  };

  delete = async (id: UserId): Promise<void> => {
    await this.db.delete(users).where(eq(users.id, id.value));
  };

  private mapToDomain(user: DrizzlePostgresUser): User {
    return new User(
      new UserId(user.id),
      new UserName(user.userName),
      new UserEmail(user.email),
      new UserCreatedAt(new Date(user.createdAt)),
      new UserPassword(user.password),
    );
  }
}
