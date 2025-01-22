import dbConfig from "../../../Shared/infrastructure/env";
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  out: "./drizzle",
  schema: "./schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: dbConfig.DATABASE_URL!,
  },
});
