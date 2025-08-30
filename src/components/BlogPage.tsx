import { useState, useEffect } from "react";
import { type Post, type PageData } from "../lib/db/types/blog";
import { Heart } from "lucide-react";

const BlogPage = ({ posts, page }: { posts: Post[]; page: PageData }) => {
  const [postsWithLikes, setPostsWithLikes] = useState(posts);

  // Fungsi untuk mengambil jumlah likes dari API
  const fetchLikes = async (slug: string) => {
    try {
      const response = await fetch(`/api/likes/${slug}`, {
        cache: "no-store", // Penting: Memastikan data terbaru selalu diambil
      });
      if (!response.ok) {
        throw new Error("Failed to fetch likes");
      }
      const data = await response.json();
      return data.likes;
    } catch (error) {
      console.error("Error fetching likes:", error);
      return 0;
    }
  };

  // Fungsi untuk menambah likes dan memperbarui state
  const handleLike = async (slug: string) => {
    try {
      const response = await fetch(`/api/likes/${slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to like post");
      }
      const data = await response.json();

      // Perbarui state postsWithLikes dengan jumlah likes terbaru dari respons API
      setPostsWithLikes((prevPosts) =>
        prevPosts.map((post) =>
          post.slug === slug ? { ...post, likes: data.likes } : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Efek untuk mengambil data likes saat komponen dimuat
  useEffect(() => {
    const fetchInitialLikes = async () => {
      const updatedPosts = await Promise.all(
        posts.map(async (post) => {
          const likes = await fetchLikes(post.slug);
          return { ...post, likes };
        })
      );
      setPostsWithLikes(updatedPosts);
    };

    fetchInitialLikes();
  }, [posts]);

  return (
    <main>
      {postsWithLikes.length === 0 ? (
        <p
          className="text-center mt-10 font-cinzel animate-fade-in-up transition-colors duration-500"
          style={{ color: "var(--text-color)" }}
        >
          No articles match.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {postsWithLikes.map((post) => (
            <div
              key={post.slug}
              className="group transition-all duration-300 transform hover:-translate-y-1"
            >
              <a
                href={`/blog/${post.slug}`}
                className="block w-full h-full"
                aria-label={`Baca postingan tentang ${post.data.title}`}
              >
                <div className="flex flex-col h-full bg-zinc-800/80 rounded-xl shadow-lg border border-zinc-700 overflow-hidden transition-shadow duration-300 group-hover:shadow-2xl">
                  {/* Gambar sebagai cover card */}
                  {post.data.image && (
                    <div className="w-full h-48 lg:h-56 relative overflow-hidden">
                      <img
                        src={post.data.image}
                        alt={post.data.title}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Bagian Konten Kartu */}
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-xs text-yellow-400 font-cinzel mb-2">
                      {new Date(post.data.pubDate).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <h3
                      className="text-lg font-extrabold font-cinzel leading-tight transition-colors duration-500 group-hover:text-yellow-300"
                      style={{ color: "var(--title-color)" }}
                    >
                      {post.data.title}
                    </h3>
                    <p className="mt-2 text-sm font-cinzel text-zinc-300 transition-colors duration-500 line-clamp-3 flex-grow">
                      {post.data.description}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-xs text-yellow-500 font-semibold uppercase tracking-wider transition-all duration-300 group-hover:tracking-widest">
                        Read More &rarr;
                      </span>
                      {/* Tombol likes yang memicu pembaruan state */}
                      <span
                        className="flex items-center gap-1 text-xs text-yellow-400 font-cinzel cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleLike(post.slug);
                        }}
                        title="Click to like this post"
                      >
                        <Heart fill="currentColor" size={12} />
                        {post.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
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