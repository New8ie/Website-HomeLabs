globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BbIlNa7L.mjs';
/* empty css                                     */
import { g as getCollection } from '../../chunks/_astro_content_CEO2WSbS.mjs';
import { B as BlogManager } from '../../chunks/BlogManager_DlsMNfM9.mjs';
import { d as db, P as PostLikes, e as eq } from '../../chunks/db_C7UxkbIP.mjs';
import { $ as $$Default } from '../../chunks/Default_C-LqwSQP.mjs';
import { H as HeaderSection, F as FooterSection } from '../../chunks/Footer_aeJBNuTl.mjs';
import { c as count } from '../../chunks/aggregate_CqhWfPDU.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_B1w336LU.mjs';

const $$Astro = createAstro("https://thismydomains.com");
const getStaticPaths = async ({ paginate }) => {
  const allPosts = await getCollection("blog");
  allPosts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const featuredPost = allPosts[0];
  const otherPosts = allPosts.slice(1);
  const likesCountResult = await db.select({ count: count() }).from(PostLikes).where(eq(PostLikes.slug, featuredPost.slug));
  const featuredPostLikes = likesCountResult[0]?.count ?? 0;
  const featuredPostWithLikes = {
    ...featuredPost,
    likes: featuredPostLikes
  };
  const postsForPagination = [featuredPostWithLikes, ...otherPosts];
  return paginate(postsForPagination, { pageSize: 10 });
};
const prerender = true;
const $$page = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$page;
  const { page } = Astro2.props;
  page.data[0];
  page.data.slice(1);
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$Default, { "title": "Blog Page" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "HeaderSection", HeaderSection, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/sections/Header", "client:component-export": "HeaderSection" })} ${maybeRenderHead()}<div class="px-4 py-8 mx-auto lg:py-16"> <div class="max-w-7xl mx-auto space-y-12"> <div class="flex items-center space-x-2 text-zinc-400 font-cinzel"> ${renderComponent($$result2, "BlogManager", BlogManager, { "allPosts": page.data, "pageData": page, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/components/BlogManager", "client:component-export": "default" })} </div> </div> </div> ${renderComponent($$result2, "FooterSection", FooterSection, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/sections/Footer", "client:component-export": "FooterSection" })} ` })}`;
}, "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/pages/blog/[page].astro", void 0);

const $$file = "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/pages/blog/[page].astro";
const $$url = "/blog/[page]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$page,
  file: $$file,
  getStaticPaths,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
