import { UserGetAll } from "../../User/application/UserGetAll/UserGetAll";
import { UserGetOneById } from "../../User/application/UserGetOneById/UserGetOneById";
import { UserCreate } from "../../User/application/UserCreate/UserCreate";
import { UserUpdate } from "../../User/application/UserUpdate/UserUpdate";
import { UserDelete } from "../../User/application/UserDelete/UserDelete";
import { PostgresUserRepository } from "../../../lib/User/infrastructure/PostgresUserRepository";
import { env } from "./env";
import { InMemoryUserRepository } from "../../../lib/User/infrastructure/InMemoryUserRepository";
import { DrizzlePostgresUserRepository } from "../../../lib/User/infrastructure/DrizzlePostgresUser/DrizzlePostgresUserRepository";

const userRepository = new DrizzlePostgresUserRepository(env.DATABASE_URL);

export const ServiceContainer = {
  user: {
    getAll: new UserGetAll(userRepository),
    getOneById: new UserGetOneById(userRepository),
    create: new UserCreate(userRepository),
    update: new UserUpdate(userRepository),
    delete: new UserDelete(userRepository),
  },
};
