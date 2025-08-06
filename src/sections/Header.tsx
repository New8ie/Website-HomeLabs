export const HeaderSection = () => {
  return (
    <header className="sticky top-0 bg-zinc-900/60 backdrop-blur-2xl border border-zinc-700 rounded-xl mx-2 mt-2 shadow-lg z-50">
      <div className="container">
        <div className="flex items-center justify-between h-24">
          {/* Tombol navigasi */}
          <div className="flex gap-4 items-center font-bold">
            {[
              { label: "Home", path: "/" },
              { label: "Blog", path: "../blog" },
              { label: "Projects", path: "../projects" },
              { label: "Tools", path: "/tools" },
              { label: "About", path: "/about" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.path}
                className="
                  relative px-3 py-1.5 text-xs md:text-sm font-extrabold uppercase tracking-wide
                  bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-300
                  border-2 border-yellow-800 rounded-md
                  font-serif shadow-md
                  text-gray-900
                  hover:from-yellow-600 hover:to-yellow-400
                  hover:shadow-yellow-300/60
                  transition-all duration-200 ease-in-out
                  outline-none focus:ring-2 focus:ring-yellow-400
                  cursor-pointer
                "
                style={{
                  fontFamily: '"Cinzel-Bolt", "Papyrus", fantasy',
                  textShadow: "0 0 4px #FFD700",
                }}
              >
                <span
                  className="leading-5 drop-shadow-[0_0_1px_gold]"
                  style={{
                    fontFamily: "'Cinzel', 'Papyrus', fantasy",
                    fontWeight: 900,
                    textShadow: "0 0 4px #FFD700",
                  }}
                >
                  {link.label}
                </span>
              </a>
            ))}
          </div>

          {/* Logo kanan */}
          <div className="flex items-center">
            <img
              src="/assets/images/HomeLabsFont.svg"
              alt="logo"
              className="w-28 md:w-40 lg:w-52 mt-4"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
