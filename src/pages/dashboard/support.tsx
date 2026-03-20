import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Send, CheckCircle, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";

type Feedback = {
  id: number;
  site_slug: string | null;
  subject: string | null;
  message: string;
  status: string;
  admin_reply: string | null;
  created_at: string;
};

type SiteSlug = string;

export function DashboardSupportPage() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [siteSlugs, setSiteSlugs] = useState<SiteSlug[]>([]);
  const [siteSlug, setSiteSlug] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  function load() {
    Promise.all([
      api<{ feedback: Feedback[] }>("/api/portal/feedback"),
      api<{ siteSlugs: string[] }>("/api/portal/my-sites"),
    ]).then(([fb, sites]) => {
      setFeedback(fb.feedback || []);
      setSiteSlugs(sites.siteSlugs || []);
      if (sites.siteSlugs?.length && !siteSlug) setSiteSlug(sites.siteSlugs[0]);
    }).catch(console.error).finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitting(true);
    try {
      await api("/api/portal/feedback", {
        method: "POST",
        body: { site_slug: siteSlug || null, subject: subject.trim() || null, message: message.trim() },
      });
      setMessage("");
      setSubject("");
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      load();
    } catch (e) { console.error(e); } finally { setSubmitting(false); }
  }

  if (loading) return <div className="animate-pulse text-gray-400 dark:text-gray-500 text-sm">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Feedback & Support</h1>
        <p className="text-sm text-gray-500 mt-1">Send feedback about your site or ask for support.</p>
      </div>

      <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Send feedback</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          {siteSlugs.length > 0 && (
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Site</label>
              <select
                value={siteSlug}
                onChange={(e) => setSiteSlug(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
              >
                <option value="">General feedback</option>
                {siteSlugs.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          )}
          <div>
            <label className="text-xs font-medium text-gray-500">Subject</label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="What is this about?" className="mt-1 !bg-gray-50 dark:!bg-gray-700 !border-gray-200 dark:!border-gray-600" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500">Message</label>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Describe what you'd like changed, fixed, or improved..." rows={4} className="mt-1 !bg-gray-50 !border-gray-200" />
          </div>
          <div className="flex items-center gap-3">
            <Button type="submit" size="sm" variant="primary" disabled={submitting || !message.trim()}>
              <Send className="h-3.5 w-3.5 mr-1" />
              {submitting ? "Sending..." : "Send feedback"}
            </Button>
            {sent && <span className="text-xs text-emerald-600 font-medium flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5" /> Sent!</span>}
          </div>
        </form>
      </div>

      {feedback.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Your feedback history</h2>
          <div className="space-y-2">
            {feedback.map((fb) => (
              <div key={fb.id} className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {fb.site_slug && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-primary-700 bg-primary-500/8 px-1.5 py-0.5 rounded">
                          <Globe className="h-2.5 w-2.5" />{fb.site_slug}
                        </span>
                      )}
                      {fb.subject && <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{fb.subject}</span>}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{fb.message}</p>
                    {fb.admin_reply && (
                      <div className="mt-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/60 dark:border-emerald-700/50 px-3 py-2">
                        <p className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase mb-0.5">Admin reply</p>
                        <p className="text-sm text-emerald-800 dark:text-emerald-300">{fb.admin_reply}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
                      fb.status === "resolved" ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" : fb.status === "read" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    }`}>{fb.status}</span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">{new Date(fb.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
