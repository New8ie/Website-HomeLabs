export default {
  async fetch(req: Request, env: any) {
    try {
      // Jalankan query ke D1
      const { results } = await env.DB.prepare("SELECT * FROM PostLikes").all();

      return new Response(JSON.stringify(results, null, 2), {
        headers: { "content-type": "application/json" },
      });
    } catch (err: any) {
      // Tangani error supaya Worker nggak crash
      return new Response(JSON.stringify({ error: err.message || err }), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
    }
  },
};
