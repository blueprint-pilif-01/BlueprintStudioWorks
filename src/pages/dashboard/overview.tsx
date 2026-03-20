import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Globe, FileSignature, Package, ArrowRight, ChevronRight, Target, Activity } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { StatCard } from "@/components/dashboard/stat-card";
import { api } from "@/lib/api";

type DashboardData = {
  stats: { sitesCount: number; pendingContracts: number; activePackages: number; progressPercent?: number };
  recentNotes: { id: number; content: string; created_at: string }[];
};

const actions = [
  { label: "View my site", desc: "Preview your project", href: "/dashboard/my-site", icon: Globe },
  { label: "Contracts", desc: "Sign & download", href: "/dashboard/contracts", icon: FileSignature },
  { label: "Packages", desc: "Browse available plans", href: "/dashboard/packages", icon: Package },
];

type ActivityItem = { id: number; action: string; description: string; created_at: string };
const actionLabels: Record<string, string> = {
  contract_signed: "Contract signed", contract_generated: "Contract generated", feedback_sent: "Feedback sent",
  feedback_replied: "Admin replied", package_assigned: "Package assigned", milestone_created: "Milestone added",
  milestone_updated: "Milestone updated", client_invite_accepted: "Joined",
};

export function DashboardOverviewPage() {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api<DashboardData>("/api/portal/dashboard").then(setData).catch(console.error),
      api<{ activity: ActivityItem[] }>("/api/portal/activity").then((r) => setActivity((r.activity || []).slice(0, 5))).catch(console.error),
    ]).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="animate-pulse text-gray-400 dark:text-gray-500 text-sm">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Welcome back, {user?.name || user?.email?.split("@")[0]}</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Here's your Blueprint overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Assigned Sites" value={data?.stats.sitesCount ?? 0} icon={Globe} variant="primary" />
        <StatCard title="Pending Contracts" value={data?.stats.pendingContracts ?? 0} icon={FileSignature} variant="secondary" subtitle={data?.stats.pendingContracts ? "Needs your signature" : undefined} />
        <StatCard title="Active Packages" value={data?.stats.activePackages ?? 0} icon={Package} variant="accent" />
        <StatCard title="Project Progress" value={`${data?.stats.progressPercent ?? 0}%`} icon={Target} variant="green" subtitle="Milestones completed" />
      </div>

      {data?.stats.pendingContracts ? (
        <Link
          to="/dashboard/contracts"
          className="block rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200/60 dark:border-amber-700/50 px-5 py-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-500/10 dark:bg-amber-500/20 p-2"><FileSignature className="h-5 w-5 text-amber-600 dark:text-amber-400" /></div>
              <div>
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">You have {data.stats.pendingContracts} contract{data.stats.pendingContracts > 1 ? "s" : ""} to sign</p>
                <p className="text-xs text-amber-600 dark:text-amber-400">Click to review and sign</p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-amber-400 dark:text-amber-500" />
          </div>
        </Link>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {actions.map((a, i) => {
          const Icon = a.icon;
          return (
            <motion.div key={a.href} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link to={a.href} className="group flex items-center justify-between rounded-xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 px-4 py-4 shadow-sm hover:shadow-md hover:border-primary-500/30 dark:hover:border-primary-500/40 transition-all">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gray-100 dark:bg-gray-700 p-2.5 group-hover:bg-primary-500/10 dark:group-hover:bg-primary-500/20 transition-colors">
                    <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{a.label}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{a.desc}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-300 dark:text-gray-500 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors" />
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data?.recentNotes?.length ? (
          <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Recent notes</h2>
              <Link to="/dashboard/support" className="text-xs text-primary-600 dark:text-primary-400 hover:underline">View all</Link>
            </div>
            <ul className="space-y-2">
              {data.recentNotes.map((n) => (
                <li key={n.id} className="text-sm text-gray-600 dark:text-gray-400 pl-3 border-l-2 border-gray-200 dark:border-gray-600 line-clamp-1">{n.content}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Recent activity</h2>
            <Link to="/dashboard/progress" className="text-xs text-primary-600 dark:text-primary-400 hover:underline">View progress</Link>
          </div>
          {activity.length ? (
            <ul className="space-y-2">
              {activity.map((a) => (
                <li key={a.id} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-primary-500 dark:text-primary-400 flex-shrink-0" />
                  <span>{actionLabels[a.action] || a.action}: {a.description}</span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 flex-shrink-0">{new Date(a.created_at).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">No recent activity.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
