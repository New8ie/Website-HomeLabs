globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as createAstro, c as createComponent, b as addAttribute, e as renderScript, a as renderTemplate } from './astro/server_BbIlNa7L.mjs';
/* empty css                         */

const $$Astro = createAstro("https://thismydomains.com");
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/node_modules/astro/components/ClientRouter.astro", void 0);

export { $$ClientRouter as $ };
