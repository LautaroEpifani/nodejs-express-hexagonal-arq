import { UserGetAll } from "../../User/application/UserGetAll/UserGetAll";
import { UserGetOneById } from "../../User/application/UserGetOneById/UserGetOneById";
import { UserGetByEmail } from "../../User/application/UserGetByEmail/UserGetByEmail";
import { UserCreate } from "../../User/application/UserCreate/UserCreate";
import { UserUpdate } from "../../User/application/UserUpdate/UserUpdate";
import { UserDelete } from "../../User/application/UserDelete/UserDelete";
import { DrizzlePostgresUserRepository } from "../../../lib/User/infrastructure/DrizzlePostgresUser/DrizzlePostgresUserRepository";
import dbConfig from "./env";
import { RegisterUseCase } from "../../../lib/Auth/application/Register";
import { LoginUseCase } from "../../../lib/Auth/application/Login";
import { LogoutUseCase } from "../../../lib/Auth/application/Logout";
import { AuthJwtService } from "./AuthJwtService";
import { AuthBcryptService } from "./AuthBcryptService";

const userRepository = new DrizzlePostgresUserRepository(
  dbConfig.DATABASE_URL!
);
const authJwtService = new AuthJwtService();
const authBcryptService = new AuthBcryptService();

export const ServiceContainer = {
  user: {
    getAll: new UserGetAll(userRepository),
    getOneById: new UserGetOneById(userRepository),
    findByEmail: new UserGetByEmail(userRepository),
    create: new UserCreate(userRepository),
    update: new UserUpdate(userRepository),
    delete: new UserDelete(userRepository),
  },
  auth: {
    register: new RegisterUseCase(authJwtService),
    login: new LoginUseCase(authJwtService, authBcryptService),
    logout: new LogoutUseCase(),
  },
};
