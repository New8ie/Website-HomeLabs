import { useState, useEffect } from "react";
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

// Definisikan URL gambar untuk setiap mode
const hordeMailboxUrl = "/assets/images/Items/mailbox-logo-horde.png";
const allianceMailboxUrl = "/assets/images/Items/mailbox-logo-alliance.png";

export const FooterSection = () => {
  // Inisialisasi state dengan nilai default, menghindari akses 'document' di SSR
  const [mailIconSrc, setMailIconSrc] = useState(hordeMailboxUrl);

  // Efek untuk memuat tema dari localStorage dan mengatur gambar kotak surat
  useEffect(() => {
    // Pastikan kode ini hanya berjalan di sisi klien (browser)
    if (typeof window !== "undefined") {
      const htmlElement = document.documentElement;

      const updateMailboxIcon = () => {
        const isDarkMode = htmlElement.classList.contains("dark");
        const newSrc = isDarkMode ? hordeMailboxUrl : allianceMailboxUrl;
        setMailIconSrc(newSrc);
      };

      // Panggil sekali saat mount untuk mengatur nilai awal yang benar di klien
      updateMailboxIcon();

      // Buat MutationObserver untuk memantau perubahan atribut 'class' pada <html>
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.attributeName === "class") {
            updateMailboxIcon();
          }
        });
      });

      observer.observe(htmlElement, { attributes: true });

      // Cleanup observer saat komponen di-unmount
      return () => observer.disconnect();
    }
  }, []);

  return (
    <footer className="footer">
      <div className="container mx-auto px-6 gap-4 md:px-8 lg:px-12">
        {/* Mengubah menjadi 2 kolom di desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 text-center md:text-left">
          {/* Kolom Kiri: Gabungan Navigasi & Branding */}
          <div className="flex flex-col md:flex-row items-center md: gap-12">
            {/* Navigasi */}
            <div className="flex flex-col items-center md:items-center font-cinzel gap-2">
              <h3 className="text-yellow-400 font-cinzel text-sm uppercase mb-2">
                Navigasi
              </h3>
              {navLinks.map(({ title, href }) => (
                <a key={title} href={href} className="hover:text-yellow-400 font-cinzel transition">
                  {title}
                </a>
              ))}
            </div>

            {/* Branding */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <img
                src="/assets/images/Logo/font-logo.svg"
                alt="HomeLabs Logo"
                className="w-36 drop-shadow-glow"
              />
              <p className="text-sm font-cinzel leading-relaxed text-zinc-400 max-w-xs mx-auto md:mx-0">
                HomeLabs is a space for technology exploration, project
                experiences, and blogging. Built with the help of AI 🦄 and an
                open-source spirit.
              </p>
            </div>
          </div>

          {/* Kolom Kanan: Hubungi & Sosial */}
          <div className="flex flex-col items-center md:items-end font-cinzel gap-4"> 
            {/* Tautan email dengan gambar asli */}
            <a
              href="mailto:webadmin@thismydomains.com"
              className="flex items-center gap-2 hover:text-yellow-400 transition"
              aria-label="Email Web Admin"
            >
              <img
                src={mailIconSrc}
                alt="email decorative"
                className="w-32 h-32"
              />
            </a>
            {/* Ikon Sosial Media yang dipisahkan */}
            <div className="flex gap-5 items-center mt-1">
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
        <div className="text-center text-sm --title-color mt-6">
          &copy; {new Date().getFullYear()} HomeLabs. All rights reserved.
        </div>
      </div>
    </footer>
  );
};