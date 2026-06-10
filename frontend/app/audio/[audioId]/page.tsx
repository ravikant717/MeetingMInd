"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAudioByID } from "@/services/audio.service";

import AudioHeader from "@/components/AudioHeader";
import AudioPlayer from "@/components/AudioPlayer";
import SummaryCard from "@/components/SummaryCard";
import TranscriptCard from "@/components/TranscriptCard";

export default function AudioPage() {
  const params = useParams();
  const [audio, setAudio] = useState<any>(null);

  useEffect(() => {
    const fetchAudio = async () => {
      const data = await getAudioByID(params.audioId as string);

      setAudio(data.audio);
    };

    fetchAudio();
  }, [params.audioId]);

  if (!audio) {
    return (
      <div className="min-h-screen bg-[#0b0b12] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b12] text-white">
      <AudioHeader title={audio.title} createdAt={audio.createdAt} />

      <main className="max-w-3xl mx-auto px-6 py-8">
        <AudioPlayer src={audio.audioUrl} />

        <SummaryCard summary={audio.summary} />

        <TranscriptCard transcript={audio.transcript} />
      </main>
    </div>
  );
}
