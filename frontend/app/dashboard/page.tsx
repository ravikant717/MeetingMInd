"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UploadCloud,
  FileAudio,
  X,
  Upload,
  ChevronRight,
  Mic,
} from "lucide-react";
import { getAllAudios, uploadAudio } from "@/services/audio.service";

export default function DashboardPage() {
  const router = useRouter();
  const [audios, setAudios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const isUploading =
    uploadStatus.startsWith("Uploading") ||
    uploadStatus.startsWith("Transcribing");

  const fetchAudios = async () => {
    try {
      const response = await getAllAudios();
      setAudios(response.audioFiles || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async () => {
    try {
      if (!file) return;
      setUploadStatus("Uploading audio...");
      const formData = new FormData();
      formData.append("audioFile", file);
      setUploadStatus("Transcribing and generating summary...");
      await uploadAudio(formData);
      setUploadStatus("Completed ✅");
      await fetchAudios();
      setFile(null);
    } catch (err) {
      console.log(err);
      setUploadStatus("Upload failed ❌");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    const loadData = async () => {
      await fetchAudios();
      setLoading(false);
    };
    loadData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0b12] flex items-center justify-center text-white/70">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b12] text-white">
      {/* Top bar */}
      <header className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Mic className="h-4 w-4" />
          </div>
          <span className="font-semibold">MeetingMind</span>
        </div>
        <div className="h-8 w-8 rounded-full bg-white/10" />
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        {/* Upload section */}
        <h1 className="text-2xl font-bold">Upload a Meeting</h1>
        <p className="text-sm text-white/50 mt-1">
          Drop an audio file to transcribe and summarize it with AI
        </p>

        <div className="mt-6 rounded-2xl bg-[#13131d] border border-white/5 p-6">
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
            }}
            className={`block border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition ${
              isDragging
                ? "border-indigo-500 bg-indigo-500/5"
                : "border-white/10 hover:border-white/20"
            }`}
          >
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) setFile(e.target.files[0]);
              }}
            />
            <div className="mx-auto h-12 w-12 rounded-full bg-indigo-500/10 flex items-center justify-center">
              <UploadCloud className="h-6 w-6 text-indigo-400" />
            </div>
            <p className="mt-4 text-sm text-white/80">
              Drag & drop your audio file here, or click to browse
            </p>
            <p className="mt-1 text-xs text-white/40">
              Supports MP3, WAV, M4A, OGG
            </p>

            {file && (
              <div className="mt-5 mx-auto max-w-sm rounded-lg bg-white/5 border border-white/10 px-4 py-3 flex items-center gap-3 text-left">
                <div className="h-9 w-9 rounded-md bg-indigo-500/20 flex items-center justify-center">
                  <FileAudio className="h-4 w-4 text-indigo-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-white/40">Ready to upload</p>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setFile(null);
                  }}
                  className="text-white/40 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </label>

          <button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="mt-5 w-full rounded-xl bg-white text-black font-medium py-3 flex items-center justify-center gap-2 hover:bg-white/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload className="h-4 w-4" />
            Upload & Transcribe
          </button>

          {uploadStatus && (
            <div className="mt-4">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
                {uploadStatus}
              </div>
              {isUploading && (
                <div className="mt-2 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-linear-to-r from-indigo-500 to-purple-500 animate-pulse" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* My Meetings */}
        <div className="mt-12 flex items-center justify-between">
          <h2 className="text-xl font-bold">My Meetings</h2>
          <span className="text-xs text-white/60 bg-white/5 border border-white/10 rounded-full px-3 py-1">
            {audios.length} meeting{audios.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {audios.map((audio) => (
            <Link
              key={audio.audioFileId}
              href={`/audio/${audio.audioFileId}`}
              className="block rounded-xl bg-[#13131d] border border-white/5 p-4 hover:border-white/20 transition group"
            >
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <FileAudio className="h-5 w-5 text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold">{audio.title}</h3>
                  <p className="mt-1 text-sm text-white/50 line-clamp-2">
                    {audio.summary?.slice(0, 100)}
                    {audio.summary?.length > 100 ? "..." : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/40 shrink-0">
                  <span>
                    {new Date(audio.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
