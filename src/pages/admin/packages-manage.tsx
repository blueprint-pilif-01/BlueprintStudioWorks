import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star, ChevronDown, ChevronUp, Save } from "lucide-react";
import type { Package } from "@/hooks/use-api";

export function AdminPackagesManagePage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<{ packages: Package[] }>("/api/packages").then((r) => setPackages(r.packages || [])).catch(console.error).finally(() => setLoading(false));
  }, []);

  async function updatePkg(id: number, data: Partial<Package>) {
    try {
      await api(`/api/packages/${id}`, { method: "PUT", body: data as Record<string, unknown> });
      setPackages((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
    } catch (e) { console.error(e); }
  }

  if (loading) return <div className="animate-pulse text-gray-400 dark:text-gray-500 text-sm">Loading...</div>;

  const plans = packages.filter((p) => p.type === "plan");
  const addons = packages.filter((p) => p.type === "addon");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Packages</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Edit names, descriptions, features, and prices. Changes update the public pricing page.</p>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Plans</h2>
        <div className="space-y-3">
          {plans.map((pkg) => <PackageEditor key={pkg.id} pkg={pkg} onUpdate={updatePkg} />)}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Add-ons</h2>
        <div className="space-y-3">
          {addons.map((pkg) => <PackageEditor key={pkg.id} pkg={pkg} onUpdate={updatePkg} />)}
        </div>
      </div>
    </motion.div>
  );
}

function PackageEditor({ pkg, onUpdate }: { pkg: Package; onUpdate: (id: number, data: Partial<Package>) => Promise<void> }) {
  const [expanded, setExpanded] = useState(false);
  const [nameRo, setNameRo] = useState(pkg.name_ro);
  const [nameEn, setNameEn] = useState(pkg.name_en);
  const [descRo, setDescRo] = useState(pkg.description_ro || "");
  const [descEn, setDescEn] = useState(pkg.description_en || "");
  const [featuresRo, setFeaturesRo] = useState((pkg.features_ro || []).join("\n"));
  const [featuresEn, setFeaturesEn] = useState((pkg.features_en || []).join("\n"));
  const [noteRo, setNoteRo] = useState(pkg.note_ro || "");
  const [noteEn, setNoteEn] = useState(pkg.note_en || "");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await onUpdate(pkg.id, {
      name_ro: nameRo,
      name_en: nameEn,
      description_ro: descRo,
      description_en: descEn,
      features_ro: featuresRo.split("\n").map((s) => s.trim()).filter(Boolean),
      features_en: featuresEn.split("\n").map((s) => s.trim()).filter(Boolean),
      note_ro: noteRo || undefined,
      note_en: noteEn || undefined,
    } as Partial<Package>);
    setSaving(false);
  }

  return (
    <div className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={(e) => { e.stopPropagation(); onUpdate(pkg.id, { is_popular: !pkg.is_popular } as Partial<Package>); }}
            className={`flex-shrink-0 transition-colors ${pkg.is_popular ? "text-amber-500 dark:text-amber-400" : "text-gray-300 dark:text-gray-600 hover:text-amber-400 dark:hover:text-amber-500"}`}
          >
            <Star className="h-4 w-4" fill={pkg.is_popular ? "currentColor" : "none"} />
          </button>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{pkg.name_ro}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">{pkg.slug} &middot; {pkg.type}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <span className="text-xs text-gray-400 dark:text-gray-500">EUR</span>
            <Input
              key={`${pkg.id}-${pkg.price}`}
              type="number"
              defaultValue={pkg.price}
              onBlur={(e) => {
                const v = parseFloat((e.target as HTMLInputElement).value);
                if (!isNaN(v) && v !== pkg.price) onUpdate(pkg.id, { price: v } as Partial<Package>);
              }}
              className="!w-24 !h-9 !bg-gray-50 dark:!bg-gray-700 !border-gray-200 dark:!border-gray-600 text-right"
            />
            {pkg.period && <span className="text-xs text-gray-400 dark:text-gray-500">/ {pkg.period}</span>}
          </div>
          {expanded ? <ChevronUp className="h-4 w-4 text-gray-400 dark:text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-700 pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Name (RO)</label>
                  <Input value={nameRo} onChange={(e) => setNameRo(e.target.value)} className="mt-1 !bg-gray-50 dark:!bg-gray-700 !border-gray-200 dark:!border-gray-600" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Name (EN)</label>
                  <Input value={nameEn} onChange={(e) => setNameEn(e.target.value)} className="mt-1 !bg-gray-50 dark:!bg-gray-700 !border-gray-200 dark:!border-gray-600" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Description (RO)</label>
                  <Input value={descRo} onChange={(e) => setDescRo(e.target.value)} className="mt-1 !bg-gray-50 dark:!bg-gray-700 !border-gray-200 dark:!border-gray-600" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Description (EN)</label>
                  <Input value={descEn} onChange={(e) => setDescEn(e.target.value)} className="mt-1 !bg-gray-50 dark:!bg-gray-700 !border-gray-200 dark:!border-gray-600" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Features (RO), one per line</label>
                  <Textarea value={featuresRo} onChange={(e) => setFeaturesRo(e.target.value)} rows={5} className="mt-1 !bg-gray-50 dark:!bg-gray-700 !border-gray-200 dark:!border-gray-600 text-xs" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Features (EN), one per line</label>
                  <Textarea value={featuresEn} onChange={(e) => setFeaturesEn(e.target.value)} rows={5} className="mt-1 !bg-gray-50 dark:!bg-gray-700 !border-gray-200 dark:!border-gray-600 text-xs" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Note (RO)</label>
                  <Input value={noteRo} onChange={(e) => setNoteRo(e.target.value)} className="mt-1 !bg-gray-50 dark:!bg-gray-700 !border-gray-200 dark:!border-gray-600" placeholder="Optional note" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Note (EN)</label>
                  <Input value={noteEn} onChange={(e) => setNoteEn(e.target.value)} className="mt-1 !bg-gray-50 dark:!bg-gray-700 !border-gray-200 dark:!border-gray-600" placeholder="Optional note" />
                </div>
              </div>
              <Button onClick={save} size="sm" variant="primary" disabled={saving}>
                <Save className="h-3.5 w-3.5 mr-1" />
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
