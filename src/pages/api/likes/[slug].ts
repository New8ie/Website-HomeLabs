// src/pages/api/[slug].ts
import { db, PostLikes } from "../../../lib/db/db";
import { eq, sql } from "drizzle-orm";
import type { APIRoute } from "astro";

// Handler untuk permintaan GET (mendapatkan jumlah likes)
export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;

  if (!slug) {
    return new Response(JSON.stringify({ message: "Slug tidak ditemukan." }), {
      status: 400,
    });
  }

  try {
    const likesResult = await db.query.PostLikes.findFirst({
      where: eq(PostLikes.slug, slug),
    });

    const likes = likesResult?.likes || 0;

    return new Response(JSON.stringify({ likes }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Kesalahan saat mengambil data likes:", error);
    return new Response(JSON.stringify({ message: "Kesalahan server." }), {
      status: 500,
    });
  }
};

// Handler untuk permintaan POST (menambah jumlah likes)
export const POST: APIRoute = async ({ params, request }) => {
  const { slug } = params;
  if (!slug) {
    return new Response(JSON.stringify({ message: "Slug tidak ditemukan." }), {
      status: 400,
    });
  }

  try {
    const existingLikes = await db.query.PostLikes.findFirst({
      where: eq(PostLikes.slug, slug),
    });

    let newLikes;
    if (existingLikes) {
      // Jika postingan sudah ada, perbarui jumlah likes
      const result = await db
        .update(PostLikes)
        .set({
          likes: sql`${PostLikes.likes} + 1`,
        })
        .where(eq(PostLikes.slug, slug))
        .returning({ newLikes: PostLikes.likes });
      newLikes = result[0]?.newLikes;
    } else {
      // Jika postingan belum ada, buat entri baru dengan likes = 1
      const result = await db
        .insert(PostLikes)
        .values({
          slug: slug,
          likes: 1,
        })
        .returning({ newLikes: PostLikes.likes });
      newLikes = result[0]?.newLikes;
    }

    if (newLikes === undefined) {
      throw new Error("Gagal memperbarui likes.");
    }

    return new Response(JSON.stringify({ likes: newLikes }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Kesalahan saat memperbarui likes:", error);
    return new Response(JSON.stringify({ message: "Kesalahan server." }), {
      status: 500,
    });
  }
};