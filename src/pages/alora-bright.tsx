import { motion } from "framer-motion"
import { ArrowLeft, Star, Download, Zap, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Timeline, type TimelineEntry } from "@/components/ui/timeline"
import { Link } from "react-router-dom"
import { useLanguage } from "@/contexts/language-context"

const GOLD = "#D4AF37"
const BLACK = "#0A0A0A"

function makeTimelineData(translate: (t: { ro: string; en: string }) => string): TimelineEntry[] {
  return [
    {
      title: translate({ ro: "Overview", en: "Overview" }),
      content: (
        <Card className="border-[#D4AF37]/20 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A]">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">Alora Bright</h4>
                <p className="text-gray-300 mb-6">
                  {translate({
                    ro: "Site de marketing pentru salon de epilare definitivă permanentă, prezentând tehnologia Altesse Nanolaser Trilogy. Design luxos cu fundal Three.js (LightPillar), overlay de particule gold și sistem de programare multi-step.",
                    en: "Marketing site for a permanent laser hair removal salon, showcasing Altesse Nanolaser Trilogy technology. Luxury design with Three.js background (LightPillar), gold particle overlay, and multi-step booking system.",
                  })}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-[#D4AF37]/10 rounded-xl border border-[#D4AF37]/20">
                    <h5 className="font-semibold text-[#D4AF37] mb-2 text-sm">{translate({ ro: "Pagini", en: "Pages" })}</h5>
                    <p className="text-xs text-gray-400">4 pagini complete</p>
                  </div>
                  <div className="p-4 bg-[#D4AF37]/10 rounded-xl border border-[#D4AF37]/20">
                    <h5 className="font-semibold text-[#D4AF37] mb-2 text-sm">Design</h5>
                    <p className="text-xs text-gray-400">Gold & Black, luxury</p>
                  </div>
                </div>
                <div className="p-4 bg-[#0A0A0A] rounded-xl border border-[#D4AF37]/20">
                  <h5 className="font-semibold text-[#D4AF37] mb-3">Tech Stack</h5>
                  <div className="flex flex-wrap gap-2">
                    {["React 19", "TypeScript", "Vite 7", "Tailwind 4", "Radix UI", "Framer Motion", "Three.js"].map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full font-medium">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 bg-[#D4AF37]/5 rounded-2xl border border-[#D4AF37]/20">
                  <h5 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Download className="h-5 w-5 text-[#D4AF37]" />
                    {translate({ ro: "Paleta", en: "Color Palette" })}
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg" style={{ background: GOLD }} />
                      <div>
                        <p className="text-sm font-semibold text-white">Gold</p>
                        <p className="text-xs text-gray-400">#D4AF37, {translate({ ro: "accent principal", en: "primary accent" })}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg" style={{ background: BLACK }} />
                      <div>
                        <p className="text-sm font-semibold text-white">Black</p>
                        <p className="text-xs text-gray-400">#0A0A0A, {translate({ ro: "fundal", en: "background" })}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-[#D4AF37]/5 rounded-2xl border border-[#D4AF37]/20">
                  <h5 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Star className="h-5 w-5 text-[#D4AF37]" />
                    {translate({ ro: "Tipografie", en: "Typography" })}
                  </h5>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li>• Playfair Display (serif)</li>
                    <li>• Inter (sans)</li>
                    <li>• Great Vibes (script logo)</li>
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
        <Card className="border-[#D4AF37]/20 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A]">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">4 Pagini</h4>
                <p className="text-gray-300 mb-6">
                  {translate({
                    ro: "Home cu intro animation (sessionStorage), Despre (3 lungimi de undă), Prețuri (liste servicii), Programare (multi-step: servicii → detalii → confirmare).",
                    en: "Home with intro animation (sessionStorage), About (3 wavelengths), Pricing (service lists), Booking (multi-step: services → details → confirmation).",
                  })}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { page: "Home", desc: translate({ ro: "Hero, LightPillar, GlitterOverlay", en: "Hero, LightPillar, GlitterOverlay" }), icon: <Camera className="h-4 w-4" /> },
                    { page: "Despre", desc: translate({ ro: "Tehnologie 3 lungimi", en: "3 wavelength tech" }), icon: <Zap className="h-4 w-4" /> },
                    { page: "Prețuri", desc: translate({ ro: "Face, corp, pachete", en: "Face, body, packages" }), icon: <Star className="h-4 w-4" /> },
                    { page: "Programare", desc: translate({ ro: "Multi-step booking", en: "Multi-step booking" }), icon: <Download className="h-4 w-4" /> },
                  ].map((item, i) => (
                    <div key={i} className="p-3 bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-[#D4AF37]">{item.icon}</div>
                        <h5 className="font-semibold text-white text-sm">{item.page}</h5>
                      </div>
                      <p className="text-xs text-gray-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 bg-[#D4AF37]/5 rounded-2xl border border-[#D4AF37]/20">
                  <h5 className="font-semibold text-white mb-3">{translate({ ro: "Efecte Speciale", en: "Special Effects" })}</h5>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li className="flex items-start gap-2"><span className="text-[#D4AF37]">•</span> LightPillar, Three.js gradient pillar background</li>
                    <li className="flex items-start gap-2"><span className="text-[#D4AF37]">•</span> GlitterOverlay, Gold particle overlay</li>
                    <li className="flex items-start gap-2"><span className="text-[#D4AF37]">•</span> Page transitions, Framer Motion AnimatePresence</li>
                    <li className="flex items-start gap-2"><span className="text-[#D4AF37]">•</span> Scroll animations, whileInView for sections</li>
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
        <Card className="border-[#D4AF37]/20 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A]">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-[#D4AF37]" />
                  </div>
                  <h5 className="font-semibold text-white text-lg">{translate({ ro: "Design Language", en: "Design Language" })}</h5>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {translate({
                    ro: "Paletă gold & black, intro animation unică, glass cards, gold gradient text, LightPillar 3D și GlitterOverlay pentru impact vizual imediat.",
                    en: "Gold & black palette, one-time intro animation, glass cards, gold gradient text, LightPillar 3D and GlitterOverlay for instant visual impact.",
                  })}
                </p>
              </div>
              <div className="p-6 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                    <Star className="h-6 w-6 text-[#D4AF37]" />
                  </div>
                  <h5 className="font-semibold text-white text-lg">{translate({ ro: "Features", en: "Features" })}</h5>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {translate({
                    ro: "Multi-step booking (servicii, cantități, detalii client, dată/oră, confirmare), Radix UI pentru form elements, responsive mobile-first.",
                    en: "Multi-step booking (services, quantity, client details, date/time, confirmation), Radix UI for form elements, mobile-first responsive.",
                  })}
                </p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-[#D4AF37]/20 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/20 rounded-full text-[#D4AF37] font-semibold">
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

export function AloraBrightPage() {
  const { translate } = useLanguage()
  const timelineData = makeTimelineData(translate)

  return (
<div className="relative" style={{ minHeight: '100vh', background: "linear-gradient(to bottom, #0A0A0A, #1A1A1A)", fontFamily: "Inter, sans-serif" }}>
  <div className="fixed inset-0 -z-10" style={{ background: "linear-gradient(to bottom, #0A0A0A, #1A1A1A)", minHeight: '100%' }}></div>
  <div className="container-custom py-20 pt-32">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <Link to="/portfolio">
            <Button variant="ghost" size="sm" className="gap-2 text-[#D4AF37] hover:text-white hover:bg-[#D4AF37]/10">
              <ArrowLeft className="h-4 w-4" />
              {translate({ ro: "Înapoi la portofoliu", en: "Back to portfolio" })}
            </Button>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-bold text-[#D4AF37] mb-6">Alora Bright</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            {translate({
              ro: "Salon epilare definitivă • React 19 + Three.js • Design gold & black luxos",
              en: "Laser hair removal salon • React 19 + Three.js • Luxury gold & black design",
            })}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <span className="px-4 py-2 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full text-sm font-medium">React 19</span>
            <span className="px-4 py-2 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full text-sm font-medium">Three.js</span>
            <span className="px-4 py-2 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full text-sm font-medium">{translate({ ro: "În curând", en: "Coming Soon" })}</span>
          </div>
        </motion.div>

        <Timeline
          data={timelineData}
          title={translate({ ro: "Journey Alora Bright", en: "Alora Bright Journey" })}
          subtitle={translate({
            ro: "De la concept la site premium, tehnologie laser și design luxos.",
            en: "From concept to premium site, laser technology and luxury design.",
          })}
        />

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mt-12">
          <Card className="rounded-3xl p-8 md:p-12 max-w-2xl mx-auto bg-[#D4AF37]/5 border-[#D4AF37]/30">
            <h2 className="text-3xl font-bold text-white mb-4">{translate({ ro: "Vrei ceva similar?", en: "Want something similar?" })}</h2>
            <p className="text-gray-400 mb-8">
              {translate({ ro: "Hai să discutăm despre următorul tău proiect.", en: "Let's talk about your next project." })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-[#D4AF37] hover:bg-[#B8860B] text-black">
                  {translate({ ro: "Începe un proiect", en: "Start a project" })}
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button size="lg" variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10">
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
