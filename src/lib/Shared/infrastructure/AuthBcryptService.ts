import bcrypt from 'bcrypt';

export class AuthBcryptService {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePassword(passwordToCompare: string, storedPassword: string): Promise<boolean> {
    return bcrypt.compare(passwordToCompare, storedPassword);
  }
}
