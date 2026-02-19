"use client";

import { useState } from "react";
import { HeartIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import CardVideo from "@/components/cards/CardVideo";
import CardArtist from "@/components/cards/CardArtist";
import { mockVideos, mockArtists } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "favorites", label: "Favoritos", icon: HeartIcon },
  { id: "following", label: "Siguiendo", icon: BookmarkIcon },
];

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState("favorites");

  const favorites = mockVideos.slice(0, 4);
  const following = mockArtists.slice(0, 4);

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Tu biblioteca</h1>

      <div className="flex gap-2 mb-8 border-b border-white/10 pb-0">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={cn(
              "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
              activeTab === id
                ? "border-white text-white"
                : "border-transparent text-gray-400 hover:text-white"
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {activeTab === "favorites" && (
        <section>
          {favorites.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {favorites.map((v) => <CardVideo key={v.id} video={v} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <HeartIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No tienes favoritos aún</p>
              <p className="text-gray-600 text-sm mt-1">Dale ❤️ a los videos que te gusten</p>
            </div>
          )}
        </section>
      )}

      {activeTab === "following" && (
        <section>
          {following.length > 0 ? (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {following.map((a) => <CardArtist key={a.id} artist={a} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <BookmarkIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No sigues a ningún artista aún</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
