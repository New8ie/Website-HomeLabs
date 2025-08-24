// src/components/LikeButton.tsx
import React, { useState } from "react";
import { Heart } from "lucide-react";

type LikeButtonProps = {
  initialLikes: number;
  slug: string;
};

export default function LikeButton({ initialLikes, slug }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (isLiking) return; // Mencegah klik ganda
    setIsLiking(true);

    try {
      const response = await fetch(`/api/like-post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug }), // ✅ Kirim slug di body permintaan
      });

      if (response.ok) {
        setLikes((prevLikes) => prevLikes + 1);
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
        color: likes > 0 ? "var(--accent-color)" : "var(--text-color)",
        border: "1px solid var(--border-bg)",
        boxShadow: "0px 4px 20px 0px var(--shadow-color)",
      }}
    >
      <Heart fill={likes > 0 ? "currentColor" : "none"} />
      <span className="text-sm">
        {likes} Like{likes > 1 ? "s" : ""}
      </span>
    </button>
  );
}
