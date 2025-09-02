globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as createAstro, c as createComponent, m as maybeRenderHead, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_BbIlNa7L.mjs';
/* empty css                                  */
import { g as getCollection } from '../chunks/_astro_content_CEO2WSbS.mjs';
import { B as BlogManager } from '../chunks/BlogManager_DlsMNfM9.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_B1w336LU.mjs';

const $$Astro = createAstro("https://thismydomains.com");
const getStaticPaths = async ({ paginate }) => {
  const allPosts = await getCollection("blog");
  allPosts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  return paginate(allPosts, { pageSize: 10 });
};
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { page } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="px-4 py-8 mx-auto lg:py-16"> <div class="max-w-7xl mx-auto space-y-12"> <div class="flex items-center space-x-2 text-zinc-400 font-cinzel"> <a href="/" class="hover:underline transition-all duration-300">Home</a> <span>/</span> <span class="text-white font-cinzel">Blog</span> </div> ${renderComponent($$result, "BlogManager", BlogManager, { "allPosts": page.data, "pageData": page, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/components/BlogManager", "client:component-export": "default" })} </div> </div>`;
}, "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/pages/blog/index.astro", void 0);

const $$file = "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
