import { useState, useEffect, useRef } from "react";
import { Sun, Moon, Globe2, Menu, X } from "lucide-react";

// Data untuk tautan navigasi
const navLinks = [
  { title: "Home", href: "/" },
  { title: "Blog", href: "/blog" },
  { title: "Tools", href: "/tools" },
  { title: "About", href: "/about" },
];

// Definisikan URL gambar untuk setiap mode
const darkLogoUrl = "/assets/images/Logo/horde-logo.png";
const lightLogoUrl = "/assets/images/Logo/ally-logo.png";

// Komponen utama Header
export const HeaderSection = () => {
  // State untuk mengelola status menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Ref untuk mengakses elemen DOM menu geser ke bawah, dengan tipe yang diperbaiki
  const menuRef = useRef<HTMLDivElement>(null);
  // State untuk mengelola tinggi menu geser ke bawah untuk animasi
  const [maxHeight, setMaxHeight] = useState("0px");
  // State untuk mengelola URL gambar logo kecil
  const [smallLogoSrc, setSmallLogoSrc] = useState(darkLogoUrl);
  // State baru untuk melacak tema saat ini, diinisialisasi secara default untuk SSR
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Efek untuk mengelola tinggi menu geser ke bawah
  useEffect(() => {
    // Periksa apakah menuRef.current ada sebelum mengakses propertinya
    const currentMenu = menuRef.current;
    if (isMenuOpen && currentMenu) {
      setMaxHeight(currentMenu.scrollHeight + "px");
    } else {
      setMaxHeight("0px");
    }
  }, [isMenuOpen]);

  // Efek untuk memuat tema dari localStorage dan mengatur state & DOM
  useEffect(() => {
    // Pastikan kode ini hanya berjalan di sisi klien (browser)
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const htmlElement = document.documentElement;

      if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        htmlElement.classList.add("dark");
        setIsDarkMode(true);
        setSmallLogoSrc(darkLogoUrl);
      } else {
        htmlElement.classList.remove("dark");
        setIsDarkMode(false);
        setSmallLogoSrc(lightLogoUrl);
      }
    }
  }, []); // [] memastikan ini hanya berjalan sekali saat mount di klien

  // Fungsi untuk menangani toggle dark mode
  const handleDarkModeToggle = () => {
    const htmlElement = document.documentElement;
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);

    if (newIsDarkMode) {
      htmlElement.classList.add("dark");
      setSmallLogoSrc(darkLogoUrl);
      localStorage.setItem("theme", "dark");
    } else {
      htmlElement.classList.remove("dark");
      setSmallLogoSrc(lightLogoUrl);
      localStorage.setItem("theme", "light");
    }
    // Pesan notifikasi tidak lagi ditampilkan
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-yellow-600/30 bg-gradient-to-br from-zinc-900/80 to-zinc-800/60 shadow-lg shadow-yellow-500/10">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
          {/* Logo Utama dan Logo Kecil (dipindah ke sini) */}
          <div className="flex items-center gap-3">
            <img
              src="/assets/images/Logo/font-logo.svg"
              alt="HomeLabs Logo"
              className="w-32 drop-shadow-glow"
            />
            {/* Logo kecil sekarang berada di sebelah kanan logo utama dan lebih besar */}
            <img
              src={smallLogoSrc}
              alt="Logo kecil"
              className="w-16 h-16 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg md:w-20 md:h-20"
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
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
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
      {/* Pesan kustom untuk dark mode telah dihapus */}
      {/* Pesan kustom untuk ganti bahasa telah dihapus */}
    </header>
  );
};
