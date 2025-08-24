// src/lib/db/schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const PostLikes = sqliteTable("PostLikes", {
  slug: text("slug").primaryKey().notNull(),
  likes: integer("likes").default(0),
});
