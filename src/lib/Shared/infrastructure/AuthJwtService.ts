import jwt from 'jsonwebtoken';

export class AuthJwtService {
  private secretKey: string = process.env.JWT_SECRET_KEY || 'your-secret-key';

  async generateToken(userId: string): Promise<string> {
    const payload = { userId };
    return jwt.sign(payload, this.secretKey, { expiresIn: '1h' });
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}

