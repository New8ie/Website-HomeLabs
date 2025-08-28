import type { APIRoute } from "astro";
import { db, PostLikes } from "../../lib/db/db";
import { eq, and, count } from "drizzle-orm";

export const POST: APIRoute = async ({ request }) => {
  const { slug } = await request.json();

  if (!slug) {
    return new Response(JSON.stringify({ message: "Slug is required" }), {
      status: 400,
    });
  }

  // Fallback untuk IP Address di lingkungan lokal.
  // Ini akan menghasilkan "local-ip-placeholder" di localhost karena header tidak tersedia.
  // Di lingkungan produksi (seperti Vercel atau Netlify), header ini akan diisi secara otomatis.
  const ipAddress =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "local-ip-placeholder";

  // Jika alamat IP ditemukan, lakukan validasi seperti biasa
  try {
    const existingLike = await db
      .select()
      .from(PostLikes)
      .where(and(eq(PostLikes.slug, slug), eq(PostLikes.ipAddress, ipAddress)));

    if (existingLike.length > 0) {
      // Jika pengguna dari IP ini sudah menyukai, jangan lakukan apa-apa
      const totalLikes = await db
        .select({ count: count() })
        .from(PostLikes)
        .where(eq(PostLikes.slug, slug));

      const likesCount = totalLikes[0]?.count ?? 0;

      return new Response(
        JSON.stringify({ message: "Already liked", likes: likesCount }),
        {
          status: 200,
        }
      );
    }

    // Tambahkan like baru dan rekam IP dengan nilai eksplisit
    await db.insert(PostLikes).values({ slug, ipAddress, likes: 1 });

    const totalLikes = await db
      .select({ count: count() })
      .from(PostLikes)
      .where(eq(PostLikes.slug, slug));

    const likesCount = totalLikes[0]?.count ?? 0;

    return new Response(
      JSON.stringify({
        message: "Post liked!",
        likes: likesCount,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
