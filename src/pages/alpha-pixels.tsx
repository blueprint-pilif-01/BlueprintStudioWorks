import { motion } from "framer-motion"
import { ArrowLeft, Star, Download, Layers, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Timeline, type TimelineEntry } from "@/components/ui/timeline"
import { Link } from "react-router-dom"
import { useLanguage } from "@/contexts/language-context"

function makeTimelineData(translate: (t: { ro: string; en: string }) => string): TimelineEntry[] {
  return [
    {
      title: translate({ ro: "Overview", en: "Overview" }),
      content: (
        <Card className="border-[#18181b]/30 bg-gradient-to-br from-white to-gray-50">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-[#18181b] mb-4">Alpha Pixels</h4>
                <p className="text-gray-600 mb-6">
                  {translate({
                    ro: "Site de marketing pentru companie de producție media: video, fotografie, animații 3D, evenimente private, social media. Design monochrome modern cu font variabil Roboto Flex și efect PixelBlast în hero.",
                    en: "Marketing site for media production company: video, photography, 3D animations, private events, social media. Modern monochrome design with variable font Roboto Flex and PixelBlast hero effect.",
                  })}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-[#18181b]/5 rounded-xl border border-[#18181b]/20">
                    <h5 className="font-semibold text-[#18181b] mb-2 text-sm">{translate({ ro: "Pagini", en: "Pages" })}</h5>
                    <p className="text-xs text-gray-600">5 pagini</p>
                  </div>
                  <div className="p-4 bg-[#18181b]/5 rounded-xl border border-[#18181b]/20">
                    <h5 className="font-semibold text-[#18181b] mb-2 text-sm">Design</h5>
                    <p className="text-xs text-gray-600">Monochrome, monospace</p>
                  </div>
                </div>
                <div className="p-4 bg-[#18181b]/5 rounded-xl border border-[#18181b]/20">
                  <h5 className="font-semibold text-[#18181b] mb-3">Tech Stack</h5>
                  <div className="flex flex-wrap gap-2">
                    {["React 19", "TypeScript", "Vite 7", "Tailwind", "Motion", "Three.js", "Postprocessing"].map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 bg-[#18181b]/10 text-[#18181b] rounded-full font-medium">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 bg-[#18181b]/5 rounded-2xl border border-[#18181b]/20">
                  <h5 className="font-semibold text-[#18181b] mb-3 flex items-center gap-2">
                    <Download className="h-5 w-5 text-[#18181b]" />
                    {translate({ ro: "Paleta", en: "Color Palette" })}
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-[#18181b]" />
                      <div>
                        <p className="text-sm font-semibold text-[#18181b]">Gray-900</p>
                        <p className="text-xs text-gray-600">#18181b — primary</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-white border border-gray-200" />
                      <div>
                        <p className="text-sm font-semibold text-[#18181b]">White</p>
                        <p className="text-xs text-gray-600">Background light</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-[#18181b]/5 rounded-2xl border border-[#18181b]/20">
                  <h5 className="font-semibold text-[#18181b] mb-3 flex items-center gap-2">
                    <Star className="h-5 w-5 text-[#18181b]" />
                    {translate({ ro: "Tipografie", en: "Typography" })}
                  </h5>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Space Mono / JetBrains Mono (body)</li>
                    <li>• Roboto Flex (variable, hero)</li>
                    <li>• VariableProximity — weight by cursor distance</li>
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
        <Card className="border-[#18181b]/30 bg-gradient-to-br from-white to-gray-50">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-[#18181b] mb-4">5 Pagini</h4>
                <p className="text-gray-600 mb-6">
                  {translate({
                    ro: "Home, Servicii, Portofoliu, Despre, Contact. Header fix pill-style cu shadow la scroll, mobile slide-down nav.",
                    en: "Home, Services, Portfolio, About, Contact. Fixed pill-style header with scroll shadow, mobile slide-down nav.",
                  })}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { page: "Home", desc: translate({ ro: "PixelBlast hero, VariableProximity", en: "PixelBlast hero, VariableProximity" }), icon: <Zap className="h-4 w-4" /> },
                    { page: "Servicii", desc: translate({ ro: "Video, foto, 3D, evenimente", en: "Video, photo, 3D, events" }), icon: <Layers className="h-4 w-4" /> },
                    { page: "Portofoliu", desc: translate({ ro: "Showcase proiecte", en: "Project showcase" }), icon: <Star className="h-4 w-4" /> },
                    { page: "Despre", desc: translate({ ro: "Compania", en: "The company" }), icon: <Download className="h-4 w-4" /> },
                    { page: "Contact", desc: translate({ ro: "Formular contact", en: "Contact form" }), icon: <Layers className="h-4 w-4" /> },
                  ].map((item, i) => (
                    <div key={i} className="p-3 bg-white border border-[#18181b]/20 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-[#18181b]">{item.icon}</div>
                        <h5 className="font-semibold text-[#18181b] text-sm">{item.page}</h5>
                      </div>
                      <p className="text-xs text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 bg-[#18181b]/5 rounded-2xl border border-[#18181b]/20">
                  <h5 className="font-semibold text-[#18181b] mb-3">{translate({ ro: "Efecte Speciale", en: "Special Effects" })}</h5>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2"><span className="text-[#18181b]">•</span> PixelBlast — Three.js + Postprocessing pixel grid cu ripples, mouse/touch</li>
                    <li className="flex items-start gap-2"><span className="text-[#18181b]">•</span> VariableProximity — Roboto Flex weight/optical size by cursor distance</li>
                    <li className="flex items-start gap-2"><span className="text-[#18181b]">•</span> PageTransition — Layout-based route transitions</li>
                    <li className="flex items-start gap-2"><span className="text-[#18181b]">•</span> ScrollToTop / ScrollToTopButton</li>
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
        <Card className="border-[#18181b]/30 bg-gradient-to-br from-white to-gray-50">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-[#18181b]/5 rounded-2xl border border-[#18181b]/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#18181b]/10 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-[#18181b]" />
                  </div>
                  <h5 className="font-semibold text-[#18181b] text-lg">{translate({ ro: "Design Language", en: "Design Language" })}</h5>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {translate({
                    ro: "Monochrome modern, monospace typography, PixelBlast hero interactiv, font variabil pentru headline-uri, dark mode support.",
                    en: "Modern monochrome, monospace typography, interactive PixelBlast hero, variable font for headlines, dark mode support.",
                  })}
                </p>
              </div>
              <div className="p-6 bg-[#18181b]/5 rounded-2xl border border-[#18181b]/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#18181b]/10 flex items-center justify-center">
                    <Star className="h-6 w-6 text-[#18181b]" />
                  </div>
                  <h5 className="font-semibold text-[#18181b] text-lg">{translate({ ro: "Servicii Prezentate", en: "Services Highlighted" })}</h5>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Video Production, Photography, 3D Animations, Private Events Films, Social Media Management.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-[#18181b]/20 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#18181b]/10 rounded-full text-[#18181b] font-semibold">
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

export function AlphaPixelsPage() {
  const { translate } = useLanguage()
  const timelineData = makeTimelineData(translate)

  return (
    <div className="relative" style={{ minHeight: '100vh', background: '#ffffff', fontFamily: "Inter, sans-serif" }}>
  <div className="fixed inset-0 -z-10" style={{ background: '#ffffff', minHeight: '100%' }}></div>
      <div className="container-custom py-20 pt-32">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <Link to="/portfolio">
            <Button variant="ghost" size="sm" className="gap-2 text-[#18181b] hover:bg-[#18181b]/10">
              <ArrowLeft className="h-4 w-4" />
              {translate({ ro: "Înapoi la portofoliu", en: "Back to portfolio" })}
            </Button>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-bold text-[#18181b] mb-6">Alpha Pixels</h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            {translate({
              ro: "Companie producție media • React 19 + Three.js • Design monochrome cu PixelBlast",
              en: "Media production company • React 19 + Three.js • Monochrome design with PixelBlast",
            })}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <span className="px-4 py-2 bg-[#18181b]/10 text-[#18181b] rounded-full text-sm font-medium">React 19</span>
            <span className="px-4 py-2 bg-[#18181b]/10 text-[#18181b] rounded-full text-sm font-medium">Three.js</span>
            <span className="px-4 py-2 bg-[#18181b]/10 text-[#18181b] rounded-full text-sm font-medium">{translate({ ro: "În curând", en: "Coming Soon" })}</span>
          </div>
        </motion.div>

        <Timeline
          data={timelineData}
          title={translate({ ro: "Journey Alpha Pixels", en: "Alpha Pixels Journey" })}
          subtitle={translate({
            ro: "De la concept la site media production — pixel grid interactiv și font variabil.",
            en: "From concept to media production site — interactive pixel grid and variable font.",
          })}
        />

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mt-12">
          <Card className="rounded-3xl p-8 md:p-12 max-w-2xl mx-auto bg-gray-50 border-[#18181b]/20">
            <h2 className="text-3xl font-bold text-[#18181b] mb-4">{translate({ ro: "Vrei ceva similar?", en: "Want something similar?" })}</h2>
            <p className="text-gray-600 mb-8">{translate({ ro: "Hai să discutăm despre următorul tău proiect.", en: "Let's talk about your next project." })}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-[#18181b] hover:bg-[#27272a] text-white">
                  {translate({ ro: "Începe un proiect", en: "Start a project" })}
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button size="lg" variant="outline" className="border-[#18181b] text-[#18181b] hover:bg-[#18181b]/10">
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
