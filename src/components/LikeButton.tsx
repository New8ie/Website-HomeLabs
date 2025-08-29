import { useState } from "react";
import { ThumbsUp } from "lucide-react";

type LikeButtonProps = {
  initialLikes: number;
  slug: string;
};

export default function LikeButton({ initialLikes, slug }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);

    try {
      const response = await fetch(`/api/like-post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug }),
      });

      if (response.ok) {
        const data = await response.json();
        setLikes(data.likes);
      }
    } catch (error) {
      console.error("Gagal menambahkan like:", error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLiking}
      className="flex items-center gap-2 p-2 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
      style={{
        backgroundColor: "var(--pages-bg)",
        color: "var(--text-color)",
        border: "1px solid var(--pages-border-shadow)",
        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <ThumbsUp
        fill={likes > 0 ? "var(--nav-link-from)" : "var(--title-color)"}
        strokeWidth={1}
      />
      <span>{likes}</span>
    </button>
  );
}
