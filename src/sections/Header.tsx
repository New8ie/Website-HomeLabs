import { Sun, Globe2 } from "lucide-react";

export const HeaderSection = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-yellow-600/30 bg-gradient-to-br from-zinc-900/80 to-zinc-800/60 shadow-lg shadow-yellow-500/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">

          {/* Logo */}
          <div className="flex items-center gap-4">
            <img
              src="/assets/images/HomeLabsFont.svg"
              alt="HomeLabs Logo"
              className="h-16 md:h-20 lg:h-24 drop-shadow-glow"
            />
          </div>

          {/* Navigasi */}
          <nav className="flex gap-4 items-center font-bold text-xs md:text-sm uppercase tracking-wider">
            {[
              { label: "Home", path: "/" },
              { label: "Blog", path: "/blog" },
              { label: "Projects", path: "/projects" },
              { label: "Tools", path: "/tools" },
              { label: "About", path: "/about" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.path}
                className="px-4 py-2 rounded-md border border-yellow-700 bg-gradient-to-tr from-yellow-900 via-yellow-700 to-yellow-500 text-black hover:from-yellow-600 hover:to-yellow-400 transition-all duration-200 shadow-md hover:shadow-yellow-300/30"
                style={{
                  fontFamily: "'Cinzel', serif",
                  textShadow: "0 0 2px gold",
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Toggle Section (Horizontal Right) */}
          <div className="flex gap-3 items-center">
            {/* Dark Mode */}
            <button
              title="Toggle Dark Mode"
              className="p-2 rounded-full bg-yellow-700 hover:bg-yellow-500 text-black transition-all border border-yellow-300 shadow"
            >
              <Sun className="h-5 w-5" />
            </button>

            {/* Language Toggle */}
            <button
              title="Toggle Language"
              className="p-2 rounded-full bg-yellow-700 hover:bg-yellow-500 text-black transition-all border border-yellow-300 shadow"
            >
              <Globe2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
