import { motion } from "framer-motion"
import { ArrowLeft, Star, Download, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Timeline, type TimelineEntry } from "@/components/ui/timeline"
import { Link } from "react-router-dom"
import { useLanguage } from "@/contexts/language-context"

const TEAL = "#0A4046"
const ORANGE = "#f97316"

function makeTimelineData(translate: (t: { ro: string; en: string }) => string): TimelineEntry[] {
  return [
    {
      title: translate({ ro: "Overview", en: "Overview" }),
      content: (
        <Card className="border-[#0A4046]/20 bg-gradient-to-br from-white to-slate-50">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-[#0A4046] mb-4">Termotal TM</h4>
                <p className="text-gray-600 mb-6">
                  {translate({
                    ro: "Site corporate pentru companie română de construcții industriale — instalații, întreținere, lucrări metalice. Single-page cu Hero, Proiecte, Despre, Servicii, Contact + pagini țară pentru 14 țări cu hartă interactivă.",
                    en: "Corporate site for Romanian industrial construction company — installation, maintenance, metalwork. Single-page with Hero, Projects, About, Services, Contact + country pages for 14 countries with interactive map.",
                  })}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-[#0A4046]/10 rounded-xl border border-[#0A4046]/20">
                    <h5 className="font-semibold text-[#0A4046] mb-2 text-sm">{translate({ ro: "Structură", en: "Structure" })}</h5>
                    <p className="text-xs text-gray-600">Single-page + 14 țări</p>
                  </div>
                  <div className="p-4 bg-[#f97316]/10 rounded-xl border border-[#f97316]/20">
                    <h5 className="font-semibold text-[#f97316] mb-2 text-sm">Map</h5>
                    <p className="text-xs text-gray-600">react-simple-maps</p>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[#0A4046]/20">
                  <h5 className="font-semibold text-[#0A4046] mb-3">Tech Stack</h5>
                  <div className="flex flex-wrap gap-2">
                    {["React 18", "TypeScript", "Vite 6", "Tailwind", "react-simple-maps"].map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 bg-[#0A4046]/20 text-[#0A4046] rounded-full font-medium">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 bg-[#0A4046]/10 rounded-2xl border border-[#0A4046]/20">
                  <h5 className="font-semibold text-[#0A4046] mb-3 flex items-center gap-2">
                    <Download className="h-5 w-5 text-[#0A4046]" />
                    {translate({ ro: "Paleta", en: "Color Palette" })}
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg" style={{ background: TEAL }} />
                      <div>
                        <p className="text-sm font-semibold text-[#0A4046]">Teal</p>
                        <p className="text-xs text-gray-600">#0A4046 — primary</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg" style={{ background: ORANGE }} />
                      <div>
                        <p className="text-sm font-semibold text-[#0A4046]">Orange</p>
                        <p className="text-xs text-gray-600">#f97316 — accent</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-[#f97316]/10 rounded-2xl border border-[#f97316]/20">
                  <h5 className="font-semibold text-[#0A4046] mb-3 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-[#f97316]" />
                    {translate({ ro: "Hartă", en: "Map" })}
                  </h5>
                  <p className="text-sm text-gray-600">
                    ComposableMap din react-simple-maps. 14 țări: Chile, Spania, Franța, Elveția, Italia, etc.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      title: translate({ ro: "Structura Site-ului", en: "Site Structure" }),
      content: (
        <Card className="border-[#0A4046]/20 bg-gradient-to-br from-white to-slate-50">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-[#0A4046] mb-4">{translate({ ro: "Rute", en: "Routes" })}</h4>
                <p className="text-gray-600 mb-6">
                  {translate({
                    ro: "/ — single-page (Hero, Projects, About, Services, Contact). /country/:country — 14 pagini țară cu hartă interactivă și galerie proiecte.",
                    en: "/ — single-page (Hero, Projects, About, Services, Contact). /country/:country — 14 country pages with interactive map and project gallery.",
                  })}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { page: "Home", desc: translate({ ro: "Hero, proiecte, despre", en: "Hero, projects, about" }), icon: <MapPin className="h-4 w-4" /> },
                    { page: "Services", desc: translate({ ro: "Servicii companie", en: "Company services" }), icon: <Star className="h-4 w-4" /> },
                    { page: "Contact", desc: translate({ ro: "Contact", en: "Contact" }), icon: <Download className="h-4 w-4" /> },
                    { page: "Country", desc: "14 țări, hartă, galerie", icon: <MapPin className="h-4 w-4" /> },
                  ].map((item, i) => (
                    <div key={i} className="p-3 bg-white border border-[#0A4046]/20 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-[#0A4046]">{item.icon}</div>
                        <h5 className="font-semibold text-[#0A4046] text-sm">{item.page}</h5>
                      </div>
                      <p className="text-xs text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 bg-[#0A4046]/10 rounded-2xl border border-[#0A4046]/20">
                  <h5 className="font-semibold text-[#0A4046] mb-3">{translate({ ro: "Features", en: "Features" })}</h5>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2"><span className="text-[#0A4046]">•</span> Hartă mondială interactivă — click pe țări</li>
                    <li className="flex items-start gap-2"><span className="text-[#0A4046]">•</span> Stats: 14 țări, 500+ proiecte, 10+ ani</li>
                    <li className="flex items-start gap-2"><span className="text-[#0A4046]">•</span> Mobile dropdown pentru selecție țară</li>
                    <li className="flex items-start gap-2"><span className="text-[#0A4046]">•</span> Date centralizate: iso, coordonate, steaguri</li>
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
        <Card className="border-[#0A4046]/20 bg-gradient-to-br from-white to-slate-50">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-[#0A4046]/10 rounded-2xl border border-[#0A4046]/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#0A4046]/20 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-[#0A4046]" />
                  </div>
                  <h5 className="font-semibold text-[#0A4046] text-lg">{translate({ ro: "Construcții Industriale", en: "Industrial Construction" })}</h5>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {translate({
                    ro: "Site corporate pentru Termotal TM — instalații, întreținere, lucrări metalice. Single-page + 14 pagini țară cu hartă interactivă și galerie proiecte.",
                    en: "Corporate site for Termotal TM — installation, maintenance, metalwork. Single-page + 14 country pages with interactive map and project gallery.",
                  })}
                </p>
              </div>
              <div className="p-6 bg-[#f97316]/10 rounded-2xl border border-[#f97316]/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#f97316]/20 flex items-center justify-center">
                    <Star className="h-6 w-6 text-[#f97316]" />
                  </div>
                  <h5 className="font-semibold text-[#0A4046] text-lg">{translate({ ro: "Design", en: "Design" })}</h5>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {translate({
                    ro: "Teal/cyan primary, orange accent. Hero dark gradient, pagini țară light gradient. Mobile-first, gradient-based hierarchy.",
                    en: "Teal/cyan primary, orange accent. Hero dark gradient, country pages light gradient. Mobile-first, gradient-based hierarchy.",
                  })}
                </p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-[#0A4046]/20 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A4046]/10 rounded-full text-[#0A4046] font-semibold">
                <Star className="h-4 w-4" />
                {translate({ ro: "În curând", en: "Coming Soon" })}
              </div>
            </div>
          </CardContent>
        </Card>
      ),
    },
  ]
}

export function TermotalPage() {
  const { translate } = useLanguage()
  const timelineData = makeTimelineData(translate)

  return (
    <div className="relative" style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "Inter, sans-serif" }}>
  <div className="fixed inset-0 -z-10" style={{ background: '#f8fafc', minHeight: '100%' }}></div>
      <div className="container-custom py-20 pt-32">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <Link to="/portfolio">
            <Button variant="ghost" size="sm" className="gap-2 text-[#0A4046] hover:bg-[#0A4046]/10">
              <ArrowLeft className="h-4 w-4" />
              {translate({ ro: "Înapoi la portofoliu", en: "Back to portfolio" })}
            </Button>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-bold text-[#0A4046] mb-6">Termotal TM</h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            {translate({
              ro: "Construcții industriale • React 18 + Hartă • Single-page + 14 țări",
              en: "Industrial construction • React 18 + Map • Single-page + 14 countries",
            })}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <span className="px-4 py-2 bg-[#0A4046]/20 text-[#0A4046] rounded-full text-sm font-medium">React 18</span>
            <span className="px-4 py-2 bg-[#f97316]/20 text-[#f97316] rounded-full text-sm font-medium">react-simple-maps</span>
            <span className="px-4 py-2 bg-[#0A4046]/20 text-[#0A4046] rounded-full text-sm font-medium">{translate({ ro: "În curând", en: "Coming Soon" })}</span>
          </div>
        </motion.div>

        <Timeline
          data={timelineData}
          title={translate({ ro: "Journey Termotal TM", en: "Termotal TM Journey" })}
          subtitle={translate({
            ro: "De la concept la site corporate — hartă interactivă, 14 țări.",
            en: "From concept to corporate site — interactive map, 14 countries.",
          })}
        />

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mt-12">
          <Card className="rounded-3xl p-8 md:p-12 max-w-2xl mx-auto bg-white border-[#0A4046]/30">
            <h2 className="text-3xl font-bold text-[#0A4046] mb-4">{translate({ ro: "Vrei ceva similar?", en: "Want something similar?" })}</h2>
            <p className="text-gray-600 mb-8">{translate({ ro: "Hai să discutăm despre următorul tău proiect.", en: "Let's talk about your next project." })}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-[#0A4046] hover:bg-[#0d9488] text-white">
                  {translate({ ro: "Începe un proiect", en: "Start a project" })}
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button size="lg" variant="outline" className="border-[#0A4046] text-[#0A4046] hover:bg-[#0A4046]/10">
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
