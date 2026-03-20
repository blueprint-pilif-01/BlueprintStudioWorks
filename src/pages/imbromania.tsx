import { motion } from "framer-motion"
import { ArrowLeft, Star, Download, Globe, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Timeline, type TimelineEntry } from "@/components/ui/timeline"
import { Link } from "react-router-dom"
import { useLanguage } from "@/contexts/language-context"

const ROSE = "#dc2626"
const DARK = "#0a0a0a"

function makeTimelineData(translate: (t: { ro: string; en: string }) => string): TimelineEntry[] {
  return [
    {
      title: translate({ ro: "Overview", en: "Overview" }),
      content: (
        <Card className="border-[#dc2626]/20 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">Istituto di Moda Burgo Romania</h4>
                <p className="text-gray-300 mb-6">
                  {translate({
                    ro: "Site pentru școală de design de modă din România. Multilingv (i18next), video hero full-screen, aurora background animat, glassmorphism, SEO cu react-helmet-async.",
                    en: "Website for fashion design school in Romania. Multilingual (i18next), full-screen video hero, animated aurora background, glassmorphism, SEO with react-helmet-async.",
                  })}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-[#dc2626]/10 rounded-xl border border-[#dc2626]/20">
                    <h5 className="font-semibold text-[#dc2626] mb-2 text-sm">{translate({ ro: "Pagini", en: "Pages" })}</h5>
                    <p className="text-xs text-gray-400">11 pagini</p>
                  </div>
                  <div className="p-4 bg-[#dc2626]/10 rounded-xl border border-[#dc2626]/20">
                    <h5 className="font-semibold text-[#dc2626] mb-2 text-sm">i18n</h5>
                    <p className="text-xs text-gray-400">Multilingv</p>
                  </div>
                </div>
                <div className="p-4 bg-[#0a0a0a] rounded-xl border border-[#dc2626]/20">
                  <h5 className="font-semibold text-[#dc2626] mb-3">Tech Stack</h5>
                  <div className="flex flex-wrap gap-2">
                    {["React 18", "TypeScript", "Vite 5", "Tailwind", "Framer Motion", "i18next", "react-helmet-async"].map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 bg-[#dc2626]/20 text-[#dc2626] rounded-full font-medium">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 bg-[#dc2626]/5 rounded-2xl border border-[#dc2626]/20">
                  <h5 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Download className="h-5 w-5 text-[#dc2626]" />
                    {translate({ ro: "Paleta", en: "Color Palette" })}
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg" style={{ background: ROSE }} />
                      <div>
                        <p className="text-sm font-semibold text-white">Rose / Red</p>
                        <p className="text-xs text-gray-400">#dc2626 — accent</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg" style={{ background: DARK }} />
                      <div>
                        <p className="text-sm font-semibold text-white">Dark</p>
                        <p className="text-xs text-gray-400">#0a0a0a — background</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-[#dc2626]/5 rounded-2xl border border-[#dc2626]/20">
                  <h5 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-[#dc2626]" />
                    {translate({ ro: "i18n", en: "i18n" })}
                  </h5>
                  <p className="text-sm text-gray-400">
                    i18next, react-i18next, i18next-browser-languagedetector. Limba detectată automat.
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
        <Card className="border-[#dc2626]/20 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">11 Pagini</h4>
                <p className="text-gray-300 mb-6">
                  {translate({
                    ro: "Home, Despre, Cursuri anuale, Cursuri scurte, Istorie, Metodologie, IMB în lume, Peste motive, Evenimente, Info (contact), Politică confidențialitate. Layout shared cu nested routes.",
                    en: "Home, About, Annual courses, Short courses, History, Methodology, IMB worldwide, Reasons, Events, Info (contact), Privacy policy. Shared layout with nested routes.",
                  })}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { page: "Home", desc: translate({ ro: "Video hero, despre, cursuri", en: "Video hero, about, courses" }), icon: <Star className="h-4 w-4" /> },
                    { page: "Cursuri", desc: translate({ ro: "Anuale, scurte", en: "Annual, short" }), icon: <Download className="h-4 w-4" /> },
                    { page: "Evenimente", desc: translate({ ro: "Agenda evenimente", en: "Events agenda" }), icon: <Globe className="h-4 w-4" /> },
                    { page: "Info", desc: translate({ ro: "Contact", en: "Contact" }), icon: <Globe className="h-4 w-4" /> },
                  ].map((item, i) => (
                    <div key={i} className="p-3 bg-[#0a0a0a] border border-[#dc2626]/20 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-[#dc2626]">{item.icon}</div>
                        <h5 className="font-semibold text-white text-sm">{item.page}</h5>
                      </div>
                      <p className="text-xs text-gray-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 bg-[#dc2626]/5 rounded-2xl border border-[#dc2626]/20">
                  <h5 className="font-semibold text-white mb-3">{translate({ ro: "Features", en: "Features" })}</h5>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li className="flex items-start gap-2"><span className="text-[#dc2626]">•</span> Video hero full-screen</li>
                    <li className="flex items-start gap-2"><span className="text-[#dc2626]">•</span> Aurora background animat</li>
                    <li className="flex items-start gap-2"><span className="text-[#dc2626]">•</span> Page transitions (Framer Motion + AnimatePresence)</li>
                    <li className="flex items-start gap-2"><span className="text-[#dc2626]">•</span> GlassCard, Section, SectionHeader</li>
                    <li className="flex items-start gap-2"><span className="text-[#dc2626]">•</span> SEO component, meta tags</li>
                    <li className="flex items-start gap-2"><span className="text-[#dc2626]">•</span> Conditional layout (fără nav/footer pe Events)</li>
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
        <Card className="border-[#dc2626]/20 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-[#dc2626]/10 rounded-2xl border border-[#dc2626]/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#dc2626]/20 flex items-center justify-center">
                    <Globe className="h-6 w-6 text-[#dc2626]" />
                  </div>
                  <h5 className="font-semibold text-white text-lg">{translate({ ro: "Școală de Modă", en: "Fashion School" })}</h5>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {translate({
                    ro: "Site pentru Istituto di Moda Burgo Romania — școală de design de modă Milano. Multilingv, video hero, aurora background, glassmorphism, SEO.",
                    en: "Site for Istituto di Moda Burgo Romania — Milan fashion design school. Multilingual, video hero, aurora background, glassmorphism, SEO.",
                  })}
                </p>
              </div>
              <div className="p-6 bg-[#dc2626]/10 rounded-2xl border border-[#dc2626]/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#dc2626]/20 flex items-center justify-center">
                    <Star className="h-6 w-6 text-[#dc2626]" />
                  </div>
                  <h5 className="font-semibold text-white text-lg">{translate({ ro: "Design", en: "Design" })}</h5>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {translate({
                    ro: "Dark cu accente rose, cards cu gradient, scrollbar red gradient. Nested routing, Layout shared.",
                    en: "Dark with rose accents, gradient cards, red gradient scrollbar. Nested routing, shared Layout.",
                  })}
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t-2 border-[#dc2626]/20 text-center">
              <h2 className="font-bold mb-4 text-white" style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}>
                {translate({ ro: "Ești curios cum arată?", en: "Curious how it looks?" })}
              </h2>
              <a href="https://imbromania.com" target="_blank" rel="noopener noreferrer" className="inline-flex">
                <Button size="lg" className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-8 py-6">
                  <ExternalLink className="h-6 w-6 mr-2" />
                  Vizită imbromania.com
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      ),
    },
  ]
}

export function ImbromaniaPage() {
  const { translate } = useLanguage()
  const timelineData = makeTimelineData(translate)

  return (
    <div className="relative" style={{ minHeight: '100vh', background: "linear-gradient(to bottom, #0a0a0a, #1a1a1a)", fontFamily: "Inter, sans-serif" }}>
  <div className="fixed inset-0 -z-10" style={{ background: "linear-gradient(to bottom, #0a0a0a, #1a1a1a)", minHeight: '100%' }}></div>
      <div className="container-custom py-20 pt-32">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <Link to="/portfolio">
            <Button variant="ghost" size="sm" className="gap-2 text-[#dc2626] hover:text-white hover:bg-[#dc2626]/10">
              <ArrowLeft className="h-4 w-4" />
              {translate({ ro: "Înapoi la portofoliu", en: "Back to portfolio" })}
            </Button>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6" style={{ lineHeight: 1.2 }}>
            Istituto di Moda Burgo Romania
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            {translate({
              ro: "Școală de modă Milano • React 18 + i18next • Multilingv, video hero, aurora",
              en: "Milan fashion school • React 18 + i18next • Multilingual, video hero, aurora",
            })}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <span className="px-4 py-2 bg-[#dc2626]/20 text-[#dc2626] rounded-full text-sm font-medium">React 18</span>
            <span className="px-4 py-2 bg-[#dc2626]/20 text-[#dc2626] rounded-full text-sm font-medium">i18next</span>
            <span className="px-4 py-2 bg-[#dc2626]/20 text-[#dc2626] rounded-full text-sm font-medium">imbromania.com</span>
          </div>
        </motion.div>

        <Timeline
          data={timelineData}
          title={translate({ ro: "Journey IMB Romania", en: "IMB Romania Journey" })}
          subtitle={translate({
            ro: "De la concept la site școală de modă — multilingv, video hero, SEO.",
            en: "From concept to fashion school site — multilingual, video hero, SEO.",
          })}
        />

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mt-12">
          <Card className="rounded-3xl p-8 md:p-12 max-w-2xl mx-auto bg-[#dc2626]/5 border-[#dc2626]/30">
            <h2 className="text-3xl font-bold text-white mb-4">{translate({ ro: "Vrei ceva similar?", en: "Want something similar?" })}</h2>
            <p className="text-gray-400 mb-8">{translate({ ro: "Hai să discutăm despre următorul tău proiect.", en: "Let's talk about your next project." })}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-[#dc2626] hover:bg-[#b91c1c] text-white">
                  {translate({ ro: "Începe un proiect", en: "Start a project" })}
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button size="lg" variant="outline" className="border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626]/10">
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
