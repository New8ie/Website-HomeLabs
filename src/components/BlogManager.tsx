import { useState, useEffect } from "react";
import { type Post, type PageData } from "../lib/db/types/blog";
import BlogSideBar from "./BlogSideBar";
import BlogPage from "./BlogPage";

export default function BlogManager({
  allPosts,
  pageData,
}: {
  allPosts: Post[];
  pageData: PageData;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  const featuredPost = allPosts[0];
  const otherPosts = allPosts.slice(1);

  const filterPosts = (query: string, category: string | null) => {
    const lowerCaseQuery = query.toLowerCase();

    const categoryFiltered = category
      ? otherPosts.filter((post) => post.data.category === category)
      : otherPosts;

    const finalResults = categoryFiltered.filter((post) => {
      const title = post.data?.title?.toLowerCase() || "";
      const description = post.data?.description?.toLowerCase() || "";
      return (
        title.includes(lowerCaseQuery) || description.includes(lowerCaseQuery)
      );
    });

    setFilteredPosts(finalResults);
  };

  const handleSearch = (query: string, category: string | null) => {
    setSearchQuery(query);
    setSelectedCategory(category);
    filterPosts(query, category);
  };

  useEffect(() => {
    setFilteredPosts(otherPosts);
  }, [allPosts]);

  useEffect(() => {
    filterPosts(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-16 gap-y-16 mt-8">
      {featuredPost && (
        <div className="lg:col-span-4 mb-16">
          <a href={`/blog/${featuredPost.slug}`} className="group block w-full">
            <div className="relative bg-zinc-800/80 backdrop-blur-sm shadow-2xl rounded-2xl border border-zinc-700 mx-auto h-80 w-full p-4">
              <div className="relative w-full h-full">
                <img
                  src={
                    featuredPost.data.image ||
                    "https://placehold.co/1280x720/18181b/ffffff?text=No+Image"
                  }
                  alt={featuredPost.data.title}
                  className="w-full h-full object-cover object-center rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-2xl"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <span className="text-xs text-yellow-400 font-cinzel mb-1 uppercase tracking-wider">
                    {new Date(featuredPost.data.pubDate).toLocaleDateString(
                      "id-ID",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-cinzel leading-tight">
                    {featuredPost.data.title}
                  </h3>
                  <p className="text-sm sm:text-base text-yellow-400 font-cinzel">
                    {featuredPost.data.description}
                  </p>
                  <div className="flex mt-4">
                    <span className="text-xs text-yellow-500 font-semibold uppercase tracking-wider  transition-all duration-300 transform">
                      Start Read &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      )}

      <div className="lg:col-span-3 order-2 lg:order-1 transition-opacity duration-1000 ease-out animate-fade-in-up">
        <BlogPage posts={filteredPosts} page={pageData} />
      </div>

      <div className="lg:col-span-1 order-1 lg:order-2">
        <BlogSideBar
          onSearch={handleSearch}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
}
