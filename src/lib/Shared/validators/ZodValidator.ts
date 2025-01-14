import { ZodSchema, ZodError } from "zod";
import { ValidationError } from "../errors/ValidatorError";

export class Validator<T> {
  constructor(private schema: ZodSchema<T>) {}

  validate(data: unknown): T {
    const result = this.schema.safeParse(data);

    if (!result.success) {
      throw new ValidationError(result.error);
    }

    return result.data;
  }
}
