import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { api } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import type { Package } from "@/hooks/use-api";

type MyPackage = { id: number; status: string; package_id: number; slug: string; name_ro: string; price: number; period: string | null; created_at: string };

export function DashboardPackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [myPackages, setMyPackages] = useState<MyPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api<{ packages: Package[] }>("/api/packages"),
      api<{ packages: MyPackage[] }>("/api/portal/my-packages"),
    ]).then(([pkgRes, myRes]) => {
      setPackages(pkgRes.packages || []);
      setMyPackages(myRes.packages || []);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="animate-pulse text-gray-400 dark:text-gray-500 text-sm">Loading...</div>;

  const mySlugs = new Set(myPackages.map((p) => p.slug));
  const plans = packages.filter((p) => p.type === "plan");
  const addons = packages.filter((p) => p.type === "addon");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-6xl">
      <h1 className="text-2xl font-bold text-gray-900">Packages</h1>

      {myPackages.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Your packages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {myPackages.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 px-5 py-4 shadow-sm">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{p.name_ro}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{formatCurrency(p.price)}{p.period && ` / ${p.period}`}</p>
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg ${
                  p.status === "active" ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" : p.status === "pending_signature" ? "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}>{p.status.replace("_", " ")}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Available plans</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {plans.map((p) => (
            <div key={p.id} className={`rounded-xl border p-5 transition-shadow ${mySlugs.has(p.slug) ? "bg-primary-500/5 dark:bg-primary-500/10 border-primary-300/40 dark:border-primary-500/30 shadow-md" : "bg-white dark:bg-gray-800 border-gray-200/80 dark:border-gray-700/80 shadow-sm hover:shadow-md"}`}>
              {p.is_popular && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded-md mb-2">
                  <Star className="h-3 w-3" fill="currentColor" /> Popular
                </span>
              )}
              <p className="text-sm font-semibold text-gray-900">{p.name_ro}</p>
              <p className="text-lg font-bold text-primary-600 mt-1">{formatCurrency(p.price)}<span className="text-xs font-normal text-gray-400"> / project</span></p>
              <ul className="mt-3 space-y-1">
                {(p.features_ro || []).slice(0, 4).map((f, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <Check className="h-3.5 w-3.5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{f}</span>
                  </li>
                ))}
              </ul>
              {mySlugs.has(p.slug) && <p className="mt-3 text-[11px] font-semibold text-primary-600">Assigned to you</p>}
            </div>
          ))}
        </div>
      </div>

      {addons.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Add-on services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {addons.map((p) => (
              <div key={p.id} className={`rounded-xl border p-5 ${mySlugs.has(p.slug) ? "bg-primary-500/5 dark:bg-primary-500/10 border-primary-300/40 dark:border-primary-500/30" : "bg-white dark:bg-gray-800 border-gray-200/80 dark:border-gray-700/80"} shadow-sm`}>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{p.name_ro}</p>
                <p className="text-lg font-bold text-primary-600 dark:text-primary-400 mt-1">{formatCurrency(p.price)}{p.period && <span className="text-xs font-normal text-gray-400 dark:text-gray-500"> / {p.period}</span>}</p>
                {mySlugs.has(p.slug) && <p className="mt-2 text-[11px] font-semibold text-primary-600">Active</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
