import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Monitor, MessageSquare, X, Send, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";

type SiteEntry = { slug: string; url: string | null; label: string | null };

function resolveSiteUrl(site: SiteEntry) {
  if (site.url) return site.url;
  const base = import.meta.env.BASE_URL ?? "/";
  return `${base.replace(/\/$/, "")}/client-sites/${site.slug}/index.html`;
}

export function DashboardMySitePage() {
  const [sites, setSites] = useState<SiteEntry[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const activeSite = sites[activeIndex] || null;

  useEffect(() => {
    api<{ sites?: SiteEntry[]; siteSlugs?: string[] }>("/api/portal/my-sites")
      .then((r) => {
        const list = r.sites || (r.siteSlugs || []).map((s: string) => ({ slug: s, url: null, label: null }));
        setSites(list);
        if (list.length) setActiveIndex(0);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleFeedbackSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitting(true);
    try {
      await api("/api/portal/feedback", {
        method: "POST",
        body: { site_slug: activeSite?.slug || null, subject: subject.trim() || null, message: message.trim() },
      });
      setMessage("");
      setSubject("");
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <div className="animate-pulse text-gray-400 dark:text-gray-500 text-sm">Loading...</div>;

  if (!sites.length) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 p-12 text-center shadow-sm">
        <Monitor className="h-10 w-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
        <p className="text-gray-500 dark:text-gray-400">No site assigned yet.</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Contact your admin to get access.</p>
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 mt-4 text-sm text-primary-600 dark:text-primary-400 hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"><ArrowLeft className="h-5 w-5" /></Link>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Site Preview</h1>
        </div>
        {sites.length > 1 && (
          <div className="flex gap-1">
            {sites.map((s, i) => (
              <button
                key={s.slug}
                onClick={() => setActiveIndex(i)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  activeIndex === i ? "bg-primary-500 text-white border-primary-500" : "bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-600"
                }`}
              >{s.label || s.slug}</button>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl overflow-hidden border border-gray-200/80 dark:border-gray-700/80 bg-white dark:bg-gray-800 shadow-lg">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-600">
          <div className="flex gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">{activeSite?.url || activeSite?.label || activeSite?.slug}</span>
          </div>
        </div>
        {activeSite && (
          <iframe
            src={resolveSiteUrl(activeSite)}
            title="Client site preview"
            className="w-full h-[calc(100vh-14rem)] min-h-[500px] border-0"
            sandbox="allow-scripts allow-same-origin allow-popups"
            referrerPolicy="no-referrer"
          />
        )}
      </div>

      {/* Floating feedback button */}
      <button
        onClick={() => setFeedbackOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-primary-500 text-white px-4 py-3 shadow-lg hover:bg-primary-600 transition-colors"
        title="Give feedback about this site"
      >
        <MessageSquare className="h-5 w-5" />
        <span className="font-medium">Feedback</span>
      </button>

      {/* Feedback panel */}
      <AnimatePresence>
        {feedbackOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setFeedbackOpen(false)}
            />
            <motion.div
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white dark:bg-gray-800 shadow-xl border-l border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary-500 dark:text-primary-400" />
                    <h2 className="font-semibold text-gray-900 dark:text-gray-100">Feedback pentru {activeSite?.label || activeSite?.slug}</h2>
                  </div>
                  <button
                    onClick={() => setFeedbackOpen(false)}
                    className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:hover:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <form onSubmit={handleFeedbackSubmit} className="flex-1 flex flex-col p-5 overflow-auto">
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Site</label>
                      <p className="mt-0.5 text-sm font-medium text-gray-900 dark:text-gray-100">{activeSite?.label || activeSite?.slug}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Subject</label>
                      <Input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="What is this about?"
                        className="mt-1 !bg-gray-50 dark:!bg-gray-700 !border-gray-200 dark:!border-gray-600"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Mesaj</label>
                      <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Descrie modificările, corectările sau îmbunătățirile pe care le dorești..."
                        rows={5}
                        className="mt-1 !bg-gray-50 dark:!bg-gray-700 !border-gray-200 dark:!border-gray-600"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <Button type="submit" size="sm" variant="primary" disabled={submitting || !message.trim()}>
                      <Send className="h-3.5 w-3.5 mr-1" />
                      {submitting ? "Sending..." : "Send"}
                    </Button>
                    {sent && (
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                        <CheckCircle className="h-3.5 w-3.5" /> Sent!
                      </span>
                    )}
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
