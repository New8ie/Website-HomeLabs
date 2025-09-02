globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as createAstro, c as createComponent, a as renderTemplate, h as renderSlot, i as renderHead, r as renderComponent, b as addAttribute } from './astro/server_BbIlNa7L.mjs';
import { $ as $$ClientRouter } from './ClientRouter_BPKoRTxW.mjs';
/* empty css                          */
/* empty css                         */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://thismydomains.com");
const $$Default = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Default;
  const { title } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="id"> <head><link rel="sitemap" href="/sitemap-index.xml"><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator"', "><title>", '</title><link rel="icon" type="image/png" href="/assets/images/favicon/favicon-96x96.png" sizes="96x96"><link rel="icon" type="image/svg+xml" href="/assets/images/favicon/favicon.svg"><link rel="shortcut icon" href="/assets/images/favicon/favicon.ico"><link rel="apple-touch-icon" sizes="180x180" href="/assets/images/favicon/apple-touch-icon.png"><meta name="apple-mobile-web-app-title" content="HomeLabs"><link rel="manifest" href="/assets/images/favicon/site.webmanifest">', '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;800&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet"><script>\n      const applyTheme = () => {\n        const storedTheme = localStorage.getItem("theme");\n        const prefersDark = window.matchMedia(\n          "(prefers-color-scheme: dark)"\n        ).matches;\n        const initialTheme =\n          storedTheme === "dark" || (!storedTheme && prefersDark)\n            ? "dark"\n            : "light";\n\n        // Hapus kelas yang ada sebelum menambahkan yang baru\n        document.documentElement.classList.remove("light", "dark");\n        document.documentElement.classList.add(initialTheme);\n      };\n\n      // Jalankan skrip saat halaman dimuat pertama kali\n      applyTheme();\n\n      // Jalankan skrip setelah setiap transisi halaman\n      document.addEventListener("astro:after-swap", applyTheme);\n    <\/script>', '</head> <body class="blog-pages-background font-inter"> ', " </body></html>"])), addAttribute(Astro2.generator, "content"), title, renderComponent($$result, "ViewTransitions", $$ClientRouter, {}), renderHead(), renderSlot($$result, $$slots["default"]));
}, "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/layouts/Default.astro", void 0);

export { $$Default as $ };
