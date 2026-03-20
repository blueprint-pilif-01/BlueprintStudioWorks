import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignaturePad } from "@/components/dashboard/signature-pad";
import { api } from "@/lib/api";

type ContractData = {
  contract: {
    id: number;
    contract_number: string;
    title: string;
    raw_text: string;
    fields: { key: string; name?: string; label?: string; type?: string }[];
    client_name?: string;
    client_email?: string;
    already_signed: boolean;
  };
};

export function DashboardContractSignPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<ContractData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filledFields, setFilledFields] = useState<Record<string, string>>({});
  const [signature, setSignature] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    api<ContractData>(`/api/portal/contracts/${id}`).then((r) => {
      setData(r);
      const init: Record<string, string> = {};
      r.contract.fields?.forEach((f) => {
        const key = f.key || f.name;
        if (key === "client_name") init[key] = r.contract.client_name || "";
        if (key === "client_email") init[key] = r.contract.client_email || "";
      });
      setFilledFields(init);
    }).catch(console.error).finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id || !signature) { setError("Please draw your signature"); return; }
    setSubmitting(true);
    setError("");
    try {
      await api(`/api/portal/contracts/${id}/sign`, { method: "POST", body: { filled_fields: filledFields, signature_data: signature } });
      navigate("/dashboard/contracts");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Signing failed");
    } finally { setSubmitting(false); }
  }

  if (loading) return <div className="animate-pulse text-gray-400 dark:text-gray-500 text-sm">Loading...</div>;
  if (!data) return <div className="text-gray-500 dark:text-gray-400">Contract not found.</div>;

  if (data.contract.already_signed) {
    return (
      <div className="max-w-xl mx-auto rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 p-8 text-center shadow-sm">
        <CheckCircle className="h-12 w-12 text-emerald-500 dark:text-emerald-400 mx-auto mb-3" />
        <p className="text-gray-700 dark:text-gray-300 font-medium">Contract already signed.</p>
        <Link to="/dashboard/contracts" className="inline-block mt-4 text-sm text-primary-600 dark:text-primary-400 hover:underline">Back to contracts</Link>
      </div>
    );
  }

  const { contract } = data;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto space-y-5">
      <Link to="/dashboard/contracts" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-300">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 p-6 shadow-sm">
        <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">{contract.title}</h1>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{contract.contract_number}</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {contract.fields?.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Fill in details</h2>
              {contract.fields.map((f) => {
                const key = f.key || f.name;
                if (!key) return null;
                return (
                  <div key={key}>
                    <Label htmlFor={key} className="text-xs">{f.label || f.name || key}</Label>
                    <Input id={key} value={filledFields[key] ?? ""} onChange={(e) => setFilledFields((prev) => ({ ...prev, [key]: e.target.value }))} className="mt-1 !bg-gray-50 dark:!bg-gray-700 !border-gray-200 dark:!border-gray-600" />
                  </div>
                );
              })}
            </div>
          )}

          <div>
            <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Contract text</h2>
            <div className="rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 p-4 max-h-64 overflow-y-auto">
              <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">{contract.raw_text}</pre>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Your signature</h2>
            <SignaturePad onCapture={setSignature} />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" variant="primary" className="w-full" disabled={submitting || !signature}>
            {submitting ? "Signing..." : "Sign contract"}
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
