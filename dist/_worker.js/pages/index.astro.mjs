globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as createAstro, c as createComponent, b as addAttribute, r as renderComponent, i as renderHead, h as renderSlot, a as renderTemplate, e as renderScript, m as maybeRenderHead } from '../chunks/astro/server_BbIlNa7L.mjs';
/* empty css                                  */
import { $ as $$ClientRouter } from '../chunks/ClientRouter_BPKoRTxW.mjs';
import { H as HeaderSection, F as FooterSection } from '../chunks/Footer_aeJBNuTl.mjs';
import { g as getCollection } from '../chunks/_astro_content_CEO2WSbS.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_B1w336LU.mjs';

const $$Astro$1 = createAstro("https://thismydomains.com");
const $$IndexDefault = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$IndexDefault;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en" class="dark"> <head><link rel="sitemap" href="/sitemap-index.xml"><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title><!-- Menambahkan tag link untuk favicon --><link rel="icon" type="image/png" href="/assets/images/favicon/favicon-96x96.png" sizes="96x96"><link rel="icon" type="image/svg+xml" href="/assets/images/favicon/favicon.svg"><link rel="shortcut icon" href="/assets/images/favicon/favicon.ico"><link rel="apple-touch-icon" sizes="180x180" href="/assets/images/favicon/apple-touch-icon.png"><meta name="apple-mobile-web-app-title" content="HomeLabs"><link rel="manifest" href="/assets/images/favicon/site.webmanifest"><!-- Add the ViewTransitions component for smooth page transitions -->${renderComponent($$result, "ViewTransitions", $$ClientRouter, {})}<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;800&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet"><!-- Add the ViewTransitions component for smooth page transitions -->${renderComponent($$result, "ViewTransitions", $$ClientRouter, {})}<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;800&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body class="home-page" bg-zinc-950 text-zinc-200 font-inter> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/layouts/IndexDefault.astro", void 0);

const $$Astro = createAstro("https://thismydomains.com");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const latestPosts = (await getCollection("blog")).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()).slice(0, 3);
  const usefulTools = [
    {
      title: "Subnet Calculator",
      description: "Hitung detail jaringan dari sebuah IP address dan CIDR untuk konfigurasi yang efisien.",
      image: "/assets/images/Items/subnet-calculator.png",
      link: "/tools#subnet-calculator"
    },
    {
      title: "Bandwidth Converter",
      description: "Alat untuk mengkonversi kecepatan bandwidth dari berbagai unit, seperti Mbps ke MB/s.",
      image: "/assets/images/Items/tool-01.png",
      link: "/tools#bandwidth-converter"
    },
    {
      title: "Power Converter",
      description: "Alat untuk mengkonversi daya (Watt/kVA) dan mengukur kebutuhan baterai untuk UPS Anda.",
      image: "/assets/images/Items/tool-02.png",
      link: "/tools#power-converter"
    }
  ];
  const animatedText = "Explore technology, AI, open source, and the digital world from the comfort of your home lab. Discover new innovations, projects, and inspiration every day.";
  return renderTemplate`${renderComponent($$result, "IndexDefault", $$IndexDefault, { "title": "Main - HomeLabs" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "HeaderSection", HeaderSection, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/sections/Header", "client:component-export": "HeaderSection" })} ${maybeRenderHead()}<div class="main-content-container"> <section class="blog-pages-background relative h-screen w-full"> <div class="absolute inset-0 z-10 bg-cover bg-center" style="background-image: var(--blog-pages-background);"></div> <div class="relative z-20 flex h-full items-center justify-start pt-[25vh] px-8 md:px-16 lg:px-24"> <div class="max-w-xl text-left"> <h1 class="hero-title">HomeLabs</h1> <p class="mt-4 text-base md:text-lg justify-start leading-relaxed font-cinzel dark:text-yellow-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]" style="color: var(--text-index-color);"> ${animatedText} </p> </div> </div> </section> <section class="py-16 md:py-24 lg:py-32 bg-gradient-1"> <div class="container mx-auto px-4"> <h2 class="fade-in-on-scroll text-3xl md:text-4xl lg:text-5xl font-extrabold font-cinzel text-white leading-tight text-center mb-12">
Latest Articles
</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"> ${latestPosts.map((post) => renderTemplate`<div class="homelabs-card-container"> <a${addAttribute(`/blog/${post.slug}`, "href")} class="homelabs-card-link group block w-full h-full"> <div class="homelabs-card-content"> <div class="homelabs-card-inner"> <div class="w-full h-48 relative overflow-hidden"> <img${addAttribute(
    post.data.image || "https://placehold.co/600x400/18181b/ffffff?text=No+Image",
    "src"
  )}${addAttribute(post.data.title, "alt")} class="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"> </div> <div class="p-6 flex flex-col flex-grow text-white"> <h3 class="text-lg font-extrabold font-cinzel mb-2 group-hover:text-yellow-300 transition-colors"> ${post.data.title} </h3> <p class="text-sm font-cinzel text-zinc-300 line-clamp-2 flex-grow"> ${post.data.description} </p> <div class="mt-4 text-xs font-semibold font-cinzel text-yellow-500 uppercase">
Read More &rarr;
</div> </div> </div> </div> </a> </div>`)} </div> </div> </section> <section class="py-16 md:py-24 lg:py-32 bg-gradient-2"> <div class="container mx-auto px-4"> <h2 class="fade-in-on-scroll text-3xl md:text-4xl lg:text-5xl font-extrabold font-cinzel text-white text-center mb-6">
Useful Tools
</h2> <p class="text-lg md:text-xl text-center text-zinc-300 font-cinzel max-w-3xl mx-auto mb-12">
Alat-alat praktis yang saya gunakan untuk mempermudah pekerjaan
          HomeLab.
</p> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"> ${usefulTools.map((tool) => renderTemplate`<div class="homelabs-card-container"> <a${addAttribute(tool.link, "href")} class="homelabs-card-link group block w-full h-full"> <div class="homelabs-card-content"> <div class="homelabs-card-inner"> <div class="w-full h-48 relative overflow-hidden"> <img${addAttribute(tool.image, "src")}${addAttribute(tool.title, "alt")} class="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"> </div> <div class="p-6 flex flex-col flex-grow text-white"> <h3 class="text-lg font-extrabold font-cinzel mb-2 group-hover:text-yellow-300 transition-colors"> ${tool.title} </h3> <p class="mt-2 text-sm font-cinzel text-zinc-300 line-clamp-3 flex-grow"> ${tool.description} </p> </div> </div> </div> </a> </div>`)} </div> <div class="mt-12 text-center"> <a href="/tools" class="primary-button-inverted">
Lihat Semua Tools &rarr;
</a> </div> </div> </section> </div> ${renderComponent($$result2, "FooterSection", FooterSection, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/sections/Footer", "client:component-export": "FooterSection" })} ` })} ${renderScript($$result, "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/pages/index.astro", void 0);

const $$file = "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
