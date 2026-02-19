'use client'

import React, { useEffect, useRef } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

interface VideoPlayerProps {
  src: string
  poster?: string
  autoplay?: boolean
  controls?: boolean
  onEnded?: () => void
}

export default function VideoPlayer({
  src,
  poster,
  autoplay = false,
  controls = true,
  onEnded,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<any>(null)

  useEffect(() => {
    if (!videoRef.current) return

    // Initialize Video.js player
    const player = videojs(videoRef.current, {
      autoplay,
      controls,
      preload: 'auto',
      fluid: true,
      responsive: true,
      poster,
      sources: [
        {
          src,
          type: src.endsWith('.m3u8') ? 'application/x-mpegURL' : 'video/mp4',
        },
      ],
    })

    playerRef.current = player

    if (onEnded) {
      player.on('ended', onEnded)
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose()
      }
    }
  }, [src, poster, autoplay, controls, onEnded])

  return (
    <div className="video-player-wrapper">
      <div data-vjs-player>
        <video ref={videoRef} className="video-js vjs-big-play-centered" />
      </div>
    </div>
  )
}
