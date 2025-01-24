import jwt from 'jsonwebtoken';
import { AuthToken } from '../../../lib/Auth/domain/AuthToken';
import { CustomError } from '../errors/CustomError';
export class AuthJwtService {
  private secretKey: string = process.env.JWT_SECRET_KEY || 'your-secret-key';

  async generateToken(userId: string): Promise<string> {
    const payload = { userId };
    const getToken = new AuthToken(jwt.sign(payload, this.secretKey, { expiresIn: '1h' }));
    const token = getToken.getToken();
    return token;
  }

  async verifyToken(token: string): Promise<{ userId: string }> {
    try {
      const decoded = jwt.verify(token, this.secretKey) as { userId: string };
      return decoded;
    } catch (error) {
      throw new CustomError('Invalid or expired token', 401, 'TOKEN_INVALID');
    }
  }
}


