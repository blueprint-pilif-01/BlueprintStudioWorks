import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Circle, Loader2, Target } from "lucide-react";
import { api } from "@/lib/api";

type Milestone = {
  id: number;
  title: string;
  description: string | null;
  status: "pending" | "in_progress" | "completed";
  sort_order: number;
  completed_at: string | null;
  created_at: string;
};

export function DashboardProgressPage() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<{ milestones: Milestone[] }>("/api/portal/milestones")
      .then((r) => setMilestones(r.milestones || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="animate-pulse text-gray-400 dark:text-gray-500 text-sm">Loading...</div>;

  const completed = milestones.filter((m) => m.status === "completed").length;
  const total = milestones.length;
  const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Project Progress</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Track your project milestones and progress.</p>
      </div>

      <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <Target className="h-5 w-5 text-primary-500 dark:text-primary-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall progress</span>
        </div>
        <div className="flex items-center gap-4 mt-3">
          <div className="flex-1 h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full bg-primary-500 dark:bg-primary-500 rounded-full"
            />
          </div>
          <span className="text-sm font-bold text-gray-900 dark:text-gray-100 tabular-nums w-12">{progressPercent}%</span>
        </div>
      </div>

      {milestones.length === 0 ? (
        <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 p-12 text-center shadow-sm">
          <Target className="h-10 w-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">No milestones yet.</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Your admin will add project milestones for you.</p>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-600" />
          <ul className="space-y-0">
            {milestones.map((m, i) => (
              <motion.li
                key={m.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative flex gap-4 pb-8 last:pb-0"
              >
                <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                  {m.status === "completed" ? (
                    <CheckCircle className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                  ) : m.status === "in_progress" ? (
                    <Loader2 className="h-4 w-4 text-primary-500 dark:text-primary-400 animate-spin" />
                  ) : (
                    <Circle className="h-4 w-4 text-gray-300 dark:text-gray-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className={`text-sm font-semibold ${
                    m.status === "completed"
                      ? "text-gray-500 dark:text-gray-400 line-through"
                      : "text-gray-900 dark:text-gray-100"
                  }`}>
                    {m.title}
                  </p>
                  {m.description && (
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{m.description}</p>
                  )}
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
                      m.status === "completed"
                        ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                        : m.status === "in_progress"
                          ? "bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    }`}>
                      {m.status.replace("_", " ")}
                    </span>
                    {m.completed_at && (
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">
                        Completed {new Date(m.completed_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
