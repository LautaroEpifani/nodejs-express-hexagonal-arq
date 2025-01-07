import { ZodError } from "zod";
import { generateErrorMessage } from 'zod-error';

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


export class ValidationError extends Error {
  statusCode = 400;
  errors: string;

  constructor(error: ZodError) {
    super('Validation Error');
    this.errors = this.stringifyErrors(error);
  }

  stringifyErrors(error: ZodError) {
    const errorString = generateErrorMessage(error.issues, {
      code: {
        enabled: false,
      },
      path: {
        enabled: true,
        transform: ({ value }) => (value ? value : ''),
        type: 'breadcrumbs',
      },
      message: {
        enabled: true,
        transform: ({ value }) => (value ? value : ''),
      },

      delimiter: {
        component: '',
        error: '\n',
      },

      transform: ({ index, pathComponent, messageComponent }) => {
        const pathMessage = pathComponent
          ? ` at ${pathComponent}`
          : '';
        return `Error ${
          index + 1
        }${pathMessage}: ${messageComponent}`;
      },
    });
    return errorString;
  }
}

