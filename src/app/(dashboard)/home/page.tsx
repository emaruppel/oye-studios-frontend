"use client";

import { motion } from "framer-motion";
import CardVideo from "@/components/cards/CardVideo";
import CardArtist from "@/components/cards/CardArtist";
import { mockVideos, mockArtists } from "@/lib/mockData";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const featured = mockVideos.slice(0, 4);
  const recent = mockVideos.slice(0, 6);
  const artists = mockArtists.slice(0, 6);

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      {/* Featured */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-2">Buenos días 👋</h2>
        <p className="text-gray-400 mb-6">Lo mejor de hoy para ti</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {featured.map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ scale: 1.02 }}
              className="bg-oye-card hover:bg-oye-hover rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-colors group"
            >
              <img src={video.thumbnail} alt={video.title} className="w-12 h-8 object-cover rounded" />
              <span className="text-white text-sm font-medium truncate">{video.title}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Recent Videos */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-white">Videos recientes</h2>
          <button className="text-gray-400 hover:text-white text-sm transition-colors">Ver todo</button>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          {recent.map((video) => (
            <motion.div key={video.id} variants={item}>
              <CardVideo video={video} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Artists */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-white">Artistas destacados</h2>
          <button className="text-gray-400 hover:text-white text-sm transition-colors">Ver todo</button>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {artists.map((artist) => (
            <motion.div key={artist.id} variants={item}>
              <CardArtist artist={artist} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
