"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlayIcon,
  PauseIcon,
  BackwardIcon,
  ForwardIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { usePlayer } from "@/contexts/PlayerContext";
import { formatDuration } from "@/lib/utils";

export default function BottomPlayer() {
  const {
    currentVideo,
    isPlaying,
    volume,
    progress,
    duration,
    isExpanded,
    togglePlay,
    setVolume,
    seek,
    toggleExpand,
    playNext,
    playPrev,
    audioRef,
  } = usePlayer();

  const hlsRef = useRef<import("hls.js").default | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(80);

  useEffect(() => {
    if (!currentVideo || !audioRef.current) return;

    const initHls = async () => {
      const Hls = (await import("hls.js")).default;
      if (Hls.isSupported()) {
        if (hlsRef.current) {
          hlsRef.current.destroy();
        }
        const hls = new Hls({ lowLatencyMode: true });
        hls.loadSource(currentVideo.hlsUrl);
        hls.attachMedia(audioRef.current!);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          audioRef.current?.play().catch(() => {});
        });
        hlsRef.current = hls;
      } else if (audioRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
        audioRef.current.src = currentVideo.hlsUrl;
        audioRef.current.play().catch(() => {});
      }
    };

    initHls();

    return () => {
      hlsRef.current?.destroy();
    };
  }, [currentVideo, audioRef]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.play().catch(() => {});
      else audioRef.current.pause();
    }
  }, [isPlaying, audioRef]);

  const toggleMute = () => {
    if (isMuted) {
      setVolume(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const currentTime = duration ? (progress / 100) * duration : 0;

  if (!currentVideo) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 bg-oye-dark border-t border-white/10"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        <video ref={audioRef as React.RefObject<HTMLVideoElement>} className="hidden" />

        {isExpanded && (
          <motion.div
            className="p-6 border-b border-white/10"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-28 rounded-lg overflow-hidden">
                <Image
                  src={currentVideo.thumbnail}
                  alt={currentVideo.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="text-center mt-4">
              <h3 className="text-white font-bold text-lg">{currentVideo.title}</h3>
              <p className="text-gray-400">{currentVideo.artistName}</p>
            </div>
          </motion.div>
        )}

        <div className="px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Thumbnail + Info */}
            <div className="flex items-center gap-3 w-56 flex-shrink-0">
              <div className="relative w-12 h-8 rounded overflow-hidden flex-shrink-0">
                <Image src={currentVideo.thumbnail} alt={currentVideo.title} fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-medium truncate">{currentVideo.title}</p>
                <p className="text-gray-400 text-xs truncate">{currentVideo.artistName}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="flex items-center gap-4">
                <button onClick={playPrev} className="text-gray-400 hover:text-white transition-colors">
                  <BackwardIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={togglePlay}
                  className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                >
                  {isPlaying ? (
                    <PauseIcon className="w-5 h-5 text-black" />
                  ) : (
                    <PlayIcon className="w-5 h-5 text-black ml-0.5" />
                  )}
                </button>
                <button onClick={playNext} className="text-gray-400 hover:text-white transition-colors">
                  <ForwardIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Progress */}
              <div className="flex items-center gap-2 w-full max-w-md">
                <span className="text-gray-400 text-xs w-8 text-right">{formatDuration(Math.floor(currentTime))}</span>
                <div
                  className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer group"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pct = ((e.clientX - rect.left) / rect.width) * 100;
                    seek(Math.max(0, Math.min(100, pct)));
                  }}
                >
                  <div
                    className="h-full bg-white group-hover:bg-oye-red rounded-full transition-colors relative"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <span className="text-gray-400 text-xs w-8">{formatDuration(Math.floor(duration))}</span>
              </div>
            </div>

            {/* Volume + Expand */}
            <div className="flex items-center gap-3 w-40 justify-end flex-shrink-0">
              <button onClick={toggleMute} className="text-gray-400 hover:text-white transition-colors">
                {isMuted || volume === 0 ? (
                  <SpeakerXMarkIcon className="w-5 h-5" />
                ) : (
                  <SpeakerWaveIcon className="w-5 h-5" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={100}
                value={isMuted ? 0 : volume}
                onChange={(e) => { setVolume(Number(e.target.value)); setIsMuted(false); }}
                className="w-20 accent-white h-1"
              />
              <button onClick={toggleExpand} className="text-gray-400 hover:text-white transition-colors">
                {isExpanded ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronUpIcon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
