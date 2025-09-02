globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as db, P as PostLikes } from '../../chunks/db_C7UxkbIP.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_B1w336LU.mjs';

const POST = async () => {
  try {
    await db.delete(PostLikes);
    console.log("Database cleared successfully.");
    return new Response(
      JSON.stringify({
        message: "Database cleared successfully."
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to clear database:", error);
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
