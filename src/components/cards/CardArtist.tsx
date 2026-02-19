"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Artist } from "@/types";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";

interface CardArtistProps {
  artist: Artist;
}

export default function CardArtist({ artist }: CardArtistProps) {
  return (
    <Link href={`/artist/${artist.id}`}>
      <motion.div
        className="group bg-oye-card rounded-xl p-4 cursor-pointer hover:bg-oye-hover transition-colors duration-200"
        whileHover={{ y: -4 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <div className="relative w-full aspect-square rounded-full overflow-hidden mb-4 mx-auto max-w-[140px]">
          <Image
            src={artist.avatar || `https://picsum.photos/seed/${artist.id}/200/200`}
            alt={artist.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="140px"
          />
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <h3 className="text-white font-bold text-sm truncate">{artist.name}</h3>
            {artist.verified && (
              <CheckBadgeIcon className="w-4 h-4 text-oye-red flex-shrink-0" />
            )}
          </div>
          <p className="text-gray-400 text-xs mt-0.5 capitalize">{artist.genres.join(", ")}</p>
          <p className="text-gray-500 text-xs mt-1">{formatNumber(artist.followers)} seguidores</p>
        </div>
      </motion.div>
    </Link>
  );
}
