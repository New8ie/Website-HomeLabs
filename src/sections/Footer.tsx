
export const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-300 py-10 mt-20 border-t border-zinc-700">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Kiri: Branding */}
          <div className="flex-1 items-start gap-4">
            <img
              src="/assets/images/HomeLabsFont.svg"
              alt="HomeLabs Logo"
              className="w-32 mb-3"
            />
            <p className="text-sm font-cinzel leading-relaxed max-w-xs">
              HomeLabs adalah ruang eksplorasi teknologi, pengalaman proyek, dan
              blog. Dibangun dengan bantuan AI 🦄 dan semangat open-source.
            </p>
          </div>

          {/* Tengah: Navigasi */}
          <div className="flex flex-col font-cinzel gap-2">
            <h3 className="text-yellow-400 font-bold text-sm uppercase mb-2">
              Navigasi
            </h3>
            <a href="/" className="hover:text-yellow-400 transition">
              Home
            </a>
            <a href="/blog" className="hover:text-yellow-400 transition">
              Blog
            </a>
            <a href="/projects" className="hover:text-yellow-400 transition">
              Projects
            </a>
            <a href="/tools" className="hover:text-yellow-400 transition">
              Tools
            </a>
            <a href="/about" className="hover:text-yellow-400 transition">
              About
            </a>
          </div>

          {/* Kanan: Kontak & Sosial */}
          <div className="flex flex-col font-cinzel gap-4">
            <h3 className="text-yellow-400 font-bold text-sm uppercase mb-2">
              Hubungi
            </h3>

            {/* Email */}
            <a
              href="mailto:webadmin@thismydomains.com"
              className="flex items-center gap-2 hover:text-yellow-400 transition"
            >
              <svg
                className="w-5 h-5 fill-zinc-300 hover:fill-yellow-400 transition"
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
              </svg>
              Email
            </a>

            {/* Ikon Sosial */}
            <div className="flex gap-4 items-center mt-2">
              {/* GitHub */}
              <a
                href="https://github.com/new8ie"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <svg
                  className="w-6 h-6 fill-zinc-300 hover:fill-yellow-400 transition"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.8 10.9.6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.4-3.9-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1 .1.6 1.6 2.4 2.1.2-.8.4-1.4.8-1.7-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.6 11.6 0 0 1 6 0C18.9 6 20 6.3 20 6.3c.6 1.6.2 2.8.1 3.1.7.8 1.2 1.9 1.2 3.2 0 4.6-2.7 5.5-5.3 5.8.4.3.8 1 .8 2v3c0 .3.2.7.8.6A11.6 11.6 0 0 0 23.5 12C23.5 5.6 18.4.5 12 .5Z" />
                </svg>
              </a>

              {/* Twitter (X) */}
              <a
                href="https://x.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <svg
                  className="w-6 h-6 fill-zinc-300 hover:fill-yellow-400 transition"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.6 3H4.4C3.6 3 3 3.6 3 4.4v15.2C3 20.4 3.6 21 4.4 21h15.2c.8 0 1.4-.6 1.4-1.4V4.4C21 3.6 20.4 3 19.6 3ZM16.4 16.4h-1.6l-2.2-3.1-2.2 3.1H8.8l3-4.1-3-4.1h1.6l2.2 3.1 2.2-3.1h1.6l-3 4.1 3 4.1Z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg
                  className="w-6 h-6 fill-zinc-300 hover:fill-yellow-400 transition"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 2 .2 2.5.4a5 5 0 0 1 1.8 1.1 5 5 0 0 1 1.1 1.8c.2.5.3 1.3.4 2.5.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 2-.4 2.5a5 5 0 0 1-1.1 1.8 5 5 0 0 1-1.8 1.1c-.5.2-1.3.3-2.5.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-2-.2-2.5-.4a5 5 0 0 1-1.8-1.1 5 5 0 0 1-1.1-1.8c-.2-.5-.3-1.3-.4-2.5C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-2 .4-2.5a5 5 0 0 1 1.1-1.8 5 5 0 0 1 1.8-1.1c.5-.2 1.3-.3 2.5-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4a3.2 3.2 0 0 0-1.2.8 3.2 3.2 0 0 0-.8 1.2c-.2.4-.3 1-.4 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1a3.2 3.2 0 0 0 .8 1.2 3.2 3.2 0 0 0 1.2.8c.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4a3.2 3.2 0 0 0 1.2-.8 3.2 3.2 0 0 0 .8-1.2c.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1a3.2 3.2 0 0 0-.8-1.2 3.2 3.2 0 0 0-1.2-.8c-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1Zm0 3.6a5.4 5.4 0 1 1 0 10.8 5.4 5.4 0 0 1 0-10.8Zm0 1.8a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2Zm5.4-2.3a1.3 1.3 0 1 1-2.6 0 1.3 1.3 0 0 1 2.6 0Z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-6 h-6 fill-zinc-300 hover:fill-yellow-400 transition"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8.3 18H5.6V9h2.7v9ZM6.9 7.8a1.6 1.6 0 1 1 0-3.1 1.6 1.6 0 0 1 0 3.1Zm11.1 10.2h-2.7v-4.3c0-1-.4-1.7-1.3-1.7-.7 0-1.1.5-1.3 1.1-.1.2-.1.5-.1.7v4.2h-2.6V9h2.6v1.2c.3-.6 1-1.4 2.3-1.4 1.7 0 3 1.1 3 3.5V18Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-zinc-500 mt-10">
          © {new Date().getFullYear()} HomeLabs.
        </div>
      </div>
    </footer>
  );
};
