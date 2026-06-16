import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { BlueprintBrand } from "@/components/ui/blueprint-brand";

export function AcceptInvitePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) setError("Invalid or missing invite link.");
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token || !password) return;
    setLoading(true);
    setError("");
    try {
      const res = await api<{ token: string; user: { id: number; email: string; name?: string; role: string } }>(
        "/api/auth/client/accept-invite",
        { method: "POST", body: { token, password, name: name || undefined } }
      );
      localStorage.setItem("blueprint_token", res.token);
      localStorage.setItem("blueprint_user", JSON.stringify({ ...res.user, role: "client" }));
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to accept invite");
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="rounded-2xl bg-white/70 backdrop-blur-xl p-8 text-center">
          <p className="text-muted">{error}</p>
          <a href="/" className="inline-block mt-4 text-primary-500 hover:underline">Go home</a>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl bg-white/70 backdrop-blur-xl p-8 text-center"
        >
          <p className="text-foreground font-semibold">Account created! Redirecting to dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-foreground/5 via-background to-primary-500/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl bg-white/70 backdrop-blur-xl p-8 shadow-2xl border border-white/55"
      >
        <BlueprintBrand as="h1" className="mb-2" textClassName="text-2xl" logoClassName="h-8" />
        <p className="text-muted mb-6">Set up your client account</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Your name (optional)</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="mt-1"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
