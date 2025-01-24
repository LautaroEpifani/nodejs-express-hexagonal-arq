import { AuthToken } from "../../../../src/lib/Auth/domain/AuthToken";

export class AuthTokenStub {
  private readonly token: string;

  constructor(token: string = "stub-token") {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  static create(token: string = "stub-token"): AuthToken {
    return new AuthToken(token);
  }
}
