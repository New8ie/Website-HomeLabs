import React from "react";
import "../styles/global.css";
import { type Post, type PageData } from "../../types/blog";

const BlogPage = ({ posts, page }: { posts: Post[]; page: PageData }) => {
  const postsToDisplay = posts || [];

  return (
    <main>
      {postsToDisplay.length === 0 ? (
        <p
          className="text-center mt-10 font-cinzel animate-fade-in-up transition-colors duration-500"
          style={{ color: "var(--text-color)" }}
        >
          No articles match.
        </p>
      ) : (
        <div className="space-y-12">
          {postsToDisplay.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
              aria-label={`Baca postingan tentang ${post.data.title}`}
            >
              <div className="flex flex-col sm:flex-row items-start gap-6 transition-all duration-300 ease-in-out transform group-hover:bg-zinc-800/70 rounded-xl p-4">
                {/* Bagian Gambar */}
                {post.data.image && (
                  <div className="w-full sm:w-1/3 flex-shrink-0 relative h-48 sm:h-auto">
                    <div className="relative w-full h-0 pb-[60%] overflow-hidden rounded-lg">
                      <img
                        src={post.data.image}
                        alt={post.data.title}
                        className="absolute top-0 left-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                )}

                {/* Bagian Konten */}
                <div className="flex-1">
                  <span className="text-sm text-yellow-400 font-cinzel">
                    {new Date(post.data.pubDate).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <h3
                    className="mt-1 text-xl font-extrabold font-cinzel leading-tight transition-colors duration-500 group-hover:text-yellow-300"
                    style={{ color: "var(--title-color)" }}
                  >
                    {post.data.title}
                  </h3>
                  <p className="mt-2 text-xs font-cinzel text-zinc-300 transition-colors duration-500">
                    {post.data.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Navigasi Paginasi */}
      <div
        className="flex justify-center items-center gap-4 mt-12 font-cinzel transition-colors duration-500"
        style={{ color: "var(--text-color)" }}
      >
        {page.url.prev && (
          <a
            href={page.url.prev}
            className="px-4 py-2 rounded-md border-2 transition-all duration-200 shadow-md font-extrabold uppercase tracking-wider transform hover:scale-105 active:opacity-75"
            style={{
              backgroundImage:
                "linear-gradient(to top right, var(--nav-link-from), var(--nav-link-via), var(--nav-link-to))",
              color: "var(--nav-link-text)",
              borderColor: "var(--nav-link-border)",
              boxShadow:
                "0 4px 6px -1px var(--nav-link-shadow), 0 2px 4px -2px var(--nav-link-shadow)",
            }}
          >
            ←
          </a>
        )}
        <span className="flex-1 text-center font-bold text-lg">
          Page {page.currentPage} - {page.lastPage}
        </span>
        {page.url.next && (
          <a
            href={page.url.next}
            className="px-4 py-2 rounded-md border-2 transition-all duration-200 shadow-md font-extrabold uppercase tracking-wider transform hover:scale-105 active:opacity-75"
            style={{
              backgroundImage:
                "linear-gradient(to top right, var(--nav-link-from), var(--nav-link-via), var(--nav-link-to))",
              color: "var(--nav-link-text)",
              borderColor: "var(--nav-link-border)",
              boxShadow:
                "0 4px 6px -1px var(--nav-link-shadow), 0 2px 4px -2px var(--nav-link-shadow)",
            }}
          >
            →
          </a>
        )}
      </div>
    </main>
  );
};

export default BlogPage;
