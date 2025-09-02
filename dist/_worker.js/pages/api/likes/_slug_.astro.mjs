globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as db, e as eq, P as PostLikes, s as sql } from '../../../chunks/db_C7UxkbIP.mjs';
export { r as renderers } from '../../../chunks/_@astro-renderers_B1w336LU.mjs';

const GET = async ({ params }) => {
  const { slug } = params;
  if (!slug) {
    return new Response(JSON.stringify({ message: "Slug tidak ditemukan." }), {
      status: 400
    });
  }
  try {
    const likesResult = await db.query.PostLikes.findFirst({
      where: eq(PostLikes.slug, slug)
    });
    const likes = likesResult?.likes || 0;
    return new Response(JSON.stringify({ likes }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Kesalahan saat mengambil data likes:", error);
    return new Response(JSON.stringify({ message: "Kesalahan server." }), {
      status: 500
    });
  }
};
const POST = async ({ params, request }) => {
  const { slug } = params;
  if (!slug) {
    return new Response(JSON.stringify({ message: "Slug tidak ditemukan." }), {
      status: 400
    });
  }
  try {
    const existingLikes = await db.query.PostLikes.findFirst({
      where: eq(PostLikes.slug, slug)
    });
    let newLikes;
    if (existingLikes) {
      const result = await db.update(PostLikes).set({
        likes: sql`${PostLikes.likes} + 1`
      }).where(eq(PostLikes.slug, slug)).returning({ newLikes: PostLikes.likes });
      newLikes = result[0]?.newLikes;
    } else {
      const result = await db.insert(PostLikes).values({
        slug,
        likes: 1
      }).returning({ newLikes: PostLikes.likes });
      newLikes = result[0]?.newLikes;
    }
    if (newLikes === void 0) {
      throw new Error("Gagal memperbarui likes.");
    }
    return new Response(JSON.stringify({ likes: newLikes }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Kesalahan saat memperbarui likes:", error);
    return new Response(JSON.stringify({ message: "Kesalahan server." }), {
      status: 500
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
