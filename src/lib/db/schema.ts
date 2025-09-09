// src/lib/db/schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const PostLikes = sqliteTable("PostLikes", {
  id: integer("rowid").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull(),
  likes: integer("likes").default(0),
  ipAddress: text("ip_address"), // ✅ Pastikan baris ini ada
});
