export class AuthToken {
    private readonly token: string;
  
    constructor(token: string) {
      if (!token) throw new Error('Token is required');
      this.token = token;
    }
  
    getToken(): string {
      return this.token;
    }
  }
  