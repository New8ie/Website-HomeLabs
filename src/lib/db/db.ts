import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema"; // Mengimpor semua skema dari file schema.ts

const sqlite = new Database("./src/lib/db/local.sqlite");
export const db = drizzle(sqlite, { schema });
export const { PostLikes } = schema; // Mengekspor PostLikes agar bisa diimpor di file lain
