import { Github, Twitter, Instagram, Linkedin } from "lucide-react";

// Data untuk tautan navigasi, konsisten dengan Header
const navLinks = [
  { title: "Home", href: "/" },
  { title: "Blog", href: "/blog" },
  { title: "Tools", href: "/tools" },
  { title: "About", href: "/about" },
];

// Data untuk tautan sosial media
const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/new8ie",
    icon: Github,
  },
  {
    name: "Twitter",
    href: "https://x.com/mfachmi",
    icon: Twitter,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/mfachmi.alhasni",
    icon: Instagram,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mohamad-fachmi-90b53074/",
    icon: Linkedin,
  },
];

export const FooterSection = () => {
  return (
    <footer className="relative bg-zinc-900/90 backdrop-blur-md border-t border-yellow-600/30 shadow-inner shadow-yellow-500/10 py-16 mt-20 text-zinc-300">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 text-center md:text-left">
          {/* Kolom Kiri: Branding */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <img
              src="/assets/images/Logo/footer1-logo.svg"
              alt="HomeLabs Logo"
              className="w-36 drop-shadow-glow"
            />
            <p className="text-sm font-cinzel leading-relaxed text-zinc-400 max-w-xs mx-auto md:mx-0">
              HomeLabs adalah ruang eksplorasi teknologi, pengalaman proyek,
              dan blog. Dibangun dengan bantuan AI 🦄 dan semangat open-source.
            </p>
          </div>

          {/* Kolom Tengah: Navigasi */}
          <div className="flex flex-col items-center md:items-start font-cinzel gap-2">
            <h3 className="text-yellow-400 font-cinzel text-sm uppercase mb-2">
              Navigasi
            </h3>
            {navLinks.map(({ title, href }) => (
              <a key={title} href={href} className="hover:text-yellow-400 transition">
                {title}
              </a>
            ))}
          </div>

          {/* Kolom Kanan: Hubungi & Sosial */}
          <div className="flex flex-col items-center md:items-start font-cinzel gap-4"> 
            {/* Tautan email dengan gambar asli */}
            <a
              href="mailto:webadmin@thismydomains.com"
              className="flex items-center gap-2 hover:text-yellow-400 transition"
              aria-label="Email Web Admin"
            >
              <img
                src="/assets/images/Logo/mailbox-logo-horde.png"
                alt="email decorative"
                className="w-32 h-32"
              />
            </a>
            {/* Ikon Sosial Media yang dipisahkan */}
            <div className="flex gap-5 items-center mt-5">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                >
                  <Icon className="w-6 h-6 fill-zinc-300 hover:fill-yellow-400 transition" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-zinc-500 mt-12">
          © {new Date().getFullYear()} HomeLabs. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
