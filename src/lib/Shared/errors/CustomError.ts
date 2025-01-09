

export class CustomError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
    public readonly errorCode?: string
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class UserNotFoundError extends CustomError {
  constructor() {
    super("User not found", 404, "USER_NOT_FOUND");
  }
}



