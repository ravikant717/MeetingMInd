"use client";

import Link from "next/link";
import { ArrowLeft, Mic } from "lucide-react";

interface AudioHeaderProps {
  title: string;
  createdAt?: string;
}

export default function AudioHeader({ title, createdAt }: AudioHeaderProps) {
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : "";

  return (
    <>
      <header className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Mic className="h-4 w-4" />
          </div>

          <span className="font-semibold">MeetingMind</span>
        </div>

        <div className="h-8 w-8 rounded-full bg-white/10" />
      </header>

      <div className="max-w-3xl mx-auto px-6 pt-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <h1 className="mt-4 text-3xl font-bold">{title}</h1>

        {formattedDate && (
          <p className="mt-1 text-sm text-white/50">{formattedDate}</p>
        )}
      </div>
    </>
  );
}
