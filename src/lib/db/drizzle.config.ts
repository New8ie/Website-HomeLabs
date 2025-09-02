// src/lib/db/drizzle.config.ts
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  dialect: "sqlite", // ✅ tetap sqlite karena D1 pakai kompatibilitas SQLite
} satisfies Config;
