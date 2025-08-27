// src/lib/db/drizzle.config.ts
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/db/schema.ts", // ✅ cukup relatif dari lokasi file config
  out: "./migrations", // ✅ otomatis ke src/lib/db/migrations
  dialect: "sqlite",
  dbCredentials: {
    url: "file:./src/lib/db/local.sqlite", // ✅ relatif dari src/lib/db/
  },
} satisfies Config;
