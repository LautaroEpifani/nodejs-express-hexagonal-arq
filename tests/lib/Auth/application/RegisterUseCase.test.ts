import { UserStub } from "../../User/domain/UserStub";
import { RegisterUseCase } from "../../../../src/lib/Auth/application/RegisterUseCase";
import { MockJwtService } from "../__mocks__/MockJwtService";
import { AuthJwtService } from "../../../../src/lib/Shared/infrastructure/AuthJwtService";

describe("Auth Register Should", () => {
  test("register a user", async () => {
    const jwtService = new MockJwtService();
    const registerCase = new RegisterUseCase(jwtService);

    const user = UserStub.create();

    const { token, newUserId } = await registerCase.execute(
      user.name.value,
      user.email.value,
      user.password?.value || " "
    );

    expect(typeof token).toBe("string");
    expect(token).not.toBe("");

    if (jwtService instanceof AuthJwtService) {
      const decodedUserId = await jwtService.verifyToken(token);
      expect(decodedUserId.userId).toBe(newUserId);
    }
  });
});
