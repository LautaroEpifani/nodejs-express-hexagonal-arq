import { CustomError } from "../../../../../src/lib/Shared/errors/CustomError";
import { AuthBcryptService } from "../../../../../src/lib/Shared/infrastructure/AuthBcryptService";
import { UserCreate } from "../../../../../src/lib/User/application/UserCreate/UserCreate";
import { InMemoryUserRepository } from "../../__mocks__/InMemoryUserRepository";
import { UserStub } from "../../domain/UserStub";

describe("UserCreate should", () => {
  let repository: InMemoryUserRepository;
  let bcryptService: AuthBcryptService;
  let useCase: UserCreate;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    bcryptService = new AuthBcryptService();
    useCase = new UserCreate(repository);
  });

  test("create a user successfully", async () => {
    const userStub = UserStub.create();

    const userId = await useCase.run(
      userStub.name.value,
      userStub.email.value,
      userStub.createdAt.value,
      userStub.password?.value
    );

    const users = await repository.getAll();

    expect(users).toHaveLength(1);

    const createdUser = users[0];

    expect(createdUser.id.value).toBe(userId);
    expect(createdUser.name.value).toBe(userStub.name.value);
    expect(createdUser.email.value).toBe(userStub.email.value);
    expect(createdUser.password?.value).not.toBe(userStub.password?.value);

    const isPasswordValid = await bcryptService.comparePassword(
      userStub.password?.value || "",
      createdUser.password?.value || ""
    );
    expect(isPasswordValid).toBe(true);
  });

  test("throw an error if email already exists", async () => {
    const userStub = UserStub.create();

    await useCase.run(
      userStub.name.value,
      userStub.email.value,
      userStub.createdAt.value,
      userStub.password?.value
    );

    await expect(
      useCase.run(
        "Another Name",
        userStub.email.value,
        new Date(),
        "another-password"
      )
    ).rejects.toThrow(
      new CustomError("Email already in use", 400, "EMAIL_IN_USE")
    );

    const users = await repository.getAll();
    expect(users).toHaveLength(1);
  });

  test("throw an error if password is missing", async () => {
    const userStub = UserStub.create();

    await expect(
      useCase.run(
        userStub.name.value,
        userStub.email.value,
        userStub.createdAt.value
      )
    ).rejects.toThrow();

    const users = await repository.getAll();
    expect(users).toHaveLength(0);
  });
});
