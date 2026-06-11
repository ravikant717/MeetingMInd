import { CheckCircle2 } from "lucide-react";

export default function ActionItemsCard({
  actionItems,
}: {
  actionItems: any[];
}) {
  if (!actionItems?.length) {
    return (
      <div className="mt-5 rounded-2xl bg-[#13131d] border border-white/5 p-6">
        <h2 className="font-semibold">Action Items</h2>

        <p className="mt-3 text-white/50 text-sm">No action items detected.</p>
      </div>
    );
  }
  return (
    <div className="mt-5 rounded-2xl bg-[#13131d] border border-white/5 p-6">
      <div className="flex items-center gap-2 mb-5">
        <CheckCircle2 className="h-4 w-4 text-indigo-400" />
        <h2 className="font-semibold">Action Items</h2>
      </div>

      <div className="space-y-4">
        {actionItems.map((item, index) => (
          <div
            key={index}
            className="flex gap-3 border-b border-white/5 pb-4 last:border-0 last:pb-0"
          >
            <CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />

            <div className="flex-1">
              <p className="text-white font-medium">{item.task}</p>

              <div className="mt-2 flex gap-2">
                <span className="text-xs text-indigo-300">{item.owner}</span>

                {item.deadline && (
                  <>
                    <span className="text-xs text-white/30">•</span>

                    <span className="text-xs text-white/50">
                      {item.deadline}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
