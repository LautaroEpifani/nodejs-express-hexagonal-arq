import { UserUpdate } from "../../../../../src/lib/User/application/UserUpdate/UserUpdate";
import { InMemoryUserRepository } from "../../__mocks__/InMemoryUserRepository";
import { UserStub } from "../../domain/UserStub";

describe("UserUpdate should", () => {
  test("update a user", async () => {
    const user = UserStub.create();

    const repository = new InMemoryUserRepository([user]);
    const updateUseCase = new UserUpdate(repository);

    const usersBefore = await repository.getAll();

    expect(usersBefore).toHaveLength(1);

    const newUser = UserStub.create();

    const newName = newUser.name.value;
    const newEmail = newUser.email.value;

    await updateUseCase.run(user.id.value, newName, newEmail, new Date());

    const usersAfter = await repository.getAll();

    expect(usersAfter).toHaveLength(1);

    const updatedUser = usersAfter[0];

    expect(updatedUser.id.value).toBe(user.id.value);
    expect(updatedUser.name.value).toBe(newName);
    expect(updatedUser.email.value).toBe(newEmail);
  });
});
