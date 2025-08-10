import { useState, useEffect, useRef } from "react";
import { Sun, Globe2, Menu, X, CheckCircle } from "lucide-react";

// Data untuk tautan navigasi
const navLinks = [
  { title: "Home", href: "/" },
  { title: "Blog", href: "/blog" },
  { title: "Tools", href: "/tools" },
  { title: "About", href: "/about" },
];

export const HeaderSection = () => {
  // State untuk mengelola status menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Ref untuk mengakses elemen DOM menu geser ke bawah dengan tipe yang benar
  const menuRef = useRef<HTMLDivElement>(null);
  // State untuk mengelola tinggi menu geser ke bawah untuk animasi
  const [maxHeight, setMaxHeight] = useState("0px");
  // State untuk menampilkan pesan kustom untuk dark mode
  const [isDarkModeMessageVisible, setIsDarkModeMessageVisible] = useState(false);
  // State untuk menampilkan pesan kustom untuk ganti bahasa
  const [isLanguageMessageVisible, setIsLanguageMessageVisible] = useState(false);

  // Efek untuk mengelola tinggi menu geser ke bawah
  useEffect(() => {
    // Periksa apakah menuRef.current ada sebelum mengakses propertinya
    if (menuRef.current) {
      if (isMenuOpen) {
        // Atur tinggi maksimum ke tinggi scroll elemen saat menu terbuka
        setMaxHeight(menuRef.current.scrollHeight + "px");
      } else {
        // Atur tinggi maksimum ke 0 saat menu tertutup
        setMaxHeight("0px");
      }
    }
  }, [isMenuOpen]);

  // Efek untuk menyembunyikan pesan dark mode setelah beberapa detik
  useEffect(() => {
    if (isDarkModeMessageVisible) {
      const timer = setTimeout(() => {
        setIsDarkModeMessageVisible(false);
      }, 3000); // Sembunyikan setelah 3 detik
      return () => clearTimeout(timer);
    }
  }, [isDarkModeMessageVisible]);
  
  // Efek untuk menyembunyikan pesan bahasa setelah beberapa detik
  useEffect(() => {
    if (isLanguageMessageVisible) {
      const timer = setTimeout(() => {
        setIsLanguageMessageVisible(false);
      }, 3000); // Sembunyikan setelah 3 detik
      return () => clearTimeout(timer);
    }
  }, [isLanguageMessageVisible]);

  // Fungsi untuk menangani toggle dark mode
  const handleDarkModeToggle = () => {
    document.documentElement.classList.toggle("dark");
    setIsDarkModeMessageVisible(true);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-yellow-600/30 bg-gradient-to-br from-zinc-900/80 to-zinc-800/60 shadow-lg shadow-yellow-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/assets/images/Logo/footer1-a-logo.svg"
              alt="HomeLabs Logo"
              className="w-32 drop-shadow-glow"
            />
          </div>

          {/* Navigasi Desktop */}
          <nav className="hidden md:flex gap-3 items-center font-bold text-xs sm:text-sm lg:text-base uppercase tracking-wider">
            {navLinks.map(({ title, href }) => (
              <a
                key={title}
                href={href}
                className="px-3 py-1.5 lg:px-4 lg:py-2 rounded-md border border-yellow-700 bg-gradient-to-tr from-yellow-900 via-yellow-700 to-yellow-500 text-black hover:from-yellow-600 hover:to-yellow-400 transition-all duration-200 shadow-md hover:shadow-yellow-300/30"
                style={{
                  fontFamily: "'Cinzel', serif",
                  textShadow: "0 0 2px gold",
                }}
              >
                {title}
              </a>
            ))}
          </nav>

          {/* Tombol Sisi Kanan */}
          <div className="flex gap-3 items-center">
            {/* Dark Mode Toggle */}
            <button
              title="Toggle Dark Mode"
              className="p-2 rounded-full bg-yellow-700 hover:bg-yellow-500 text-black transition-all border border-yellow-300 shadow"
              onClick={handleDarkModeToggle}
            >
              <Sun className="h-5 w-5" />
            </button>

            {/* Language Toggle dengan pesan kustom */}
            <button
              title="Toggle Language"
              className="p-2 rounded-full bg-yellow-700 hover:bg-yellow-500 text-black transition-all border border-yellow-300 shadow"
              onClick={() => setIsLanguageMessageVisible(true)}
            >
              <Globe2 className="h-5 w-5" />
            </button>

            {/* Tombol Toggle Menu Mobile */}
            <button
              className="md:hidden p-2 rounded-full bg-yellow-700 hover:bg-yellow-500 text-black border border-yellow-300 shadow"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navigasi Mobile Geser ke Bawah */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className="md:hidden overflow-hidden bg-zinc-900/95 border-t border-yellow-700 shadow-lg transition-[max-height] duration-300 ease-in-out will-change-max-height"
        style={{ maxHeight }}
        aria-hidden={!isMenuOpen}
      >
        <div className="px-4 py-4 space-y-2">
          {navLinks.map(({ title, href }) => (
            <a
              key={title}
              href={href}
              className="block px-4 py-2 rounded-md border border-yellow-700 bg-gradient-to-tr from-yellow-900 via-yellow-700 to-yellow-500 text-black hover:from-yellow-600 hover:to-yellow-400 transition-all duration-200 shadow-md hover:shadow-yellow-300/30 text-sm font-bold uppercase tracking-wider"
              style={{
                fontFamily: "'Cinzel', serif",
                textShadow: "0 0 2px gold",
              }}
              onClick={() => setIsMenuOpen(false)} // tutup menu saat tautan diklik
            >
              {title}
            </a>
          ))}
        </div>
      </div>

      {/* Pesan kustom untuk dark mode */}
      {isDarkModeMessageVisible && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999]">
          <div className="bg-zinc-900/90 text-yellow-500 p-4 rounded-lg shadow-2xl flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <p>Pesan: Mode gelap diaktifkan/dinonaktifkan!</p>
          </div>
        </div>
      )}

      {/* Pesan kustom untuk ganti bahasa */}
      {isLanguageMessageVisible && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999]">
          <div className="bg-zinc-900/90 text-yellow-500 p-4 rounded-lg shadow-2xl flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <p>Pesan: Toggle bahasa diklik!</p>
          </div>
        </div>
      )}
    </header>
  );
};