import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileSignature, Download, CheckCircle, Clock, FileText } from "lucide-react";
import { api, getAuthHeaders } from "@/lib/api";

async function downloadPdf(contractId: number) {
  const base = import.meta.env.VITE_API_URL || "http://localhost:3001";
  const res = await fetch(`${base}/api/portal/contracts/${contractId}/pdf`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error("Download failed");
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `contract-${contractId}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}

type Contract = {
  id: number;
  contract_number: string;
  template_title: string;
  package_name_ro?: string;
  status: "pending" | "signed" | "disabled";
  created_at: string;
};

export function DashboardContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<{ contracts: Contract[] }>("/api/portal/my-contracts").then((r) => setContracts(r.contracts || [])).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="animate-pulse text-gray-400 dark:text-gray-500 text-sm">Loading...</div>;

  const pending = contracts.filter((c) => c.status === "pending");
  const signed = contracts.filter((c) => c.status === "signed");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Contracts</h1>

      {pending.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Pending signature</h2>
          <div className="space-y-2">
            {pending.map((c) => (
              <div key={c.id} className="flex items-center justify-between rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200/60 dark:border-amber-700/50 px-5 py-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-amber-500 dark:text-amber-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{c.contract_number} &mdash; {c.template_title}</p>
                    {c.package_name_ro && <p className="text-xs text-gray-500 dark:text-gray-400">{c.package_name_ro}</p>}
                  </div>
                </div>
                <Link
                  to={`/dashboard/contracts/${c.id}/sign`}
                  className="flex items-center gap-1.5 rounded-lg bg-primary-500 text-white px-4 py-2 text-xs font-semibold hover:bg-primary-600 transition-colors shadow-sm"
                >
                  <FileSignature className="h-3.5 w-3.5" /> Sign now
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {signed.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Signed</h2>
          <div className="space-y-2">
            {signed.map((c) => (
              <div key={c.id} className="flex items-center justify-between rounded-xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 px-5 py-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{c.contract_number} &mdash; {c.template_title}</p>
                    {c.package_name_ro && <p className="text-xs text-gray-500 dark:text-gray-400">{c.package_name_ro}</p>}
                  </div>
                </div>
                <button
                  onClick={() => downloadPdf(c.id)}
                  className="flex items-center gap-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Download className="h-3.5 w-3.5" /> PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {contracts.length === 0 && (
        <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 p-12 text-center shadow-sm">
          <FileText className="h-10 w-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">No contracts yet.</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Your admin will generate contracts for your packages.</p>
        </div>
      )}
    </motion.div>
  );
}
