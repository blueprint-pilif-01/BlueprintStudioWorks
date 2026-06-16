import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import { api } from "@/lib/api";
import { DataTable } from "@/components/dashboard/data-table";

type ActivityItem = {
  id: number;
  client_id: number | null;
  admin_id: number | null;
  action: string;
  description: string;
  metadata: Record<string, unknown>;
  created_at: string;
  client_email?: string;
  client_name?: string;
};

const actionLabels: Record<string, string> = {
  contract_signed: "Contract signed",
  contract_generated: "Contract generated",
  feedback_sent: "Feedback sent",
  feedback_replied: "Feedback replied",
  package_assigned: "Package assigned",
  milestone_created: "Milestone added",
  milestone_updated: "Milestone updated",
  client_invite_accepted: "Client joined",
};

export function AdminActivityPage() {
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterAction, setFilterAction] = useState("");
  const [filterClientId, setFilterClientId] = useState("");
  const [clients, setClients] = useState<{ id: number; email: string; name: string | null }[]>([]);

  function load() {
    const params = new URLSearchParams();
    if (filterAction) params.set("action", filterAction);
    if (filterClientId) params.set("clientId", filterClientId);
    const qs = params.toString();
    api<{ activity: ActivityItem[] }>(`/api/clients/activity${qs ? `?${qs}` : ""}`)
      .then((r) => setActivity(r.activity || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    api<{ clients: { id: number; email: string; name: string | null }[] }>("/api/clients")
      .then((r) => setClients(r.clients || []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    load();
  }, [filterAction, filterClientId]);

  const columns = [
    {
      key: "created_at",
      label: "Date",
      render: (r: ActivityItem) => (
        <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
          {new Date(r.created_at).toLocaleString()}
        </span>
      ),
    },
    {
      key: "action",
      label: "Action",
      render: (r: ActivityItem) => (
        <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md bg-primary-500/10 dark:bg-primary-500/20 text-primary-700 dark:text-primary-400">
          {actionLabels[r.action] || r.action}
        </span>
      ),
    },
    {
      key: "description",
      label: "Description",
      render: (r: ActivityItem) => (
        <span className="text-sm text-gray-700 dark:text-gray-300">{r.description}</span>
      ),
    },
    {
      key: "client",
      label: "Client",
      render: (r: ActivityItem) => (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {r.client_name || r.client_email || ", "}
        </span>
      ),
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Activity Log</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Recent activity across all clients.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Filter className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-xs text-gray-900 dark:text-gray-100"
            >
              <option value="">All actions</option>
              {Object.entries(actionLabels).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <select
            value={filterClientId}
            onChange={(e) => setFilterClientId(e.target.value)}
            className="rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-xs text-gray-900 dark:text-gray-100"
          >
            <option value="">All clients</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>{c.name || c.email}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse text-gray-400 dark:text-gray-500 text-sm">Loading...</div>
      ) : (
        <DataTable
          columns={columns}
          data={activity}
          keyExtractor={(r) => r.id}
          emptyMessage="No activity yet."
        />
      )}
    </motion.div>
  );
}
