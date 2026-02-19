"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PlayIcon } from "@heroicons/react/24/solid";
import { Video } from "@/types";
import { formatDuration, formatViews } from "@/lib/utils";
import { usePlayer } from "@/contexts/PlayerContext";

interface CardVideoProps {
  video: Video;
}

export default function CardVideo({ video }: CardVideoProps) {
  const { play } = usePlayer();

  return (
    <motion.div
      className="group bg-oye-card rounded-xl overflow-hidden cursor-pointer hover:bg-oye-hover transition-colors duration-200"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      onClick={() => play(video)}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-12 h-12 bg-oye-red rounded-full flex items-center justify-center shadow-lg"
          >
            <PlayIcon className="w-6 h-6 text-white ml-0.5" />
          </motion.div>
        </div>
        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
          {formatDuration(video.duration)}
        </span>
      </div>
      <div className="p-3">
        <h3 className="text-white font-semibold text-sm truncate group-hover:text-oye-red transition-colors">
          {video.title}
        </h3>
        <p className="text-gray-400 text-xs mt-0.5 truncate">{video.artistName}</p>
        <p className="text-gray-500 text-xs mt-1">{formatViews(video.views)} vistas</p>
      </div>
    </motion.div>
  );
}
