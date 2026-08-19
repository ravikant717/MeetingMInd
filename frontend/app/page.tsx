import Link from "next/link";
import {
  ArrowRight,
  AudioLines,
  CheckCircle2,
  FileText,
  Mic,
  Sparkles,
  WandSparkles,
} from "lucide-react";

const featureCards = [
  {
    icon: Mic,
    title: "Upload meeting audio",
    description:
      "Drop in recordings from standups, calls, interviews, or reviews and keep every conversation in one place.",
  },
  {
    icon: Sparkles,
    title: "AI summary in seconds",
    description:
      "Turn long discussions into concise takeaways that make it easy to scan what mattered most.",
  },
  {
    icon: FileText,
    title: "Full transcript access",
    description:
      "Open the transcript when you need exact wording, context, or a quick search through the conversation.",
  },
  {
    icon: CheckCircle2,
    title: "Action items that stand out",
    description:
      "Surface owners and deadlines so follow-up work is easy to review and harder to miss.",
  },
];

const workflowSteps = [
  "Upload or drag a meeting recording into the dashboard.",
  "Let the AI generate transcription, summary, and action items.",
  "Open the meeting detail view to review every artifact in context.",
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.28),_transparent_34%),radial-gradient(circle_at_80%_20%,_rgba(16,185,129,0.16),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.12),_transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,white,transparent_85%)]" />

      <main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10 lg:px-12">
        <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400 via-cyan-400 to-emerald-300 text-slate-950 shadow-lg shadow-cyan-500/20">
              <AudioLines className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.24em] text-white/70 uppercase">
                MeetingMind
              </p>
              <p className="text-xs text-white/45">
                Meetings distilled into decisions
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/login"
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/75 transition hover:border-white/20 hover:bg-white/5"
            >
              Log in
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-white/90"
            >
              Open dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        <section className="grid flex-1 items-center gap-14 py-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
              <WandSparkles className="h-4 w-4" />
              Built for transcription, summaries, transcripts, and action items
            </div>

            <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-balance text-white sm:text-6xl lg:text-7xl">
              Turn meeting audio into a clear next step.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl">
              MeetingMind captures the full conversation, produces an AI summary,
              surfaces action items, and keeps the transcript close when you need
              exact wording.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 via-white to-emerald-200 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-xl shadow-cyan-500/20 transition hover:translate-y-[-1px] hover:shadow-cyan-500/30"
              >
                Start with a meeting upload
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white/86 backdrop-blur transition hover:border-white/20 hover:bg-white/10"
              >
                Create an account
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["Upload", "Audio files in the dashboard"],
                ["Summarize", "AI-generated meeting recaps"],
                ["Follow through", "Action items and ownership"],
              ].map(([title, detail]) => (
                <div
                  key={title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
                >
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-white/55">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="absolute -right-8 bottom-10 h-28 w-28 rounded-full bg-emerald-400/15 blur-3xl" />

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-white/45">Live meeting snapshot</p>
                    <h2 className="mt-1 text-xl font-semibold text-white">
                      Product review with marketing
                    </h2>
                  </div>
                  <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
                    Processing complete
                  </div>
                </div>

                <div className="mt-6 grid gap-4">
                  <div className="rounded-3xl border border-white/10 bg-[#0f1424] p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-cyan-200">
                      <Sparkles className="h-4 w-4" />
                      AI Summary
                    </div>
                    <p className="mt-3 text-sm leading-6 text-white/70">
                      The team aligned on launch timing, content priorities, and a
                      follow-up review for open design risks.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-[#111827] p-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                        <FileText className="h-4 w-4 text-cyan-300" />
                        Transcript
                      </div>
                      <p className="mt-3 text-sm leading-6 text-white/60">
                        Review the exact language from the conversation whenever you
                        need it.
                      </p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-[#111827] p-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                        <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                        Action items
                      </div>
                      <p className="mt-3 text-sm leading-6 text-white/60">
                        Owner, deadline, and task details stay attached to each
                        decision.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-dashed border-white/12 bg-white/[0.03] p-4">
                    <div className="flex items-center gap-3 text-sm text-white/70">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400/30 to-emerald-400/30 text-white">
                        <Mic className="h-5 w-5" />
                      </div>
                      Upload once. Review forever.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 pb-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">
              What it does now
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {featureCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article
                    key={card.title}
                    className="rounded-3xl border border-white/10 bg-slate-950/55 p-5 transition hover:border-white/20 hover:bg-slate-950/70"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/8 text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-white">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/60">
                      {card.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-6 backdrop-blur-xl sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">
              Workflow
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-white">
              A short path from recording to action.
            </h2>
            <div className="mt-6 space-y-4">
              {workflowSteps.map((step, index) => (
                <div
                  key={step}
                  className="flex gap-4 rounded-3xl border border-white/10 bg-slate-950/55 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="pt-0.5 text-sm leading-6 text-white/68">{step}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-emerald-400/15 bg-emerald-400/8 p-5">
              <p className="text-sm font-medium text-emerald-200">
                Ready for the next meeting cycle
              </p>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Sign in, upload an audio file, and let MeetingMind build the summary
                trail for you.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
