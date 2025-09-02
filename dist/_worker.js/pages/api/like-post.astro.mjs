globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as db, P as PostLikes, a as and, e as eq } from '../../chunks/db_C7UxkbIP.mjs';
import { c as count } from '../../chunks/aggregate_CqhWfPDU.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_B1w336LU.mjs';

const POST = async ({ request }) => {
  const { slug } = await request.json();
  if (!slug) {
    return new Response(JSON.stringify({ message: "Slug is required" }), {
      status: 400
    });
  }
  const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "local-ip-placeholder";
  try {
    const existingLike = await db.select().from(PostLikes).where(and(eq(PostLikes.slug, slug), eq(PostLikes.ipAddress, ipAddress)));
    if (existingLike.length > 0) {
      const totalLikes2 = await db.select({ count: count() }).from(PostLikes).where(eq(PostLikes.slug, slug));
      const likesCount2 = totalLikes2[0]?.count ?? 0;
      return new Response(
        JSON.stringify({ message: "Already liked", likes: likesCount2 }),
        {
          status: 200
        }
      );
    }
    await db.insert(PostLikes).values({ slug, ipAddress, likes: 1 });
    const totalLikes = await db.select({ count: count() }).from(PostLikes).where(eq(PostLikes.slug, slug));
    const likesCount = totalLikes[0]?.count ?? 0;
    return new Response(
      JSON.stringify({
        message: "Post liked!",
        likes: likesCount
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
