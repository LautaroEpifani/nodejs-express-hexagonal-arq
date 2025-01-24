import { AuthToken } from "../../../../src/lib/Auth/domain/AuthToken";
import { AuthJwtService } from "../../../../src/lib/Shared/infrastructure/AuthJwtService";
import { AuthTokenStub } from "../domain/AuthTokenStub";


export class MockJwtService extends AuthJwtService {
  async generateToken(userId: string): Promise<string> {
    const tokenStub = AuthTokenStub.create(`stub-token-for-${userId}`);
    return tokenStub.getToken();
  }

  async verifyToken(token: string): Promise<{ userId: string }> {
    if (token.startsWith("stub-token-for-")) {
      const userId = token.replace("stub-token-for-", "");
      return { userId }; 
    }
    throw new Error("Invalid token");
  }
  
}