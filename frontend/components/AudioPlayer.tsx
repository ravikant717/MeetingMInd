"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

function formatTime(s: number) {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${sec}`;
}

export default function AudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setCurrent(a.currentTime);
    const onMeta = () => setDuration(a.duration);
    const onEnd = () => setIsPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) {
      a.pause();
      setIsPlaying(false);
    } else {
      a.play();
      setIsPlaying(true);
    }
  };

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = audioRef.current;
    if (!a) return;
    const v = Number(e.target.value);
    a.currentTime = v;
    setCurrent(v);
  };

  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <div className="rounded-2xl bg-[#13131d] border border-white/5 p-5">
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className="flex items-center gap-4">
        <button
          onClick={toggle}
          className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-white/90 transition shrink-0"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4 ml-0.5" />
          )}
        </button>

        <div className="flex-1 relative h-2 flex items-center">
          {/* track */}
          <div className="absolute inset-x-0 h-1.5 rounded-full bg-white/10" />
          {/* progress */}
          <div
            className="absolute h-1.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            style={{ width: `${progress}%` }}
          />
          {/* thumb */}
          <div
            className="absolute h-3 w-3 rounded-full bg-white shadow"
            style={{ left: `calc(${progress}% - 6px)` }}
          />
          {/* native range on top for interaction */}
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.01}
            value={current}
            onChange={onSeek}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        <span className="text-xs text-white/50 tabular-nums shrink-0">
          {formatTime(current)} / {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}
