globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createLucideIcon, j as jsxRuntimeExports, X } from './x_DBBlyqt9.mjs';
import { a as reactExports } from './_@astro-renderers_B1w336LU.mjs';
/* empty css                          */

/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode$1 = [
  [
    "path",
    {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      key: "mvr1a0"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode$1);

/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);

const categories = [
  "All",
  "Linux",
  "Windows",
  "MacOS",
  "Open-Source",
  "Networking"
];
const BlogSideBar = ({
  onSearch,
  searchQuery,
  selectedCategory
}) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = reactExports.useState(false);
  const handleCategoryClick = (category) => {
    const newCategory = category === "All" ? null : category;
    onSearch(searchQuery, newCategory);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(e.currentTarget.value, selectedCategory);
    }
  };
  const clearSearch = () => {
    onSearch("", selectedCategory);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "sidebar-card-content p-6 rounded-xl text-zinc-200 sticky top-28 z-10 font-cinzel transition-colors duration-500 sb-gradient-border-container",
      style: { backgroundColor: "var(--footer-bg)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "group block w-full h-full text-xl font-extrabold text-center mb-4 tracking-wider",
              style: { color: "var(--title-color)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setIsSearchModalOpen(true),
              className: "flex-shrink-0 p-3 rounded-md border font-cinzel transition-all duration-200 shadow-md font-extrabold uppercase tracking-wider text-lg transform hover:scale-110 active:opacity-75",
              "aria-label": "Search",
              style: {
                backgroundImage: "linear-gradient(to top right, var(--nav-link-from), var(--nav-link-via), var(--nav-link-to))",
                color: "var(--nav-link-text)",
                borderColor: "var(--nav-link-border)",
                borderWidth: "1px"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Search,
                {
                  className: "w-5 h-5",
                  style: { color: "var(--nav-link-text)" }
                }
              )
            }
          )
        ] }),
        isSearchModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex justify-center items-center pt-10 px-4 sm:px-0 backdrop-blur-sm bg-black/60 transition-opacity duration-300 ease-in-out", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0",
              onClick: () => setIsSearchModalOpen(false)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-zinc-900 rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 shadow-xl transform transition-all duration-300 scale-100 opacity-100 relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setIsSearchModalOpen(false),
                className: "text-zinc-400 hover:text-zinc-200",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6" })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row space-x-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    value: searchQuery,
                    onChange: (e) => onSearch(e.target.value, selectedCategory),
                    onKeyDown: handleKeyDown,
                    placeholder: "Search",
                    className: "w-full pl-4 pr-12 py-2 rounded-md font-inter focus:outline-none transition-all duration-300 ease-in-out",
                    style: {
                      backgroundColor: "var(--background-color)",
                      color: "var(--text-color)",
                      borderColor: "var(--border-bg)",
                      borderWidth: "1px"
                    }
                  }
                ),
                searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: clearSearch,
                    className: "absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-zinc-400 hover:text-white",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => onSearch(searchQuery, selectedCategory),
                  className: "flex-shrink-0 p-3 rounded-md border font-cinzel transition-all duration-200 shadow-md font-extrabold uppercase tracking-wider text-lg transform hover:scale-110 active:opacity-75",
                  "aria-label": "Search",
                  style: {
                    backgroundImage: "linear-gradient(to top right, var(--nav-link-from), var(--nav-link-via), var(--nav-link-to))",
                    color: "var(--nav-link-text)",
                    borderColor: "var(--nav-link-border)",
                    borderWidth: "1px",
                    boxShadow: "0 4px 6px -1px var(--nav-link-shadow), 0 2px 4px -2px var(--nav-link-shadow)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Search,
                    {
                      className: "w-5 h-5",
                      style: { color: "var(--nav-link-text)" }
                    }
                  )
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "text-xl font-extrabold text-center mb-4 tracking-wider transition-colors duration-500",
              style: { color: "var(--title-color)" },
              children: "Category"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-2", children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => handleCategoryClick(cat),
              className: `px-4 py-1 rounded-full text-xs font-semibold uppercase transition-all duration-200
                              ${selectedCategory === cat ? "bg-yellow-700/80 text-white shadow-md" : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50"}`,
              children: cat
            },
            cat
          )) })
        ] })
      ]
    }
  ) });
};

const BlogPage = ({ posts, page }) => {
  const [postsWithLikes, setPostsWithLikes] = reactExports.useState(posts);
  const fetchLikes = async (slug) => {
    try {
      const response = await fetch(`/api/likes/${slug}`, {
        cache: "no-store"
        // Penting: Memastikan data terbaru selalu diambil
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
  const handleLike = async (slug) => {
    try {
      const response = await fetch(`/api/likes/${slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error("Failed to like post");
      }
      const data = await response.json();
      setPostsWithLikes(
        (prevPosts) => prevPosts.map(
          (post) => post.slug === slug ? { ...post, likes: data.likes } : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
    postsWithLikes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-center mt-10 font-cinzel animate-fade-in-up transition-colors duration-500",
        style: { color: "var(--text-color)" },
        children: "No articles match."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: postsWithLikes.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "group transition-all duration-300 transform hover:-translate-y-1",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `/blog/${post.slug}`,
            className: "block w-full h-full",
            "aria-label": `Baca postingan tentang ${post.data.title}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full bg-zinc-800/80 rounded-xl shadow-lg border border-zinc-700 overflow-hidden transition-shadow duration-300 group-hover:shadow-2xl", children: [
              post.data.image && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-48 lg:h-56 relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: post.data.image,
                  alt: post.data.title,
                  className: "w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex flex-col flex-grow", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-yellow-400 font-cinzel mb-2", children: new Date(post.data.pubDate).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "text-lg font-extrabold font-cinzel leading-tight transition-colors duration-500 group-hover:text-yellow-300",
                    style: { color: "var(--title-color)" },
                    children: post.data.title
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm font-cinzel text-zinc-300 transition-colors duration-500 line-clamp-3 flex-grow", children: post.data.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex justify-between items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-yellow-500 font-semibold uppercase tracking-wider transition-all duration-300 group-hover:tracking-widest", children: "Read More →" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "flex items-center gap-1 text-xs text-yellow-400 font-cinzel cursor-pointer",
                      onClick: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleLike(post.slug);
                      },
                      title: "Click to like this post",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { fill: "currentColor", size: 12 }),
                        post.likes
                      ]
                    }
                  )
                ] })
              ] })
            ] })
          }
        )
      },
      post.slug
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex justify-center items-center gap-4 mt-12 font-cinzel transition-colors duration-500",
        style: { color: "var(--text-color)" },
        children: [
          page.url.prev && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: page.url.prev,
              className: "px-4 py-2 rounded-md border-2 transition-all duration-200 shadow-md font-extrabold uppercase tracking-wider transform hover:scale-105 active:opacity-75",
              style: {
                backgroundImage: "linear-gradient(to top right, var(--nav-link-from), var(--nav-link-via), var(--nav-link-to))",
                color: "var(--nav-link-text)",
                borderColor: "var(--nav-link-border)",
                boxShadow: "0 4px 6px -1px var(--nav-link-shadow), 0 2px 4px -2px var(--nav-link-shadow)"
              },
              children: "←"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-1 text-center font-bold text-lg", children: [
            "Page ",
            page.currentPage,
            " - ",
            page.lastPage
          ] }),
          page.url.next && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: page.url.next,
              className: "px-4 py-2 rounded-md border-2 transition-all duration-200 shadow-md font-extrabold uppercase tracking-wider transform hover:scale-105 active:opacity-75",
              style: {
                backgroundImage: "linear-gradient(to top right, var(--nav-link-from), var(--nav-link-via), var(--nav-link-to))",
                color: "var(--nav-link-text)",
                borderColor: "var(--nav-link-border)",
                boxShadow: "0 4px 6px -1px var(--nav-link-shadow), 0 2px 4px -2px var(--nav-link-shadow)"
              },
              children: "→"
            }
          )
        ]
      }
    )
  ] });
};

function BlogManager({
  allPosts,
  pageData
}) {
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [selectedCategory, setSelectedCategory] = reactExports.useState(null);
  const [filteredPosts, setFilteredPosts] = reactExports.useState([]);
  const featuredPost = allPosts[0];
  const otherPosts = allPosts.slice(1);
  const filterPosts = (query, category) => {
    const lowerCaseQuery = query.toLowerCase();
    const categoryFiltered = category ? otherPosts.filter((post) => post.data.category === category) : otherPosts;
    const finalResults = categoryFiltered.filter((post) => {
      const title = post.data?.title?.toLowerCase() || "";
      const description = post.data?.description?.toLowerCase() || "";
      return title.includes(lowerCaseQuery) || description.includes(lowerCaseQuery);
    });
    setFilteredPosts(finalResults);
  };
  const handleSearch = (query, category) => {
    setSearchQuery(query);
    setSelectedCategory(category);
    filterPosts(query, category);
  };
  reactExports.useEffect(() => {
    setFilteredPosts(otherPosts);
  }, [allPosts]);
  reactExports.useEffect(() => {
    filterPosts(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-x-16 gap-y-16 mt-8", children: [
    featuredPost && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-4 mb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `/blog/${featuredPost.slug}`, className: "group block w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative bg-zinc-800/80 backdrop-blur-sm shadow-2xl rounded-2xl border border-zinc-700 mx-auto h-80 w-full p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: featuredPost.data.image || "https://placehold.co/1280x720/18181b/ffffff?text=No+Image",
          alt: featuredPost.data.title,
          className: "w-full h-full object-cover object-center rounded-2xl"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 p-8 text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-yellow-400 font-cinzel mb-1 uppercase tracking-wider", children: new Date(featuredPost.data.pubDate).toLocaleDateString(
          "id-ID",
          {
            year: "numeric",
            month: "short",
            day: "numeric"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-cinzel leading-tight", children: featuredPost.data.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm sm:text-base text-yellow-400 font-cinzel", children: featuredPost.data.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-yellow-500 font-semibold uppercase tracking-wider  transition-all duration-300 transform", children: "Start Read →" }) })
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3 order-2 lg:order-1 transition-opacity duration-1000 ease-out animate-fade-in-up", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BlogPage, { posts: filteredPosts, page: pageData }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1 order-1 lg:order-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      BlogSideBar,
      {
        onSearch: handleSearch,
        searchQuery,
        selectedCategory
      }
    ) })
  ] });
}

export { BlogManager as B };
