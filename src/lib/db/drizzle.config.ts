import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./schema.ts",
  out: "../../drizzle", // Sesuaikan jalur output jika perlu
  driver: "better-sqlite",
  dbCredentials: {
    url: "./local.sqlite",
  },
  verbose: true,
  strict: true,
});
