// /src/pages/api/clear-likes.ts

import type { APIRoute } from "astro";
import { db, PostLikes } from "../../lib/db/db";

export const POST: APIRoute = async () => {
  try {
    await db.delete(PostLikes);
    console.log("Database cleared successfully.");

    return new Response(
      JSON.stringify({
        message: "Database cleared successfully.",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to clear database:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
