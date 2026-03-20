import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Globe, Package, FileSignature, Plus, Target, Trash2, Link2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import siteTrackerConfig from "@config/site-tracker.json";

type Client = { id: number; email: string; name: string | null; site_slugs: string[] | null; created_at: string };
type Pkg = { id: number; slug: string; name_ro: string; name_en: string; price: number; period: string | null };
type ClientPkg = { id: number; status: string; package_id: number; name_ro: string; price: number; period: string | null; created_at: string };
type Template = { id: number; title: string };
type Milestone = { id: number; title: string; description: string | null; status: string; sort_order: number; completed_at: string | null; created_at: string };
type ExternalSite = { id: number; site_slug: string; site_url: string; site_label: string | null };

const allSiteSlugs = (siteTrackerConfig as { sites?: { slug: string }[] }).sites?.map((s) => s.slug) ?? [];

export function AdminClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const [packages, setPackages] = useState<Pkg[]>([]);
  const [clientPackages, setClientPackages] = useState<ClientPkg[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [siteSlugs, setSiteSlugs] = useState<string[]>([]);
  const [selectedPkg, setSelectedPkg] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [msg, setMsg] = useState("");
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [newMilestoneTitle, setNewMilestoneTitle] = useState("");
  const [newMilestoneDesc, setNewMilestoneDesc] = useState("");
  const [externalSites, setExternalSites] = useState<ExternalSite[]>([]);
  const [newSiteUrl, setNewSiteUrl] = useState("");
  const [newSiteLabel, setNewSiteLabel] = useState("");

  useEffect(() => {
    if (!id) return;
    api<{ clients: Client[] }>("/api/clients").then((r) => {
      const c = r.clients.find((c) => c.id === parseInt(id!));
      if (c) {
        setClient(c);
        setSiteSlugs(Array.isArray(c.site_slugs) ? c.site_slugs.filter(Boolean) : []);
      }
    }).catch(console.error);
    api<{ packages: Pkg[] }>("/api/packages").then((r) => setPackages(r.packages || [])).catch(console.error);
    api<{ templates: Template[] }>("/api/contracts/templates").then((r) => setTemplates(r.templates || [])).catch(console.error);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    api<{ packages: ClientPkg[] }>(`/api/clients/${id}/packages`).then((r) => setClientPackages(r.packages || [])).catch(() => setClientPackages([]));
  }, [id, msg]);

  useEffect(() => {
    if (!id) return;
    api<{ milestones: Milestone[] }>(`/api/clients/${id}/milestones`).then((r) => setMilestones(r.milestones || [])).catch(() => setMilestones([]));
  }, [id, msg]);

  function loadExternalSites() {
    if (!id) return;
    api<{ sites: ExternalSite[] }>(`/api/clients/${id}/site-urls`).then((r) => setExternalSites(r.sites || [])).catch(() => setExternalSites([]));
  }

  useEffect(() => { loadExternalSites(); }, [id]);

  async function addSiteUrl(e: React.FormEvent) {
    e.preventDefault();
    if (!id || !newSiteUrl.trim()) return;
    try {
      await api(`/api/clients/${id}/site-url`, { method: "POST", body: { url: newSiteUrl.trim(), label: newSiteLabel.trim() || null } });
      setNewSiteUrl("");
      setNewSiteLabel("");
      loadExternalSites();
      setMsg("Site URL added");
      setTimeout(() => setMsg(""), 2000);
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Failed");
    }
  }

  async function removeSiteUrl(siteId: number) {
    if (!id) return;
    try {
      await api(`/api/clients/${id}/site-url/${siteId}`, { method: "DELETE" });
      loadExternalSites();
      setMsg("Site URL removed");
      setTimeout(() => setMsg(""), 2000);
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Failed");
    }
  }

  async function saveSites() {
    if (!id) return;
    await api(`/api/clients/${id}/sites`, { method: "PUT", body: { siteSlugs } });
    setMsg("Sites saved");
    setTimeout(() => setMsg(""), 2000);
  }

  function toggleSite(slug: string) {
    setSiteSlugs((prev) => prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]);
  }

  async function assignPackage() {
    if (!id || !selectedPkg) return;
    try {
      await api(`/api/clients/${id}/packages`, { method: "POST", body: { packageId: parseInt(selectedPkg) } });
      setMsg("Package assigned");
      setSelectedPkg("");
      setTimeout(() => setMsg(""), 2000);
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Failed");
    }
  }

  async function generateContract() {
    if (!id || !selectedPkg || !selectedTemplate) return;
    try {
      const res = await api<{ signUrl: string }>("/api/contracts/generate", {
        method: "POST",
        body: { clientId: parseInt(id), packageId: parseInt(selectedPkg), templateId: parseInt(selectedTemplate) },
      });
      setMsg("Contract generated! Sign URL: " + res.signUrl);
      setTimeout(() => setMsg(""), 8000);
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Failed");
    }
  }

  async function addMilestone(e: React.FormEvent) {
    e.preventDefault();
    if (!id || !newMilestoneTitle.trim()) return;
    try {
      await api(`/api/clients/${id}/milestones`, {
        method: "POST",
        body: { title: newMilestoneTitle.trim(), description: newMilestoneDesc.trim() || null },
      });
      setNewMilestoneTitle("");
      setNewMilestoneDesc("");
      setMsg("Milestone added");
      setTimeout(() => setMsg(""), 2000);
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Failed");
    }
  }

  async function updateMilestoneStatus(milestoneId: number, status: string) {
    if (!id) return;
    try {
      await api(`/api/clients/${id}/milestones/${milestoneId}`, { method: "PUT", body: { status } });
      setMsg("Milestone updated");
      setTimeout(() => setMsg(""), 2000);
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Failed");
    }
  }

  async function deleteMilestone(milestoneId: number) {
    if (!id) return;
    try {
      await api(`/api/clients/${id}/milestones/${milestoneId}`, { method: "DELETE" });
      setMsg("Milestone deleted");
      setTimeout(() => setMsg(""), 2000);
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Failed");
    }
  }

  if (!client) return <div className="animate-pulse text-gray-400 dark:text-gray-500 text-sm">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-4xl">
      <Link to="/admin/clients" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-300">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 dark:from-primary-500/30 dark:to-secondary-500/30 flex items-center justify-center text-lg font-bold text-primary-700 dark:text-primary-400">
          {(client.name || client.email)[0].toUpperCase()}
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">{client.name || client.email}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{client.email} &middot; Joined {new Date(client.created_at).toLocaleDateString()}</p>
        </div>
      </div>

      {msg && (
        <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/60 dark:border-emerald-700/50 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-300">{msg}</div>
      )}

      <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Assigned sites</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {allSiteSlugs.map((slug) => (
            <button
              key={slug}
              onClick={() => toggleSite(slug)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors ${
                siteSlugs.includes(slug)
                  ? "bg-primary-500 text-white border-primary-500"
                  : "bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
              }`}
            >{slug}</button>
          ))}
        </div>
        <Button onClick={saveSites} size="sm" variant="primary" className="mt-4">Save sites</Button>
      </div>

      <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Link2 className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Client site (external URL)</h2>
        </div>
        {externalSites.length > 0 && (
          <div className="space-y-2 mb-4">
            {externalSites.map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 px-3 py-2 border border-gray-100 dark:border-gray-600">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{s.site_label || s.site_url}</p>
                  <a href={s.site_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary-600 dark:text-primary-400 hover:underline truncate flex items-center gap-1">
                    {s.site_url} <ExternalLink className="h-3 w-3 flex-shrink-0" />
                  </a>
                </div>
                <button
                  onClick={() => removeSiteUrl(s.id)}
                  className="p-1.5 rounded text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  title="Remove site URL"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
        <form onSubmit={addSiteUrl} className="flex gap-2 flex-wrap items-end">
          <input
            type="text"
            value={newSiteLabel}
            onChange={(e) => setNewSiteLabel(e.target.value)}
            placeholder="Label (e.g. Garmedi)"
            className="rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 min-w-[140px]"
          />
          <input
            type="url"
            value={newSiteUrl}
            onChange={(e) => setNewSiteUrl(e.target.value)}
            placeholder="https://example.com"
            className="rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 min-w-[200px] flex-1"
          />
          <Button type="submit" size="sm" disabled={!newSiteUrl.trim()}><Plus className="h-3.5 w-3.5 mr-1" />Add</Button>
        </form>
      </div>

      <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Package className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Packages</h2>
        </div>
        {clientPackages.length > 0 ? (
          <div className="space-y-2 mb-4">
            {clientPackages.map((cp) => (
              <div key={cp.id} className="flex items-center justify-between rounded-lg bg-gray-50 dark:bg-gray-700/50 px-3 py-2 border border-gray-100 dark:border-gray-600">
                <span className="text-sm text-gray-700 dark:text-gray-300">{cp.name_ro} &middot; {formatCurrency(cp.price)}{cp.period && ` / ${cp.period}`}</span>
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                  cp.status === "active" ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" : "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                }`}>{cp.status.replace("_", " ")}</span>
              </div>
            ))}
          </div>
        ) : <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">No packages assigned.</p>}
        <div className="flex gap-2 flex-wrap items-end">
          <select value={selectedPkg} onChange={(e) => setSelectedPkg(e.target.value)} className="rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100">
            <option value="">Select package</option>
            {packages.map((p) => <option key={p.id} value={p.id}>{p.name_ro} ({formatCurrency(p.price)})</option>)}
          </select>
          <Button onClick={assignPackage} size="sm" disabled={!selectedPkg}><Plus className="h-3.5 w-3.5 mr-1" />Assign</Button>
        </div>
      </div>

      <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Project milestones</h2>
        </div>
        <form onSubmit={addMilestone} className="flex gap-2 flex-wrap items-end mb-4">
          <input
            type="text"
            value={newMilestoneTitle}
            onChange={(e) => setNewMilestoneTitle(e.target.value)}
            placeholder="Milestone title"
            className="rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 min-w-[180px]"
          />
          <input
            type="text"
            value={newMilestoneDesc}
            onChange={(e) => setNewMilestoneDesc(e.target.value)}
            placeholder="Description (optional)"
            className="rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 min-w-[160px]"
          />
          <Button type="submit" size="sm" disabled={!newMilestoneTitle.trim()}><Plus className="h-3.5 w-3.5 mr-1" />Add</Button>
        </form>
        {milestones.length > 0 ? (
          <div className="space-y-2">
            {milestones.map((m) => (
              <div key={m.id} className="flex items-center justify-between gap-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 px-3 py-2 border border-gray-100 dark:border-gray-600">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{m.title}</p>
                  {m.description && <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{m.description}</p>}
                </div>
                <select
                  value={m.status}
                  onChange={(e) => updateMilestoneStatus(m.id, e.target.value)}
                  className="rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1 text-xs text-gray-900 dark:text-gray-100"
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In progress</option>
                  <option value="completed">Completed</option>
                </select>
                <button
                  onClick={() => deleteMilestone(m.id)}
                  className="p-1.5 rounded text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  title="Delete milestone"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 dark:text-gray-500">No milestones. Add one above.</p>
        )}
      </div>

      <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <FileSignature className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Generate contract</h2>
        </div>
        <div className="flex gap-2 flex-wrap items-end">
          <select value={selectedPkg} onChange={(e) => setSelectedPkg(e.target.value)} className="rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100">
            <option value="">Package</option>
            {packages.map((p) => <option key={p.id} value={p.id}>{p.name_ro}</option>)}
          </select>
          <select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)} className="rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100">
            <option value="">Template</option>
            {templates.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
          </select>
          <Button onClick={generateContract} size="sm" variant="primary" disabled={!selectedPkg || !selectedTemplate}>Generate</Button>
        </div>
      </div>
    </motion.div>
  );
}
