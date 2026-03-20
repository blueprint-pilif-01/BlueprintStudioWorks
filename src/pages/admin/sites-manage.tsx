import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Globe, Check } from "lucide-react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import siteTrackerConfig from "@config/site-tracker.json";

type Client = { id: number; email: string; name: string | null; site_slugs: string[] | null };

const allSites = (siteTrackerConfig as { sites?: { slug: string; name: string }[] }).sites ?? [];

export function AdminSitesManagePage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [siteSlugs, setSiteSlugs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api<{ clients: Client[] }>("/api/clients").then((r) => setClients(r.clients || [])).catch(console.error).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedClient) {
      setSiteSlugs(Array.isArray(selectedClient.site_slugs) ? selectedClient.site_slugs.filter(Boolean) : []);
      setSaved(false);
    }
  }, [selectedClient]);

  async function saveSites() {
    if (!selectedClient) return;
    try {
      await api(`/api/clients/${selectedClient.id}/sites`, { method: "PUT", body: { siteSlugs } });
      setClients((prev) => prev.map((c) => c.id === selectedClient.id ? { ...c, site_slugs: siteSlugs } : c));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) { console.error(e); }
  }

  function toggleSite(slug: string) {
    setSiteSlugs((prev) => prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]);
    setSaved(false);
  }

  if (loading) return <div className="animate-pulse text-gray-400 dark:text-gray-500 text-sm">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Assign Sites</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Link client projects from your portfolio to their dashboard.</p>
      </div>

      <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 p-5 shadow-sm">
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Select client</label>
        <select
          value={selectedClient?.id ?? ""}
          onChange={(e) => { setSelectedClient(clients.find((c) => c.id === parseInt(e.target.value)) || null); }}
          className="mt-2 w-full max-w-md rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100"
        >
          <option value="">Choose client...</option>
          {clients.map((c) => <option key={c.id} value={c.id}>{c.name || c.email}</option>)}
        </select>
      </div>

      {selectedClient && (
        <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Sites for {selectedClient.name || selectedClient.email}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {allSites.map((site) => {
              const active = siteSlugs.includes(site.slug);
              return (
                <button
                  key={site.slug}
                  onClick={() => toggleSite(site.slug)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium border transition-all ${
                    active ? "bg-primary-500 text-white border-primary-500 shadow-sm" : "bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                  }`}
                >
                  {active && <Check className="h-3 w-3" />}
                  <span className="truncate">{site.name}</span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-3 mt-4">
            <Button onClick={saveSites} size="sm" variant="primary">Save</Button>
            {saved && <span className="text-xs text-emerald-600 font-medium">Saved!</span>}
          </div>
        </div>
      )}
    </motion.div>
  );
}
