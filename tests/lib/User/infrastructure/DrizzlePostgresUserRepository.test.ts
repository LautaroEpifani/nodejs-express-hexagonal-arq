import * as dotenv from "dotenv";
import { UserStub } from "../domain/UserStub";
import { DrizzlePostgresUserRepository } from "../../../../src/lib/User/infrastructure/DrizzlePostgresUser/DrizzlePostgresUserRepository";
import { TestRespository } from "../utils/TestRepository";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL_TEST;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

describe("DrizzlePostgresUserRepository should", () => {
  let repository: DrizzlePostgresUserRepository;
  let testRepository: TestRespository;

  beforeEach(async () => {
    repository = new DrizzlePostgresUserRepository(DATABASE_URL);
    testRepository = new TestRespository(DATABASE_URL); // only for delete tested data.
    await testRepository.deleteAll();
  });

  afterEach(async () => {
    await testRepository.deleteAll();
  });

  it("create", async () => {
    const user = UserStub.create();

    await repository.create(user);

    const findedUser = await repository.getOneById(user.id);

    expect(findedUser).not.toBeNull();

    expect(findedUser?.id.value).toBe(user.id.value);
    expect(findedUser?.name.value).toBe(user.name.value);
    expect(findedUser?.email.value).toBe(user.email.value);

  });

  it("get all", async () => {
    const user = UserStub.create();
    const user2 = UserStub.create();

    await repository.create(user);
    await repository.create(user2);

    const users = await repository.getAll();

    expect(users.length).toBeGreaterThanOrEqual(2);

  });

  it("get one by id", async () => {
    const user = UserStub.create();

    await repository.create(user);

    const userFound = await repository.getOneById(user.id);

    expect(userFound).not.toBeNull();
    expect(userFound?.id.value).toBe(user.id.value);
    expect(userFound?.name.value).toBe(user.name.value);
    expect(userFound?.email.value).toBe(user.email.value);

  });

  it("update", async () => {
    const user = UserStub.create();
    await repository.create(user);

    const updatedUser = UserStub.update("New Name", user);

    await repository.update(updatedUser);

    const findedUser = await repository.getOneById(user.id);

    expect(findedUser).not.toBeNull();
    expect(findedUser?.id.value).toBe(user.id.value);
    expect(findedUser?.name.value).toBe("New Name");
    expect(findedUser?.email.value).toBe(user.email.value);
  });

  it("delete", async () => {
    const user = UserStub.create();

    await repository.create(user);

    const usersBefore = await repository.getAll();

    expect(usersBefore.length).toBeGreaterThan(0);

    await repository.delete(user.id);

    const finedUser = await repository.getOneById(user.id);

    expect(finedUser).toBeNull();
  });
});
