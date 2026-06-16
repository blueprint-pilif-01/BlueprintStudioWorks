import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, LayoutDashboard, FileSignature, Package, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BackgroundEffects } from "@/components/ui/background-effects";
import { useAuth } from "@/contexts/auth-context";
import { useLanguage } from "@/contexts/language-context";
import { api } from "@/lib/api";
import { BlueprintBrand } from "@/components/ui/blueprint-brand";

const features = [
  {
    icon: LayoutDashboard,
    title: { ro: "Progresul proiectului", en: "Project progress" },
    description: {
      ro: "Vezi la ce etapă e site-ul, fără mailuri de „când e gata?”.",
      en: "See where your site stands, without chasing me for updates.",
    },
  },
  {
    icon: FileSignature,
    title: { ro: "Contracte online", en: "Online contracts" },
    description: {
      ro: "Citești și semnezi direct din portal.",
      en: "Read and sign directly in the portal.",
    },
  },
  {
    icon: Package,
    title: { ro: "Pachete și servicii", en: "Packages & services" },
    description: {
      ro: "Hosting, suport și extra-urile tale, listate clar.",
      en: "Hosting, support and add-ons, listed in one place.",
    },
  },
  {
    icon: LifeBuoy,
    title: { ro: "Mesaje și feedback", en: "Messages & feedback" },
    description: {
      ro: "Îmi lași cereri aici și răspund din același loc.",
      en: "Send requests here and get replies in the same place.",
    },
  },
] as const;

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { language, translate } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/dashboard";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api<{ token: string; user: { id: number; email: string; name?: string; role: string } }>(
        "/api/auth/client/login",
        { method: "POST", body: { email, password } }
      );
      login(res.token, { ...res.user, role: "client" } as { id: number; email: string; name?: string; role: "admin" | "client" });
      navigate(from, { replace: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundEffects variant="edge" />

      {/* Back to site */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-button text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          {translate({ ro: "Înapoi la site", en: "Back to site" })}
        </Link>
      </div>

      <div className="min-h-screen flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center">
          {/* Presentation panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
            className="order-2 lg:order-1"
          >
            <BlueprintBrand
              as="h1"
              className="mb-4"
              textClassName="text-4xl md:text-5xl"
              logoClassName="h-10 md:h-12"
            />

            <p className="text-lg text-muted max-w-xl mb-8">
              {translate({
                ro: "Contul tău de client. Progres, contracte, pachete și suport, toate într-un singur loc.",
                en: "Your client account. Progress, contracts, packages and support in one place.",
              })}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title.en}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + index * 0.1, duration: 0.5 }}
                    className="glass rounded-2xl p-4 flex items-start gap-3"
                  >
                    <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500/25 to-secondary-500/25 shrink-0">
                      <Icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-foreground mb-1">
                        {feature.title[language]}
                      </h3>
                      <p className="text-xs text-muted leading-relaxed">
                        {feature.description[language]}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Login card */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
            className="order-1 lg:order-2 w-full max-w-md mx-auto lg:mx-0"
          >
            <div className="glass-strong rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-1">
                {translate({ ro: "Bine ai revenit", en: "Welcome back" })}
              </h2>
              <p className="text-muted mb-6">
                {translate({ ro: "Intră în contul tău de client", en: "Sign in to your client dashboard" })}
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@example.com"
                    required
                    autoComplete="email"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="password">
                    {translate({ ro: "Parolă", en: "Password" })}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    className="mt-1"
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-600">{error}</p>
                )}
                <Button type="submit" variant="glass" className="w-full" disabled={loading}>
                  {loading
                    ? translate({ ro: "Se conectează...", en: "Signing in..." })
                    : translate({ ro: "Conectare", en: "Sign in" })}
                </Button>
              </form>
              <p className="mt-4 text-sm text-muted text-center">
                {translate({ ro: "Ai nevoie de acces? ", en: "Need access? " })}
                <Link to="/contact" className="text-primary-600 font-semibold hover:underline">
                  {translate({ ro: "Contactează-ne", en: "Contact us" })}
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
