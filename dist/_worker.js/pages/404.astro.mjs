globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BbIlNa7L.mjs';
import { $ as $$Default } from '../chunks/Default_C-LqwSQP.mjs';
/* empty css                               */
export { r as renderers } from '../chunks/_@astro-renderers_B1w336LU.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$Default, { "title": "Error Page", "data-astro-cid-zetdm5md": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<main class="h-screen flex flex-col justify-between py-16 text-white overflow-hidden" data-astro-cid-zetdm5md> <div class="flex-grow flex items-center justify-center relative z-10 p-4" data-astro-cid-zetdm5md> <div class="text-center" data-astro-cid-zetdm5md> <!-- Judul 404 yang besar dan berani dengan animasi --> <h1 class="text-8xl md:text-[10rem] font-extrabold font-cinzel text-yellow-500 mb-4 tracking-wider drop-shadow-lg animate-fade-in-up" style="--animation-delay: 0.2s;" data-astro-cid-zetdm5md>
404
</h1> <!-- Pesan yang lebih menarik dengan font Cinzel --> <p class="mt-4 text-xl md:text-3xl font-cinzel text-zinc-300 animate-fade-in-up" style="--animation-delay: 0.4s;" data-astro-cid-zetdm5md>
No Pages match your search.
</p> <!-- Tombol untuk kembali ke beranda --> <a href="/" class="mt-8 inline-block px-8 py-3 rounded-md border-2 border-yellow-700/50 bg-gradient-to-tr from-yellow-900/50 to-yellow-700/50 text-yellow-400 font-extrabold uppercase tracking-wider transition-all duration-300 hover:from-yellow-600 hover:to-yellow-400 hover:text-black hover:shadow-lg hover:shadow-yellow-300/30 animate-fade-in-up" style="--animation-delay: 0.6s;" data-astro-cid-zetdm5md>
Back to Web
</a> </div> </div> </main> ` })} `;
}, "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/pages/404.astro", void 0);

const $$file = "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$404,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
