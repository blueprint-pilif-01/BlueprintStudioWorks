import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { DataTable } from "@/components/dashboard/data-table";

type Template = { id: number; title: string; nickname: string | null; created_at: string; updated_at: string };

export function AdminContractTemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newRawText, setNewRawText] = useState("");

  function load() {
    api<{ templates: Template[] }>("/api/contracts/templates")
      .then((r) => setTemplates(r.templates || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim() || !newRawText.trim()) return;
    try {
      await api("/api/contracts/templates", { method: "POST", body: { title: newTitle, raw_text: newRawText, fields: [] } });
      setNewTitle("");
      setNewRawText("");
      setShowForm(false);
      load();
    } catch (e) { console.error(e); }
  }

  const columns = [
    { key: "title", label: "Title", render: (r: Template) => <span className="font-medium text-gray-900 dark:text-gray-100">{r.title}</span> },
    { key: "nickname", label: "Nickname", render: (r: Template) => <span className="text-gray-500 dark:text-gray-400">{r.nickname || "—"}</span> },
    { key: "updated_at", label: "Updated", render: (r: Template) => <span className="text-xs text-gray-400 dark:text-gray-500">{new Date(r.updated_at).toLocaleDateString()}</span> },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Contract Templates</h1>
        <Button size="sm" variant="primary" onClick={() => setShowForm(!showForm)}>
          <Plus className="h-3.5 w-3.5 mr-1" />{showForm ? "Cancel" : "New template"}
        </Button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 p-5 shadow-sm">
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Title</label>
              <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Contract title" className="mt-1 !bg-gray-50 dark:!bg-gray-700 !border-gray-200 dark:!border-gray-600" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                Contract text <span className="normal-case text-gray-400 dark:text-gray-500 font-normal">— use {"{{client_name}}"} for placeholders</span>
              </label>
              <Textarea value={newRawText} onChange={(e) => setNewRawText(e.target.value)} placeholder="Full contract content..." rows={8} className="mt-1 !bg-gray-50 dark:!bg-gray-700 !border-gray-200 dark:!border-gray-600" />
            </div>
            <Button type="submit" variant="primary" size="sm">Create template</Button>
          </form>
        </motion.div>
      )}

      {loading ? (
        <div className="animate-pulse text-gray-400 dark:text-gray-500 text-sm">Loading...</div>
      ) : (
        <DataTable columns={columns} data={templates} keyExtractor={(r) => r.id} emptyMessage="No templates yet. Create one to get started." />
      )}
    </motion.div>
  );
}
