import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, UserPlus, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { DataTable } from "@/components/dashboard/data-table";

type Client = {
  id: number;
  email: string;
  name: string | null;
  created_at: string;
  site_slugs: string[] | null;
};

export function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteUrl, setInviteUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  function load() {
    api<{ clients: Client[] }>("/api/clients")
      .then((r) => setClients(r.clients || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    try {
      const res = await api<{ inviteUrl: string }>("/api/clients/invites", {
        method: "POST",
        body: { email: inviteEmail.trim() },
      });
      setInviteUrl(res.inviteUrl || "");
      setInviteEmail("");
      load();
    } catch (e) {
      console.error(e);
    }
  }

  function copyUrl() {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const columns = [
    { key: "name", label: "Name", render: (r: Client) => (
      <Link to={`/admin/clients/${r.id}`} className="font-medium text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
        {r.name || ", "}
      </Link>
    )},
    { key: "email", label: "Email", render: (r: Client) => <span className="text-gray-500 dark:text-gray-400">{r.email}</span> },
    { key: "sites", label: "Sites", render: (r: Client) => {
      const slugs = Array.isArray(r.site_slugs) ? r.site_slugs.filter(Boolean) : [];
      return slugs.length ? (
        <div className="flex gap-1 flex-wrap">
          {slugs.map((s) => (
            <span key={s} className="inline-block px-2 py-0.5 rounded-md bg-primary-500/8 dark:bg-primary-500/20 text-primary-700 dark:text-primary-400 text-[11px] font-medium">{s}</span>
          ))}
        </div>
      ) : <span className="text-gray-300 dark:text-gray-500">None</span>;
    }},
    { key: "created", label: "Joined", render: (r: Client) => <span className="text-gray-400 dark:text-gray-500 text-xs">{new Date(r.created_at).toLocaleDateString()}</span> },
    { key: "actions", label: "", render: (r: Client) => (
      <Link to={`/admin/clients/${r.id}`} className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline">Manage</Link>
    )},
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-6xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Clients</h1>

      <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <UserPlus className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Invite new client</h2>
        </div>
        <form onSubmit={handleInvite} className="flex gap-2 flex-wrap">
          <Input type="email" placeholder="client@example.com" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} className="max-w-xs !bg-gray-50 dark:!bg-gray-700 !border-gray-200 dark:!border-gray-600" />
          <Button type="submit" variant="primary" size="sm">Send invite</Button>
        </form>
        {inviteUrl && (
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/60 dark:border-emerald-700/50 px-3 py-2.5">
            <Mail className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <code className="text-xs text-emerald-800 dark:text-emerald-300 break-all flex-1">{inviteUrl}</code>
            <button onClick={copyUrl} className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex-shrink-0">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="animate-pulse text-gray-400 dark:text-gray-500 text-sm">Loading clients...</div>
      ) : (
        <DataTable columns={columns} data={clients} keyExtractor={(r) => r.id} emptyMessage="No clients yet. Send an invite to get started." />
      )}
    </motion.div>
  );
}
