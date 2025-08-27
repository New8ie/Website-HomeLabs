import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

// Komponen ini mengelola logika tema (gelap/terang) menggunakan localStorage
const ThemeManager = () => {
  // State untuk melacak tema saat ini. Gunakan nilai default "light" untuk SSR.
  const [theme, setTheme] = useState("light");

  // useEffect untuk membaca preferensi dari localStorage saat komponen dimuat
  useEffect(() => {
    // Pastikan kode ini hanya berjalan di sisi klien (browser)
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      // Jika ada tema yang tersimpan, gunakan itu. Jika tidak, gunakan preferensi sistem.
      if (savedTheme) {
        setTheme(savedTheme);
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
      }
    }
  }, []);

  // useEffect untuk menerapkan kelas 'dark' ke elemen <html> dan menyimpan ke localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const htmlElement = document.documentElement;
      if (theme === "dark") {
        htmlElement.classList.add("dark");
      } else {
        htmlElement.classList.remove("dark");
      }
      // Simpan tema ke localStorage agar tetap ada saat pindah halaman
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  // Fungsi untuk beralih tema
  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-zinc-300 hover:text-yellow-400 transition"
      aria-label="Toggle theme"
    >
      {/* Tampilkan ikon yang berbeda sesuai tema */}
      {theme === "dark" ? (
        <Sun className="w-6 h-6" />
      ) : (
        <Moon className="w-6 h-6" />
      )}
    </button>
  );
};

export default ThemeManager;
