// src/pages/api/like-post.ts

// ✅ Perbaikan impor untuk PostLikes
import { db, PostLikes } from "@/lib/db/db"; 
import { sql } from "drizzle-orm";

export const prerender = false; // ✅ Wajib untuk endpoint dinamis

export async function POST({ request }: { request: any }) {
  try {
    const { slug } = await request.json();

    if (!slug) {
      return new Response(
        JSON.stringify({
          message: "Slug is required",
        }),
        { status: 400 }
      );
    }

    await db
      .insert(PostLikes)
      .values({ slug: slug, likes: 1 })
      .onConflictDoUpdate({
        target: PostLikes.slug,
        set: {
          likes: sql`${PostLikes.likes} + 1`,
        },
      });

    return new Response(
      JSON.stringify({
        message: "Post liked successfully!",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Database or Request error:", error);
    return new Response(
      JSON.stringify({
        message: "An error occurred while liking the post.",
      }),
      { status: 500 }
    );
  }
}
