import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileSignature, CheckCircle, Clock, XCircle } from "lucide-react";
import { api } from "@/lib/api";
import { DataTable } from "@/components/dashboard/data-table";
import { StatCard } from "@/components/dashboard/stat-card";

type Contract = {
  id: number;
  contract_number: string;
  template_title: string;
  client_name?: string;
  client_email?: string;
  package_name_ro?: string;
  status: "pending" | "signed" | "disabled";
  created_at: string;
};

type Client = { id: number; email: string; name: string | null };

export function AdminContractsManagePage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingContracts, setLoadingContracts] = useState(false);

  useEffect(() => {
    api<{ clients: Client[] }>("/api/clients").then((r) => setClients(r.clients || [])).catch(console.error).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedClient) { setContracts([]); return; }
    setLoadingContracts(true);
    api<{ contracts: Contract[] }>(`/api/contracts?clientId=${selectedClient}`)
      .then((r) => setContracts(r.contracts || []))
      .catch(() => setContracts([]))
      .finally(() => setLoadingContracts(false));
  }, [selectedClient]);

  const signed = contracts.filter((c) => c.status === "signed");
  const pending = contracts.filter((c) => c.status === "pending");

  const columns = [
    { key: "contract_number", label: "Contract #", render: (r: Contract) => <span className="font-medium text-gray-900 dark:text-gray-100">{r.contract_number}</span> },
    { key: "template_title", label: "Template", render: (r: Contract) => r.template_title },
    { key: "package", label: "Package", render: (r: Contract) => r.package_name_ro || ", " },
    { key: "status", label: "Status", render: (r: Contract) => {
      const styles: Record<string, string> = {
        signed: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
        pending: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
        disabled: "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400",
      };
      const icons: Record<string, typeof CheckCircle> = { signed: CheckCircle, pending: Clock, disabled: XCircle };
      const Icon = icons[r.status] || Clock;
      return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium ${styles[r.status] || ""}`}>
          <Icon className="h-3 w-3" /> {r.status}
        </span>
      );
    }},
    { key: "date", label: "Date", render: (r: Contract) => <span className="text-xs text-gray-400 dark:text-gray-500">{new Date(r.created_at).toLocaleDateString()}</span> },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-6xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Contracts</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Contracts" value={contracts.length} icon={FileSignature} variant="primary" />
        <StatCard title="Signed" value={signed.length} icon={CheckCircle} variant="green" />
        <StatCard title="Pending" value={pending.length} icon={Clock} variant="secondary" />
      </div>

      <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 p-5 shadow-sm">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          To generate a new contract, go to a client's detail page and use "Generate contract".
          Select a client below to view their contracts.
        </p>
        <select
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
          className="rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
        >
          <option value="">Select client to view contracts</option>
          {clients.map((c) => <option key={c.id} value={c.id}>{c.name || c.email}</option>)}
        </select>
      </div>

      {loading || loadingContracts ? (
        <div className="animate-pulse text-gray-400 dark:text-gray-500 text-sm">Loading...</div>
      ) : contracts.length > 0 ? (
        <DataTable columns={columns} data={contracts} keyExtractor={(r) => r.id} emptyMessage="No contracts found." />
      ) : selectedClient ? (
        <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 p-12 text-center text-sm text-gray-400 dark:text-gray-500 shadow-sm">
          No contracts for this client.
        </div>
      ) : null}
    </motion.div>
  );
}
