globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute, e as renderScript, f as createTransitionScope } from '../../chunks/astro/server_BbIlNa7L.mjs';
/* empty css                                     */
import { $ as $$Default } from '../../chunks/Default_C-LqwSQP.mjs';
import { H as HeaderSection, F as FooterSection } from '../../chunks/Footer_aeJBNuTl.mjs';
import { g as getCollection } from '../../chunks/_astro_content_CEO2WSbS.mjs';
import { d as db, P as PostLikes, e as eq } from '../../chunks/db_C7UxkbIP.mjs';
import { c as createLucideIcon, j as jsxRuntimeExports } from '../../chunks/x_DBBlyqt9.mjs';
import { a as reactExports } from '../../chunks/_@astro-renderers_B1w336LU.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_B1w336LU.mjs';
/* empty css                                     */
import { c as count } from '../../chunks/aggregate_CqhWfPDU.mjs';

/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode = [
  ["path", { d: "M7 10v12", key: "1qc93n" }],
  [
    "path",
    {
      d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",
      key: "emmmcr"
    }
  ]
];
const ThumbsUp = createLucideIcon("thumbs-up", __iconNode);

function LikeButton({ initialLikes, slug }) {
  const [likes, setLikes] = reactExports.useState(initialLikes);
  const [isLiking, setIsLiking] = reactExports.useState(false);
  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    try {
      const response = await fetch(`/api/like-post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ slug })
      });
      if (response.ok) {
        const data = await response.json();
        setLikes(data.likes);
      }
    } catch (error) {
      console.error("Gagal menambahkan like:", error);
    } finally {
      setIsLiking(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      onClick: handleLike,
      disabled: isLiking,
      className: "flex items-center gap-2 p-2 rounded-lg font-bold transition-all duration-300 transform hover:scale-105",
      style: {
        backgroundColor: "var(--pages-bg)",
        color: "var(--text-color)",
        border: "1px solid var(--pages-border-shadow)",
        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ThumbsUp,
          {
            fill: likes > 0 ? "var(--nav-link-from)" : "var(--title-color)",
            strokeWidth: 1
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: likes })
      ]
    }
  );
}

const $$Astro = createAstro("https://thismydomains.com");
const prerender = true;
async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.slug }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const allPosts = await getCollection("blog");
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) {
    throw new Error(`Post with slug "${slug}" not found`);
  }
  const likesCountResult = await db.select({ count: count() }).from(PostLikes).where(eq(PostLikes.slug, slug));
  const initialLikes = likesCountResult[0]?.count ?? 0;
  const { Content } = await post.render();
  const sortedPosts = allPosts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  const currentIndex = sortedPosts.findIndex((p) => p.slug === slug);
  const prevPost = sortedPosts[currentIndex + 1] || null;
  const nextPost = sortedPosts[currentIndex - 1] || null;
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$Default, { "title": post.data.title }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "HeaderSection", HeaderSection, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/sections/Header", "client:component-export": "HeaderSection", "data-astro-transition-persist": createTransitionScope($$result2, "cnzgbifa") })} ${maybeRenderHead()}<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16 space-y-12"> <div class="border border-zinc-700 rounded-lg p-6 sm:p-8 lg:p-12 space-y-8"> <div class="text-zinc-400 font-cinzel flex items-center space-x-2"> <a href="/blog" class="hover:underline transition-all duration-300">
Blog
</a> <span>/</span> <span class="text-white font-cinzel">${post.data.title}</span> </div> <div class="space-y-4"> <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-cinzel leading-tight"${addAttribute({ color: "var(--title-color)" }, "style")}> ${post.data.title} </h1> <div class="flex items-center gap-4 text-sm font-cinzel"${addAttribute({ color: "var(--text-color)" }, "style")}> <span class="font-bold"> ${new Date(post.data.pubDate).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })} </span> ${renderComponent($$result2, "LikeButton", LikeButton, { "initialLikes": initialLikes, "slug": post.slug, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/components/LikeButton", "client:component-export": "default" })} </div> </div> <article class="prose dark:prose-invert max-w-none prose-p:text-lg prose-ul:text-lg prose-li:text-lg prose-headings:font-cinzel"> ${renderComponent($$result2, "Content", Content, {})} </article> <div class="flex justify-between items-center border-t border-zinc-700 pt-8 mt-12"> ${prevPost ? renderTemplate`<a${addAttribute(`/blog/${prevPost.slug}`, "href")} class="flex items-center gap-2 text-yellow-400 hover:underline transition-all duration-300">
← Previous Post
</a>` : renderTemplate`<div></div>`} ${nextPost && renderTemplate`<a${addAttribute(`/blog/${nextPost.slug}`, "href")} class="flex items-center gap-2 text-yellow-400 hover:underline transition-all duration-300">
Next Post →
</a>`} </div> </div> </main> ${renderComponent($$result2, "FooterSection", FooterSection, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/sections/Footer", "client:component-export": "FooterSection", "data-astro-transition-persist": createTransitionScope($$result2, "q3smfqri") })} ${renderScript($$result2, "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/pages/blog/[slug].astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/pages/blog/[slug].astro", "self");

const $$file = "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
