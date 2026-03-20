import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Globe, Send, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { StatCard } from "@/components/dashboard/stat-card";

type Feedback = {
  id: number;
  client_id: number;
  client_name: string | null;
  client_email: string;
  site_slug: string | null;
  subject: string | null;
  message: string;
  status: string;
  admin_reply: string | null;
  created_at: string;
};

export function AdminFeedbackPage() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyingId, setReplyingId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);

  function load() {
    api<{ feedback: Feedback[] }>("/api/clients/feedback")
      .then((r) => setFeedback(r.feedback || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  async function handleReply(id: number) {
    if (!replyText.trim()) return;
    setSending(true);
    try {
      await api(`/api/clients/feedback/${id}`, { method: "PUT", body: { admin_reply: replyText.trim(), status: "resolved" } });
      setReplyText("");
      setReplyingId(null);
      load();
    } catch (e) { console.error(e); } finally { setSending(false); }
  }

  async function markRead(id: number) {
    await api(`/api/clients/feedback/${id}`, { method: "PUT", body: { status: "read" } });
    load();
  }

  if (loading) return <div className="animate-pulse text-gray-400 dark:text-gray-500 text-sm">Loading...</div>;

  const newCount = feedback.filter((f) => f.status === "new").length;
  const resolvedCount = feedback.filter((f) => f.status === "resolved").length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Client Feedback</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">View and respond to feedback from your clients.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Feedback" value={feedback.length} icon={MessageSquare} variant="primary" />
        <StatCard title="New / Unread" value={newCount} icon={Clock} variant="secondary" />
        <StatCard title="Resolved" value={resolvedCount} icon={CheckCircle} variant="green" />
      </div>

      {feedback.length === 0 ? (
        <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 p-12 text-center shadow-sm">
          <MessageSquare className="h-10 w-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">No feedback yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {feedback.map((fb) => (
            <div
              key={fb.id}
              className={`rounded-xl bg-white dark:bg-gray-800 border shadow-sm overflow-hidden ${
                fb.status === "new" ? "border-primary-200/60 dark:border-primary-500/40" : "border-gray-200/80 dark:border-gray-700/80"
              }`}
            >
              <div className="px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{fb.client_name || fb.client_email}</span>
                      {fb.site_slug && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-primary-700 dark:text-primary-400 bg-primary-500/8 dark:bg-primary-500/20 px-1.5 py-0.5 rounded">
                          <Globe className="h-2.5 w-2.5" />{fb.site_slug}
                        </span>
                      )}
                      {fb.subject && <span className="text-xs text-gray-500 dark:text-gray-400">&middot; {fb.subject}</span>}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{fb.message}</p>

                    {fb.admin_reply && (
                      <div className="mt-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/60 dark:border-emerald-700/50 px-3 py-2">
                        <p className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase mb-0.5">Your reply</p>
                        <p className="text-sm text-emerald-800 dark:text-emerald-300">{fb.admin_reply}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
                      fb.status === "resolved" ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" : fb.status === "read" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" : "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                    }`}>{fb.status}</span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">{new Date(fb.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                {!fb.admin_reply && (
                  <div className="mt-3 flex gap-2">
                    {fb.status === "new" && (
                      <button onClick={() => markRead(fb.id)} className="text-xs text-blue-600 hover:underline">Mark read</button>
                    )}
                    <button
                      onClick={() => { setReplyingId(replyingId === fb.id ? null : fb.id); setReplyText(""); }}
                      className="text-xs text-primary-600 hover:underline"
                    >
                      {replyingId === fb.id ? "Cancel" : "Reply"}
                    </button>
                  </div>
                )}
              </div>

              {replyingId === fb.id && (
                <div className="px-5 pb-4 border-t border-gray-100 dark:border-gray-700 pt-3">
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write your reply..."
                    rows={3}
                    className="!bg-gray-50 dark:!bg-gray-700 !border-gray-200 dark:!border-gray-600"
                  />
                  <Button onClick={() => handleReply(fb.id)} size="sm" variant="primary" className="mt-2" disabled={sending || !replyText.trim()}>
                    <Send className="h-3.5 w-3.5 mr-1" />
                    {sending ? "Sending..." : "Send reply"}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
