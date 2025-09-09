import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite", // ✅ bukan driver
  dbCredentials: {
    url: "./src/lib/db/local.sqlite",
  },
} satisfies Config;
