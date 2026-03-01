import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "better-sqlite",
  dbCredentials: {
    url: "/var/www/Website-HomeLabs/db/local.sqlite",
  },
} satisfies Config;
