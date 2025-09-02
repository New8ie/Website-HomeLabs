globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_BbIlNa7L.mjs';
/* empty css                                  */
import { $ as $$Default } from '../chunks/Default_C-LqwSQP.mjs';
import { H as HeaderSection, F as FooterSection } from '../chunks/Footer_aeJBNuTl.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_B1w336LU.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$Default, { "title": "About me & HomeLabs" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeaderSection", HeaderSection, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/sections/Header", "client:component-export": "HeaderSection" })} ${maybeRenderHead()}<main class="relative py-16 min-h-[80vh]"> <div class="absolute inset-0 z-0"> <div class="absolute inset-0"></div> </div> <div class="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12"> <aside class="flex flex-col gap-6"> <section class="p-8 rounded-3xl shadow-2xl animate-fade-in-up backdrop-blur-sm border border-zinc-700"${addAttribute({
    backgroundColor: "var(--pages-bg)"
  }, "style")}> <div class="relative w-full mb-6 flex flex-col items-center"> <img src="/assets/images/Items/fachmi.jpeg" alt="Fachmi's profile picture" class="rounded-full w-40 h-40 object-cover border-4 transition-colors mb-4 **animate-pulse-slow**"${addAttribute({
    borderColor: "var(--title-color)"
  }, "style")}> <h1 class="text-2xl font-extrabold font-cinzel mb-1 tracking-wider text-center transition-colors"${addAttribute({ color: "var(--title-color)" }, "style")}>
Fachmi
</h1> <p class="text-sm font-cinzel text-center transition-colors"${addAttribute({ color: "var(--text-color)" }, "style")}>
Build, Manage, and Learn.
</p> </div> </section> </aside> <div class="space-y-12"> <section class="p-8 md:p-12 rounded-3xl shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] animate-slide-in-left border border-zinc-700"${addAttribute({
    backgroundColor: "var(--pages-bg)"
  }, "style")}> <h2 class="text-3xl font-bold font-cinzel mb-4 transition-colors"${addAttribute({ color: "var(--title-color)" }, "style")}>
Who am I?
</h2> <p class="mb-4 font-cinzel backdrop-blur-sm leading-relaxed transition-colors"${addAttribute({ color: "var(--text-color)" }, "style")}>
Hello! My name is Fachmi, and I am an enthusiast in the fields of <strong class="transition-colors"${addAttribute({ color: "var(--title-color)" }, "style")}>
HomeLabs
</strong> and <strong class="transition-colors"${addAttribute({ color: "var(--title-color)" }, "style")}>
Networking
</strong>. From the beginning, I have enjoyed experimenting with
            different operating systems, virtualization, and network
            configurations at home.
</p> <p class="transition-colors italic text-center mb-4 font-cinzel leading-relaxed"${addAttribute({ color: "var(--title-color)" }, "style")}>
"Find joy in your work, and your efforts will feel like a creative
            pursuit, not a chore. That's where true success begins."
</p> <p class="mb-4 font-cinzel leading-relaxed transition-colors"${addAttribute({ color: "var(--text-color)" }, "style")}>
This website is where I document my journey, record the lessons I've
            learned, and share knowledge that might be useful to others. My goal
            is to help you build and manage your own digital infrastructure with
            ease.
</p> </section> <section class="p-8 md:p-12 rounded-3xl backdrop-blur-sm shadow-2xl transition-all duration-300 hover:scale-[1.01] animate-slide-in-right border border-zinc-700"${addAttribute({
    backgroundColor: "var(--pages-bg)"
  }, "style")}> <h2 class="text-3xl font-bold font-cinzel mb-4 transition-colors"${addAttribute({ color: "var(--title-color)" }, "style")}>
Benefits & Objectives
</h2> <p class="mb-4 font-cinzel leading-relaxed transition-colors"${addAttribute({ color: "var(--text-color)" }, "style")}>
I believe that the most effective way to learn technology is through
            hands-on experience. Through this blog, I will share:
</p> <ul class="list-disc list-inside font-cinzel space-y-2 transition-colors"${addAttribute({ color: "var(--text-color)" }, "style")}> <li>Step-by-step guides for building a HomeLab.</li> <li>Reviews of the hardware and software I use.</li> <li>Solutions to common problems I often face.</li> <li>Tips and tricks for optimizing your network.</li> </ul> <p class="mt-4 font-cinzel leading-relaxed transition-colors"${addAttribute({ color: "var(--text-color)" }, "style")}>
Thank you for visiting. Let's learn and create together!
</p> </section> </div> </div> </main> ${renderComponent($$result2, "FooterSection", FooterSection, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/sections/Footer", "client:component-export": "FooterSection" })} ` })}`;
}, "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/pages/about.astro", void 0);

const $$file = "/Users/fachmi/HomeLabs/MyProject/Dev/Website-HomeLabs/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
