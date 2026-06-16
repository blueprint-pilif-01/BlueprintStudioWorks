import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, FileSignature, Package, FolderOpen, Globe, ChevronRight, DollarSign, Activity } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { api } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";

type Stats = {
  clientsCount: number;
  pendingContracts: number;
  activePackages: number;
  totalRevenue: number;
};

const quickLinks = [
  { label: "Manage clients", desc: "Invite, view, assign", href: "/admin/clients", icon: Users },
  { label: "Manage packages", desc: "Edit pricing & features", href: "/admin/packages", icon: Package },
  { label: "Contracts", desc: "View all signed contracts", href: "/admin/contracts", icon: FileSignature },
  { label: "Templates", desc: "Create contract templates", href: "/admin/contracts/templates", icon: FolderOpen },
  { label: "Assign sites", desc: "Link sites to clients", href: "/admin/sites", icon: Globe },
];

type ActivityItem = { id: number; action: string; description: string; client_email?: string; client_name?: string; created_at: string };
const actionLabels: Record<string, string> = {
  contract_signed: "Contract signed", contract_generated: "Contract generated", feedback_sent: "Feedback sent",
  feedback_replied: "Admin replied", package_assigned: "Package assigned", milestone_created: "Milestone added",
  milestone_updated: "Milestone updated", client_invite_accepted: "Client joined",
};

export function AdminOverviewPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [activity, setActivity] = useState<ActivityItem[]>([]);

  useEffect(() => {
    api<Stats>("/api/clients/stats").then(setStats).catch(console.error);
    api<{ activity: ActivityItem[] }>("/api/clients/activity").then((r) => setActivity((r.activity || []).slice(0, 5))).catch(console.error);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Overview of your Blueprint portal.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Clients" value={stats?.clientsCount ?? "..."} icon={Users} variant="primary" />
        <StatCard title="Pending Contracts" value={stats?.pendingContracts ?? "..."} icon={FileSignature} variant="secondary" />
        <StatCard title="Active Packages" value={stats?.activePackages ?? "..."} icon={Package} variant="accent" />
        <StatCard title="Revenue (Active)" value={stats ? formatCurrency(stats.totalRevenue) : "..."} icon={DollarSign} variant="green" />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Quick actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <motion.div key={link.href} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <Link
                  to={link.href}
                  className="group flex items-center justify-between rounded-xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 px-4 py-4 shadow-sm hover:shadow-md hover:border-primary-500/30 dark:hover:border-primary-500/40 transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="rounded-lg bg-gray-100 dark:bg-gray-700 p-2.5 group-hover:bg-primary-500/10 dark:group-hover:bg-primary-500/20 transition-colors">
                      <Icon className="h-4.5 w-4.5 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{link.label}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{link.desc}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-300 dark:text-gray-500 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Recent activity</h2>
        <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 p-5 shadow-sm">
          {activity.length ? (
            <ul className="space-y-2">
              {activity.map((a) => (
                <li key={a.id} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 flex-wrap">
                  <Activity className="h-3.5 w-3.5 text-primary-500 dark:text-primary-400 flex-shrink-0" />
                  <span>{actionLabels[a.action] || a.action}: {a.description}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-500">({a.client_name || a.client_email || ", "})</span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 flex-shrink-0">{new Date(a.created_at).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">No recent activity.</p>
          )}
          <Link to="/admin/activity" className="inline-block mt-3 text-xs text-primary-600 dark:text-primary-400 hover:underline">View all activity</Link>
        </div>
      </div>
    </motion.div>
  );
}
