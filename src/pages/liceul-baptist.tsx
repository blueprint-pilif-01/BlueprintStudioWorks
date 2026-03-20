import { motion } from "framer-motion"
import { ArrowLeft, Star, Download, BookOpen, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Timeline, type TimelineEntry } from "@/components/ui/timeline"
import { Link } from "react-router-dom"
import { useLanguage } from "@/contexts/language-context"

const BLUE = "#1a3d5c"
const LIGHT = "#fafaf8"

function makeTimelineData(translate: (t: { ro: string; en: string }) => string): TimelineEntry[] {
  return [
    {
      title: translate({ ro: "Overview", en: "Overview" }),
      content: (
        <Card className="border-[#1a3d5c]/20 bg-gradient-to-br from-white to-[#eef2f6]">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-[#1a3d5c] mb-4">Liceul Teologic Baptist Timișoara</h4>
                <p className="text-gray-600 mb-6">
                  {translate({
                    ro: "Site pentru Liceul Teologic Baptist Timișoara și Olimpiada Națională de Religie. Prezintă evenimentul, regulament concurs, program, informații utile, parteneri, donații, contact.",
                    en: "Website for Baptist Theological High School Timișoara and National Religion Olympiad. Presents the event, contest rules, program, useful info, partners, donations, contact.",
                  })}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-[#1a3d5c]/10 rounded-xl border border-[#1a3d5c]/20">
                    <h5 className="font-semibold text-[#1a3d5c] mb-2 text-sm">{translate({ ro: "Pagini", en: "Pages" })}</h5>
                    <p className="text-xs text-gray-600">8 pagini</p>
                  </div>
                  <div className="p-4 bg-[#1a3d5c]/10 rounded-xl border border-[#1a3d5c]/20">
                    <h5 className="font-semibold text-[#1a3d5c] mb-2 text-sm">Design</h5>
                    <p className="text-xs text-gray-600">Blue & light</p>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[#1a3d5c]/20">
                  <h5 className="font-semibold text-[#1a3d5c] mb-3">Tech Stack</h5>
                  <div className="flex flex-wrap gap-2">
                    {["React 18", "TypeScript", "Vite 6", "Tailwind 4", "Motion", "Lenis", "next-themes"].map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 bg-[#1a3d5c]/20 text-[#1a3d5c] rounded-full font-medium">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 bg-[#1a3d5c]/10 rounded-2xl border border-[#1a3d5c]/20">
                  <h5 className="font-semibold text-[#1a3d5c] mb-3 flex items-center gap-2">
                    <Download className="h-5 w-5 text-[#1a3d5c]" />
                    {translate({ ro: "Paleta", en: "Color Palette" })}
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg" style={{ background: BLUE }} />
                      <div>
                        <p className="text-sm font-semibold text-[#1a3d5c]">Brand Blue</p>
                        <p className="text-xs text-gray-600">#1a3d5c — accent</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg" style={{ background: LIGHT }} />
                      <div>
                        <p className="text-sm font-semibold text-[#1a3d5c]">Cream</p>
                        <p className="text-xs text-gray-600">#fafaf8 — background</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-[#1a3d5c]/10 rounded-2xl border border-[#1a3d5c]/20">
                  <h5 className="font-semibold text-[#1a3d5c] mb-3 flex items-center gap-2">
                    <Star className="h-5 w-5 text-[#1a3d5c]" />
                    {translate({ ro: "Tipografie", en: "Typography" })}
                  </h5>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Playfair Display (serif)</li>
                    <li>• Inter (sans)</li>
                  </ul>
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
        <Card className="border-[#1a3d5c]/20 bg-gradient-to-br from-white to-[#eef2f6]">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-[#1a3d5c] mb-4">8 Pagini</h4>
                <p className="text-gray-600 mb-6">
                  {translate({
                    ro: "Home cu hero video, Concurs, Program, Informații utile, Legislație, Parteneri, Donații, Contact. Mobile hamburger, FAQ component.",
                    en: "Home with video hero, Contest, Program, Useful info, Legislation, Partners, Donations, Contact. Mobile hamburger, FAQ component.",
                  })}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { page: "Home", desc: translate({ ro: "Hero video, despre, FAQ", en: "Video hero, about, FAQ" }), icon: <BookOpen className="h-4 w-4" /> },
                    { page: "Concurs", desc: translate({ ro: "Detalii concurs", en: "Contest details" }), icon: <Star className="h-4 w-4" /> },
                    { page: "Program", desc: translate({ ro: "Program eveniment", en: "Event program" }), icon: <Download className="h-4 w-4" /> },
                    { page: "Donatii", desc: translate({ ro: "Donații", en: "Donations" }), icon: <Star className="h-4 w-4" /> },
                    { page: "Contact", desc: translate({ ro: "Contact", en: "Contact" }), icon: <Download className="h-4 w-4" /> },
                  ].map((item, i) => (
                    <div key={i} className="p-3 bg-white border border-[#1a3d5c]/20 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-[#1a3d5c]">{item.icon}</div>
                        <h5 className="font-semibold text-[#1a3d5c] text-sm">{item.page}</h5>
                      </div>
                      <p className="text-xs text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 bg-[#1a3d5c]/10 rounded-2xl border border-[#1a3d5c]/20">
                  <h5 className="font-semibold text-[#1a3d5c] mb-3">{translate({ ro: "Features", en: "Features" })}</h5>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2"><span className="text-[#1a3d5c]">•</span> Hero cu video full-viewport (desktop/mobile)</li>
                    <li className="flex items-start gap-2"><span className="text-[#1a3d5c]">•</span> Smooth scrolling (Lenis)</li>
                    <li className="flex items-start gap-2"><span className="text-[#1a3d5c]">•</span> Reduced motion support (ReducedMotionProvider)</li>
                    <li className="flex items-start gap-2"><span className="text-[#1a3d5c]">•</span> Skip-to-content pentru accesibilitate</li>
                    <li className="flex items-start gap-2"><span className="text-[#1a3d5c]">•</span> Buton donate în header și hero</li>
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
        <Card className="border-[#1a3d5c]/20 bg-gradient-to-br from-white to-[#eef2f6]">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-[#1a3d5c]/10 rounded-2xl border border-[#1a3d5c]/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#1a3d5c]/20 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-[#1a3d5c]" />
                  </div>
                  <h5 className="font-semibold text-[#1a3d5c] text-lg">{translate({ ro: "Olimpiada Națională", en: "National Olympiad" })}</h5>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {translate({
                    ro: "Site pentru Olimpiada Națională de Religie — concurs, program, legislație, parteneri, donații. Hero video, Lenis smooth scroll, accesibilitate.",
                    en: "Site for National Religion Olympiad — contest, program, legislation, partners, donations. Video hero, Lenis smooth scroll, accessibility.",
                  })}
                </p>
              </div>
              <div className="p-6 bg-[#1a3d5c]/10 rounded-2xl border border-[#1a3d5c]/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#1a3d5c]/20 flex items-center justify-center">
                    <Star className="h-6 w-6 text-[#1a3d5c]" />
                  </div>
                  <h5 className="font-semibold text-[#1a3d5c] text-lg">{translate({ ro: "Design", en: "Design" })}</h5>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {translate({
                    ro: "Paletă light cu accent blue, section layout max-w-6xl, motion whileInView pentru reveal, CSS vars pentru brand colors.",
                    en: "Light palette with blue accent, max-w-6xl section layout, motion whileInView for reveal, CSS vars for brand colors.",
                  })}
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t-2 border-[#1a3d5c]/20 text-center">
              <h2 className="font-bold mb-4 text-[#1a3d5c]" style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}>
                {translate({ ro: "Ești curios cum arată?", en: "Curious how it looks?" })}
              </h2>
              <a href="https://onr-ltbtm.ro" target="_blank" rel="noopener noreferrer" className="inline-flex">
                <Button size="lg" className="bg-[#1a3d5c] hover:bg-[#2d6ba8] text-white px-8 py-6">
                  <ExternalLink className="h-6 w-6 mr-2" />
                  Vizită onr-ltbtm.ro
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      ),
    },
  ]
}

export function LiceulBaptistPage() {
  const { translate } = useLanguage()
  const timelineData = makeTimelineData(translate)

  return (
    <div className="relative" style={{ minHeight: '100vh', background: '#fafaf8', fontFamily: "Inter, sans-serif" }}>
  <div className="fixed inset-0 -z-10" style={{ background: '#fafaf8', minHeight: '100%' }}></div>
      <div className="container-custom py-20 pt-32">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <Link to="/portfolio">
            <Button variant="ghost" size="sm" className="gap-2 text-[#1a3d5c] hover:bg-[#1a3d5c]/10">
              <ArrowLeft className="h-4 w-4" />
              {translate({ ro: "Înapoi la portofoliu", en: "Back to portfolio" })}
            </Button>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold text-[#1a3d5c] mb-6" style={{ lineHeight: 1.2 }}>
            Liceul Baptist Timișoara
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            {translate({
              ro: "Olimpiada Națională de Religie • React 18 + Lenis • Hero video, smooth scroll",
              en: "National Religion Olympiad • React 18 + Lenis • Video hero, smooth scroll",
            })}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <span className="px-4 py-2 bg-[#1a3d5c]/20 text-[#1a3d5c] rounded-full text-sm font-medium">React 18</span>
            <span className="px-4 py-2 bg-[#1a3d5c]/20 text-[#1a3d5c] rounded-full text-sm font-medium">Lenis</span>
            <span className="px-4 py-2 bg-[#1a3d5c]/20 text-[#1a3d5c] rounded-full text-sm font-medium">onr-ltbtm.ro</span>
          </div>
        </motion.div>

        <Timeline
          data={timelineData}
          title={translate({ ro: "Journey Liceul Baptist", en: "Liceul Baptist Journey" })}
          subtitle={translate({
            ro: "De la concept la site olimpiadă — video hero, accesibilitate.",
            en: "From concept to Olympiad site — video hero, accessibility.",
          })}
        />

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mt-12">
          <Card className="rounded-3xl p-8 md:p-12 max-w-2xl mx-auto bg-white border-[#1a3d5c]/30">
            <h2 className="text-3xl font-bold text-[#1a3d5c] mb-4">{translate({ ro: "Vrei ceva similar?", en: "Want something similar?" })}</h2>
            <p className="text-gray-600 mb-8">{translate({ ro: "Hai să discutăm despre următorul tău proiect.", en: "Let's talk about your next project." })}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-[#1a3d5c] hover:bg-[#2d6ba8] text-white">
                  {translate({ ro: "Începe un proiect", en: "Start a project" })}
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button size="lg" variant="outline" className="border-[#1a3d5c] text-[#1a3d5c] hover:bg-[#1a3d5c]/10">
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
