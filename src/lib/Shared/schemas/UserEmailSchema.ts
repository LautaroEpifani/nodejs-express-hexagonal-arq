import { z } from "zod";

export const UserEmailSchema = z.object({
  email: z.string().email(),
});