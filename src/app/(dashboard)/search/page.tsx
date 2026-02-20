"use client";

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import CardVideo from "@/components/cards/CardVideo";
import CardArtist from "@/components/cards/CardArtist";
import { mockVideos, mockArtists } from "@/lib/mockData";

const genres = ["Todo", "Urban", "Regional Mexicano", "Pop", "Hip-Hop", "Banda", "Soul"];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState("Todo");

  const filteredVideos = mockVideos.filter((v) => {
    const matchQuery = !query || v.title.toLowerCase().includes(query.toLowerCase()) || v.artistName.toLowerCase().includes(query.toLowerCase());
    const matchGenre = activeGenre === "Todo" || v.genres.includes(activeGenre);
    return matchQuery && matchGenre;
  });

  const filteredArtists = mockArtists.filter((a) => {
    return !query || a.name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Buscar</h1>

      <div className="relative mb-6">
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="¿Qué quieres escuchar?"
          className="w-full bg-oye-card border border-white/10 rounded-full pl-12 pr-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-oye-red transition-colors"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => setActiveGenre(g)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeGenre === g
                ? "bg-white text-black"
                : "bg-oye-card text-gray-300 hover:bg-oye-hover"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {query && filteredArtists.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-4">Artistas</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {filteredArtists.map((a) => <CardArtist key={a.id} artist={a} />)}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-lg font-bold text-white mb-4">
          {query ? `Resultados para "${query}"` : "Videos populares"}
        </h2>
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredVideos.map((v) => <CardVideo key={v.id} video={v} />)}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            No se encontraron resultados para &ldquo;{query}&rdquo;
          </div>
        )}
      </section>
    </div>
  );
}
