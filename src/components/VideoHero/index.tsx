"use client";

import clsx from "clsx";
import Image from "next/image";
import { SIZES_FULL } from "@/config/sizes";
import { useReducedMotion } from "@/helpers/hooks/useReducedMotion";
import type { VideoAsset } from "@/types";

export type VideoHeroProps = {
  /** Playable files and the still shown before playback. */
  video: VideoAsset;
  className?: string;
};

/**
 * Full-width background video. It plays once. No controls, and the audio
 * track stays muted so the browser can autoplay. Reduced motion keeps the
 * poster and never mounts the video, so playback cannot start.
 */
export function VideoHero({ video, className }: VideoHeroProps) {
  const reduceMotion = useReducedMotion();
  const showVideo = reduceMotion === false;

  return (
    <div className={clsx("relative aspect-video w-full", className)}>
      <Image
        src={video.poster.src}
        alt={showVideo ? "" : video.poster.alt}
        fill
        priority
        sizes={SIZES_FULL}
        className="object-cover"
      />
      {showVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          playsInline
          poster={video.poster.src}
          aria-hidden="true"
        >
          {video.sources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </video>
      ) : null}
    </div>
  );
}
