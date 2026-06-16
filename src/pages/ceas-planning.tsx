import { motion } from "framer-motion"
import { ArrowLeft, Star, Download, FileText, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Timeline, type TimelineEntry } from "@/components/ui/timeline"
import { Link } from "react-router-dom"
import { useLanguage } from "@/contexts/language-context"

const ORANGE = "#FF8C42"
const DARK = "#0a0a0a"

function makeTimelineData(translate: (t: { ro: string; en: string }) => string): TimelineEntry[] {
  return [
    {
      title: translate({ ro: "Overview", en: "Overview" }),
      content: (
        <Card className="border-[#FF8C42]/20 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">CEAS Planning Center</h4>
                <p className="text-gray-300 mb-6">
                  {translate({
                    ro: "Sistem de planificare și management pentru echipe de voluntari: organizare evenimente, contracte digitale cu semnături, înscrieri și notificări. Teme light/dark, autentificare protejată, export PDF.",
                    en: "Planning and management system for volunteer teams: event organization, digital contracts with signatures, registrations and notifications. Light/dark themes, protected auth, PDF export.",
                  })}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-[#FF8C42]/10 rounded-xl border border-[#FF8C42]/20">
                    <h5 className="font-semibold text-[#FF8C42] mb-2 text-sm">{translate({ ro: "Rute", en: "Routes" })}</h5>
                    <p className="text-xs text-gray-400">15+ rute</p>
                  </div>
                  <div className="p-4 bg-[#FF8C42]/10 rounded-xl border border-[#FF8C42]/20">
                    <h5 className="font-semibold text-[#FF8C42] mb-2 text-sm">Stack</h5>
                    <p className="text-xs text-gray-400">React 19, TypeScript</p>
                  </div>
                </div>
                <div className="p-4 bg-[#0a0a0a] rounded-xl border border-[#FF8C42]/20">
                  <h5 className="font-semibold text-[#FF8C42] mb-3">Tech Stack</h5>
                  <div className="flex flex-wrap gap-2">
                    {["React 19", "TypeScript", "Vite 7", "Tailwind", "Framer Motion", "jsPDF", "Signature Pad", "Three.js"].map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 bg-[#FF8C42]/20 text-[#FF8C42] rounded-full font-medium">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 bg-[#FF8C42]/5 rounded-2xl border border-[#FF8C42]/20">
                  <h5 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Download className="h-5 w-5 text-[#FF8C42]" />
                    {translate({ ro: "Paleta", en: "Color Palette" })}
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg" style={{ background: ORANGE }} />
                      <div>
                        <p className="text-sm font-semibold text-white">Orange</p>
                        <p className="text-xs text-gray-400">#FF8C42, accent</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg" style={{ background: DARK }} />
                      <div>
                        <p className="text-sm font-semibold text-white">Dark</p>
                        <p className="text-xs text-gray-400">#0a0a0a, background</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-[#FF8C42]/5 rounded-2xl border border-[#FF8C42]/20">
                  <h5 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Star className="h-5 w-5 text-[#FF8C42]" />
                    {translate({ ro: "Teme", en: "Themes" })}
                  </h5>
                  <p className="text-sm text-gray-400">
                    ThemeProvider, useTheme, data-theme pe html, localStorage.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      title: translate({ ro: "Structura Aplicației", en: "App Structure" }),
      content: (
        <Card className="border-[#FF8C42]/20 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">{translate({ ro: "Rute Principale", en: "Main Routes" })}</h4>
                <p className="text-gray-300 mb-6">
                  {translate({
                    ro: "Planner prefix: login, sign contract (token), register (event), dashboard, notifications, events CRUD, contracts CRUD, admin users/contracts/registrations.",
                    en: "Planner prefix: login, sign contract (token), register (event), dashboard, notifications, events CRUD, contracts CRUD, admin users/contracts/registrations.",
                  })}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { page: "Login", desc: translate({ ro: "Autentificare", en: "Authentication" }), icon: <Users className="h-4 w-4" /> },
                    { page: "Dashboard", desc: translate({ ro: "Grid, carduri", en: "Grid, cards" }), icon: <Calendar className="h-4 w-4" /> },
                    { page: "Events", desc: "CRUD, tipuri, înscrieri", icon: <Calendar className="h-4 w-4" /> },
                    { page: "Contracts", desc: translate({ ro: "Template-uri, semnături", en: "Templates, signing" }), icon: <FileText className="h-4 w-4" /> },
                    { page: "Admin", desc: "Users, contracts, registrations", icon: <Users className="h-4 w-4" /> },
                  ].map((item, i) => (
                    <div key={i} className="p-3 bg-[#0a0a0a] border border-[#FF8C42]/20 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-[#FF8C42]">{item.icon}</div>
                        <h5 className="font-semibold text-white text-sm">{item.page}</h5>
                      </div>
                      <p className="text-xs text-gray-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 bg-[#FF8C42]/5 rounded-2xl border border-[#FF8C42]/20">
                  <h5 className="font-semibold text-white mb-3">{translate({ ro: "Features Principale", en: "Key Features" })}</h5>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li className="flex items-start gap-2"><span className="text-[#FF8C42]">•</span> ProtectedRoute + redirect la login</li>
                    <li className="flex items-start gap-2"><span className="text-[#FF8C42]">•</span> Events: CRUD, tipuri, înscrieri publice</li>
                    <li className="flex items-start gap-2"><span className="text-[#FF8C42]">•</span> Contracts: template-uri, semnături digitale (Signature Pad)</li>
                    <li className="flex items-start gap-2"><span className="text-[#FF8C42]">•</span> PDF export (jsPDF, jsPDF-autotable)</li>
                    <li className="flex items-start gap-2"><span className="text-[#FF8C42]">•</span> Notificări</li>
                    <li className="flex items-start gap-2"><span className="text-[#FF8C42]">•</span> LoadingSpinner, ErrorBoundary</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      title: translate({ ro: "Rezultate", en: "Results" }),
      content: (
        <Card className="border-[#FF8C42]/20 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-[#FF8C42]/10 rounded-2xl border border-[#FF8C42]/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-[#FF8C42]" />
                  </div>
                  <h5 className="font-semibold text-white text-lg">{translate({ ro: "Sistem Complet", en: "Complete System" })}</h5>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {translate({
                    ro: "Planner pentru echipe de voluntari: evenimente, contracte cu semnături digitale, înscrieri, notificări. Teme light/dark, cache versioning.",
                    en: "Planner for volunteer teams: events, digital contracts with signatures, registrations, notifications. Light/dark themes, cache versioning.",
                  })}
                </p>
              </div>
              <div className="p-6 bg-[#FF8C42]/10 rounded-2xl border border-[#FF8C42]/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center">
                    <Star className="h-6 w-6 text-[#FF8C42]" />
                  </div>
                  <h5 className="font-semibold text-white text-lg">{translate({ ro: "Design", en: "Design" })}</h5>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {translate({
                    ro: "Orange accent pe dark/light, PlannerNav layout, dashboard cu grid clickable. Fără link public, proiect intern.",
                    en: "Orange accent on dark/light, PlannerNav layout, dashboard with clickable grid. No public link, internal project.",
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ),
    },
  ]
}

export function CeasPlanningPage() {
  const { translate } = useLanguage()
  const timelineData = makeTimelineData(translate)

  return (
    <div className="relative" style={{ minHeight: '100vh', background: "linear-gradient(to bottom, #0a0a0a, #1a1a1a)", fontFamily: "Inter, sans-serif" }}>
  <div className="fixed inset-0 -z-10" style={{ background: "linear-gradient(to bottom, #0a0a0a, #1a1a1a)", minHeight: '100%' }}></div>
      <div className="container-custom py-20 pt-32">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <Link to="/portfolio">
            <Button variant="ghost" size="sm" className="gap-2 text-[#FF8C42] hover:text-white hover:bg-[#FF8C42]/10">
              <ArrowLeft className="h-4 w-4" />
              {translate({ ro: "Înapoi la portofoliu", en: "Back to portfolio" })}
            </Button>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-bold text-[#FF8C42] mb-6">CEAS Planning Center</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            {translate({
              ro: "Sistem de planificare pentru echipe de voluntari • React 19 • Evenimente, contracte, înscrieri",
              en: "Planning system for volunteer teams • React 19 • Events, contracts, registrations",
            })}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <span className="px-4 py-2 bg-[#FF8C42]/20 text-[#FF8C42] rounded-full text-sm font-medium">React 19</span>
            <span className="px-4 py-2 bg-[#FF8C42]/20 text-[#FF8C42] rounded-full text-sm font-medium">TypeScript</span>
            <span className="px-4 py-2 bg-[#FF8C42]/20 text-[#FF8C42] rounded-full text-sm font-medium">Full-Stack</span>
          </div>
        </motion.div>

        <Timeline
          data={timelineData}
          title={translate({ ro: "Journey CEAS Planning", en: "CEAS Planning Journey" })}
          subtitle={translate({
            ro: "Sistem intern de planificare, evenimente, contracte digitale, înscrieri.",
            en: "Internal planning system, events, digital contracts, registrations.",
          })}
        />

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mt-12">
          <Card className="rounded-3xl p-8 md:p-12 max-w-2xl mx-auto bg-[#FF8C42]/5 border-[#FF8C42]/30">
            <h2 className="text-3xl font-bold text-white mb-4">{translate({ ro: "Vrei ceva similar?", en: "Want something similar?" })}</h2>
            <p className="text-gray-400 mb-8">{translate({ ro: "Hai să discutăm despre următorul tău proiect.", en: "Let's talk about your next project." })}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-[#FF8C42] hover:bg-[#FF9F5A] text-white">
                  {translate({ ro: "Începe un proiect", en: "Start a project" })}
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button size="lg" variant="outline" className="border-[#FF8C42] text-[#FF8C42] hover:bg-[#FF8C42]/10">
                  {translate({ ro: "Vezi alte proiecte", en: "See other projects" })}
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
