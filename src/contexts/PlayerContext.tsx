"use client";

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { Video, PlayerState } from "@/types";

interface PlayerContextType extends PlayerState {
  play: (video: Video) => void;
  pause: () => void;
  resume: () => void;
  togglePlay: () => void;
  setVolume: (v: number) => void;
  seek: (progress: number) => void;
  toggleExpand: () => void;
  playNext: () => void;
  playPrev: () => void;
  addToQueue: (video: Video) => void;
  audioRef: React.RefObject<HTMLVideoElement | null>;
}

const PlayerContext = createContext<PlayerContextType>({
  currentVideo: null,
  isPlaying: false,
  volume: 80,
  progress: 0,
  duration: 0,
  isExpanded: false,
  queue: [],
  play: () => {},
  pause: () => {},
  resume: () => {},
  togglePlay: () => {},
  setVolume: () => {},
  seek: () => {},
  toggleExpand: () => {},
  playNext: () => {},
  playPrev: () => {},
  addToQueue: () => {},
  audioRef: { current: null },
});

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PlayerState>({
    currentVideo: null,
    isPlaying: false,
    volume: 80,
    progress: 0,
    duration: 0,
    isExpanded: false,
    queue: [],
  });
  const audioRef = useRef<HTMLVideoElement | null>(null);

  const play = useCallback((video: Video) => {
    setState((prev) => ({
      ...prev,
      currentVideo: video,
      isPlaying: true,
      progress: 0,
    }));
  }, []);

  const pause = useCallback(() => {
    setState((prev) => ({ ...prev, isPlaying: false }));
    audioRef.current?.pause();
  }, []);

  const resume = useCallback(() => {
    setState((prev) => ({ ...prev, isPlaying: true }));
    audioRef.current?.play().catch(() => {});
  }, []);

  const togglePlay = useCallback(() => {
    setState((prev) => {
      const newPlaying = !prev.isPlaying;
      if (newPlaying) audioRef.current?.play().catch(() => {});
      else audioRef.current?.pause();
      return { ...prev, isPlaying: newPlaying };
    });
  }, []);

  const setVolume = useCallback((v: number) => {
    setState((prev) => ({ ...prev, volume: v }));
    if (audioRef.current) audioRef.current.volume = v / 100;
  }, []);

  const seek = useCallback((progress: number) => {
    setState((prev) => ({ ...prev, progress }));
    if (audioRef.current && state.duration) {
      audioRef.current.currentTime = (progress / 100) * state.duration;
    }
  }, [state.duration]);

  const toggleExpand = useCallback(() => {
    setState((prev) => ({ ...prev, isExpanded: !prev.isExpanded }));
  }, []);

  const playNext = useCallback(() => {
    setState((prev) => {
      if (prev.queue.length === 0) return prev;
      const [next, ...rest] = prev.queue;
      return { ...prev, currentVideo: next, queue: rest, isPlaying: true, progress: 0 };
    });
  }, []);

  const playPrev = useCallback(() => {
    setState((prev) => ({ ...prev, progress: 0 }));
    if (audioRef.current) audioRef.current.currentTime = 0;
  }, []);

  const addToQueue = useCallback((video: Video) => {
    setState((prev) => ({ ...prev, queue: [...prev.queue, video] }));
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTimeUpdate = () => {
      if (el.duration) {
        setState((prev) => ({
          ...prev,
          progress: (el.currentTime / el.duration) * 100,
          duration: el.duration,
        }));
      }
    };
    el.addEventListener("timeupdate", onTimeUpdate);
    return () => el.removeEventListener("timeupdate", onTimeUpdate);
  }, []);

  return (
    <PlayerContext.Provider
      value={{ ...state, play, pause, resume, togglePlay, setVolume, seek, toggleExpand, playNext, playPrev, addToQueue, audioRef }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
