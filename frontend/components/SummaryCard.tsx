import { Sparkles } from "lucide-react";

export default function SummaryCard({ summary }: { summary: string }) {
  return (
    <div className="mt-5 rounded-2xl bg-[#13131d] border border-white/5 p-6">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-indigo-400" />
        <h2 className="font-semibold">AI Summary</h2>
      </div>

      <p className="mt-4 text-sm text-white/70 whitespace-pre-wrap">
        {summary}
      </p>
    </div>
  );
}
