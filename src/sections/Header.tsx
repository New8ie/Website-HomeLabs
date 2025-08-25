// src/sections/Header.tsx
import { useState, useEffect, useRef } from "react";
import {
  Sun,
  Moon,
  Globe2,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Data untuk tautan navigasi utama
const navLinks = [
  { title: "Home", href: "/" },
  { title: "Blog", href: "/blog" },
  {
    title: "Tools",
    href: "/tools",
    subLinks: [
      { title: "Subnetting", href: "/tools#subnet-calculator" },
      { title: "Bandwidth Converter", href: "/tools#bandwidth-converter" },
      { title: "Power Converter", href: "/tools#power-converter" },
      { title: "RAID Calculator", href: "/tools#raid-calculator" },
      { title: "MAC Lookup", href: "/tools#mac-address-lookup" },
    ],
  },
  { title: "About", href: "/about" },
];

// Definisikan URL gambar untuk setiap mode
const darkLogoUrl = "/assets/images/Logo/horde-logo.png";
const lightLogoUrl = "/assets/images/Logo/ally-logo.png";

// Komponen utama Header
export const HeaderSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toolsDropdownRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState("0px");
  const [smallLogoSrc, setSmallLogoSrc] = useState(darkLogoUrl);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Efek untuk mengelola tinggi menu geser ke bawah secara dinamis
  useEffect(() => {
    const currentMenu = menuRef.current;
    if (isMenuOpen && currentMenu) {
      // Perbarui tinggi setiap kali state isMenuOpen atau isToolsDropdownOpen berubah
      const toolsHeight = isToolsDropdownOpen ? toolsDropdownRef.current?.scrollHeight || 0 : 0;
      const calculatedHeight = currentMenu.scrollHeight + toolsHeight;
      setMaxHeight(`${calculatedHeight}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [isMenuOpen, isToolsDropdownOpen]);

  // Efek untuk memuat tema dari localStorage dan mengatur state & DOM
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const htmlElement = document.documentElement;

      if (
        savedTheme === "dark" ||
        (!savedTheme &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        htmlElement.classList.add("dark");
        setIsDarkMode(true);
        setSmallLogoSrc(darkLogoUrl);
      } else {
        htmlElement.classList.remove("dark");
        setIsDarkMode(false);
        setSmallLogoSrc(lightLogoUrl);
      }
    }
  }, []);

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
  };

  return (
    <header className="header">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
          <div className="flex items-center gap-3">
            <img
              src="/assets/images/Logo/font-logo.svg"
              alt="HomeLabs Logo"
              className="w-32 drop-shadow-glow"
            />
          </div>

          {/* Navigasi Desktop */}
          <div className="hidden md:flex justify-center flex-1">
            <nav className="flex items-center space-x-6 lg:space-x-8 font-bold uppercase">
              {navLinks.map((link) => (
                <div key={link.title} className="relative group">
                  <a
                    href={link.href}
                    className="nav-link-style flex items-center"
                    style={{
                      fontFamily: "'Cinzel', serif",
                    }}
                  >
                    {link.title}
                    {link.subLinks && (
                      <ChevronDown size={16} className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
                    )}
                  </a>
                  {link.subLinks && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-max p-2 bg-zinc-900/95 border border-yellow-700 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50 pointer-events-none group-hover:pointer-events-auto">
                      <ul className="space-y-2">
                        {link.subLinks.map((subLink) => (
                          <li key={subLink.title}>
                            <a
                              href={subLink.href}
                              className="sub-nav-link-style"
                            >
                              {subLink.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Tombol Sisi Kanan */}
          <div className="flex gap-3 items-center">
            <button
              title="Toggle Dark Mode"
              onClick={handleDarkModeToggle}
              className="p-1 rounded-full bg-transparent transition-transform duration-300 transform hover:scale-110"
            >
              <img
                src={smallLogoSrc}
                alt="Logo kecil"
                className="w-16 h-16 rounded-full shadow-lg md:w-20 md:h-20"
              />
            </button>
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
          {navLinks.map((link) => (
            <div key={link.title}>
              {link.subLinks ? (
                // Tombol dropdown untuk mobile
                <button
                  className="nav-mobile-style font-bold w-full text-left"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    textShadow: "0 0 2px gold",
                  }}
                  onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
                >
                  {link.title}
                  <span className="float-right">
                    {isToolsDropdownOpen ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </span>
                </button>
              ) : (
                // Tautan reguler untuk mobile
                <a
                  href={link.href}
                  className="nav-mobile-style font-bold"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    textShadow: "0 0 2px gold",
                  }}
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsToolsDropdownOpen(false);
                  }}
                >
                  {link.title}
                </a>
              )}
              {/* Kontainer sub-navigasi mobile */}
              {link.subLinks && (
                <div
                  ref={toolsDropdownRef}
                  className="pl-4 pt-2 overflow-hidden transition-[max-height] duration-300 ease-in-out"
                  style={{ maxHeight: isToolsDropdownOpen ? toolsDropdownRef.current?.scrollHeight + 'px' : '0px' }}
                >
                  <ul className="space-y-1">
                    {link.subLinks.map((subLink) => (
                      <li key={subLink.title}>
                        <a
                          href={subLink.href}
                          className="sub-nav-mobile-style"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsToolsDropdownOpen(false);
                          }}
                        >
                          {subLink.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};