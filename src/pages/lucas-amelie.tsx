import { motion } from "framer-motion"
import { ArrowLeft, Star, Download, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Timeline, type TimelineEntry } from "@/components/ui/timeline"
import { Link } from "react-router-dom"
import { useLanguage } from "@/contexts/language-context"

const PINK = "#FFB6C1"
const PURPLE = "#D8B4E2"

function makeTimelineData(translate: (t: { ro: string; en: string }) => string): TimelineEntry[] {
  return [
    {
      title: translate({ ro: "Overview", en: "Overview" }),
      content: (
        <Card className="border-[#FFB6C1]/30 bg-gradient-to-br from-[#FFF9FB] to-[#FDF5F9]">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-[#4A4A4A] mb-4">Lucas & Amélie</h4>
                <p className="text-[#8B7E7E] mb-6">
                  {translate({
                    ro: "Site de nuntă pentru Lucas & Amélie, 09.05.2026, Timișoara. Layout horizontal cu 7 secțiuni: Home, Schedule, Venue, Gallery, Timișoara info, Tips, RSVP. Intro animation, formular RSVP multi-step (Google Apps Script).",
                    en: "Wedding website for Lucas & Amélie, 09.05.2026, Timișoara. Horizontal layout with 7 sections: Home, Schedule, Venue, Gallery, Timișoara info, Tips, RSVP. Intro animation, multi-step RSVP form (Google Apps Script).",
                  })}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-[#FFB6C1]/20 rounded-xl border border-[#FFB6C1]/40">
                    <h5 className="font-semibold text-[#8B7E7E] mb-2 text-sm">{translate({ ro: "Secțiuni", en: "Sections" })}</h5>
                    <p className="text-xs text-[#8B7E7E]">7 secțiuni</p>
                  </div>
                  <div className="p-4 bg-[#D8B4E2]/20 rounded-xl border border-[#D8B4E2]/40">
                    <h5 className="font-semibold text-[#8B7E7E] mb-2 text-sm">Design</h5>
                    <p className="text-xs text-[#8B7E7E]">Pastel pink & purple</p>
                  </div>
                </div>
                <div className="p-4 bg-white/80 rounded-xl border border-[#FFB6C1]/40">
                  <h5 className="font-semibold text-[#4A4A4A] mb-3">Tech Stack</h5>
                  <div className="flex flex-wrap gap-2">
                    {["React 18", "Vite 5", "Framer Motion", "Anime.js", "Three.js", "R3F", "Leaflet"].map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 bg-[#FFB6C1]/30 text-[#8B7E7E] rounded-full font-medium">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 bg-[#FFB6C1]/20 rounded-2xl border border-[#FFB6C1]/40">
                  <h5 className="font-semibold text-[#4A4A4A] mb-3 flex items-center gap-2">
                    <Download className="h-5 w-5 text-[#FFB6C1]" />
                    {translate({ ro: "Paleta", en: "Color Palette" })}
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg" style={{ background: PINK }} />
                      <div>
                        <p className="text-sm font-semibold text-[#4A4A4A]">Pastel Pink</p>
                        <p className="text-xs text-[#8B7E7E]">#FFB6C1</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg" style={{ background: PURPLE }} />
                      <div>
                        <p className="text-sm font-semibold text-[#4A4A4A]">Pastel Purple</p>
                        <p className="text-xs text-[#8B7E7E]">#D8B4E2</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-[#D8B4E2]/20 rounded-2xl border border-[#D8B4E2]/40">
                  <h5 className="font-semibold text-[#4A4A4A] mb-3 flex items-center gap-2">
                    <Star className="h-5 w-5 text-[#D8B4E2]" />
                    {translate({ ro: "Tipografie", en: "Typography" })}
                  </h5>
                  <ul className="text-sm text-[#8B7E7E] space-y-2">
                    <li>• Playfair Display</li>
                    <li>• Cormorant Garamond</li>
                    <li>• Montserrat (body)</li>
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
        <Card className="border-[#FFB6C1]/30 bg-gradient-to-br from-[#FFF9FB] to-[#FDF5F9]">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-[#4A4A4A] mb-4">7 Secțiuni Orizontale</h4>
                <p className="text-[#8B7E7E] mb-6">
                  {translate({
                    ro: "Layout horizontal full-viewport cu translateX navigation. Fără React Router, custom event navigateToSection. Snap sections, swipe pe mobile. Glass navbar fix în partea de jos.",
                    en: "Horizontal full-viewport layout with translateX navigation. No React Router, custom navigateToSection event. Snap sections, swipe on mobile. Fixed glass navbar at bottom.",
                  })}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { page: "Home", desc: translate({ ro: "Logo, dată, locație", en: "Logo, date, location" }), icon: <Heart className="h-4 w-4" /> },
                    { page: "Schedule", desc: translate({ ro: "Program nuntă", en: "Wedding schedule" }), icon: <Star className="h-4 w-4" /> },
                    { page: "Venue", desc: translate({ ro: "Biserică, recepție, hartă", en: "Church, reception, map" }), icon: <Download className="h-4 w-4" /> },
                    { page: "Gallery", desc: translate({ ro: "Galerie foto", en: "Photo gallery" }), icon: <Heart className="h-4 w-4" /> },
                    { page: "Timișoara", desc: translate({ ro: "Info locală", en: "Local info" }), icon: <Star className="h-4 w-4" /> },
                    { page: "Tips", desc: translate({ ro: "Recomandări travel", en: "Travel tips" }), icon: <Download className="h-4 w-4" /> },
                    { page: "RSVP", desc: translate({ ro: "Form multi-step", en: "Multi-step form" }), icon: <Heart className="h-4 w-4" /> },
                  ].map((item, i) => (
                    <div key={i} className="p-3 bg-white/80 border border-[#FFB6C1]/40 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-[#FFB6C1]">{item.icon}</div>
                        <h5 className="font-semibold text-[#4A4A4A] text-sm">{item.page}</h5>
                      </div>
                      <p className="text-xs text-[#8B7E7E]">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 bg-[#FFB6C1]/20 rounded-2xl border border-[#FFB6C1]/40">
                  <h5 className="font-semibold text-[#4A4A4A] mb-3">{translate({ ro: "Features", en: "Features" })}</h5>
                  <ul className="text-sm text-[#8B7E7E] space-y-2">
                    <li className="flex items-start gap-2"><span className="text-[#FFB6C1]">•</span> Intro screen (~5s): gradient blobs, petals, sparkles</li>
                    <li className="flex items-start gap-2"><span className="text-[#FFB6C1]">•</span> FloralDecorations overlay (Three.js)</li>
                    <li className="flex items-start gap-2"><span className="text-[#FFB6C1]">•</span> RSVP: adults/children, dietary, transport → Google Apps Script</li>
                    <li className="flex items-start gap-2"><span className="text-[#FFB6C1]">•</span> Venue: Biserica Reformată Dumbrăvița, reception</li>
                    <li className="flex items-start gap-2"><span className="text-[#FFB6C1]">•</span> Leaflet + leaflet-routing-machine pentru hărți</li>
                    <li className="flex items-start gap-2"><span className="text-[#FFB6C1]">•</span> Romanian localization (ro/ variants)</li>
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
        <Card className="border-[#FFB6C1]/30 bg-gradient-to-br from-[#FFF9FB] to-[#FDF5F9]">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-[#FFB6C1]/20 rounded-2xl border border-[#FFB6C1]/40">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#FFB6C1]/30 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-[#FFB6C1]" />
                  </div>
                  <h5 className="font-semibold text-[#4A4A4A] text-lg">{translate({ ro: "Site Nuntă", en: "Wedding Site" })}</h5>
                </div>
                <p className="text-sm text-[#8B7E7E] leading-relaxed">
                  {translate({
                    ro: "Layout horizontal cu 7 secțiuni, intro animation, RSVP multi-step, galerie foto, info despre locație și Timișoara. Floral decorations cu Three.js.",
                    en: "Horizontal layout with 7 sections, intro animation, multi-step RSVP, photo gallery, venue and Timișoara info. Three.js floral decorations.",
                  })}
                </p>
              </div>
              <div className="p-6 bg-[#D8B4E2]/20 rounded-2xl border border-[#D8B4E2]/40">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#D8B4E2]/30 flex items-center justify-center">
                    <Star className="h-6 w-6 text-[#D8B4E2]" />
                  </div>
                  <h5 className="font-semibold text-[#4A4A4A] text-lg">{translate({ ro: "Design", en: "Design" })}</h5>
                </div>
                <p className="text-sm text-[#8B7E7E] leading-relaxed">
                  {translate({
                    ro: "Paletă pastel pink & purple, glass navbar scroll-aware, section backgrounds per secțiune, serif typography elegantă. Fără link public, proiect privat.",
                    en: "Pastel pink & purple palette, scroll-aware glass navbar, per-section backgrounds, elegant serif typography. No public link, private project.",
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

export function LucasAmeliePage() {
  const { translate } = useLanguage()
  const timelineData = makeTimelineData(translate)

  return (
    <div className="relative" style={{ minHeight: '100vh', background: "linear-gradient(to bottom, #FFF9FB, #FDF5F9)", fontFamily: "Inter, sans-serif" }}>
  <div className="fixed inset-0 -z-10" style={{ background: "linear-gradient(to bottom, #FFF9FB, #FDF5F9)", minHeight: '100%' }}></div>
      <div className="container-custom py-20 pt-32">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <Link to="/portfolio">
            <Button variant="ghost" size="sm" className="gap-2 text-[#8B7E7E] hover:bg-[#FFB6C1]/20">
              <ArrowLeft className="h-4 w-4" />
              {translate({ ro: "Înapoi la portofoliu", en: "Back to portfolio" })}
            </Button>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold text-[#4A4A4A] mb-6" style={{ lineHeight: 1.2 }}>
            Lucas & Amélie
          </h1>
          <p className="text-xl md:text-2xl text-[#8B7E7E] max-w-3xl mx-auto">
            {translate({
              ro: "Site nuntă • React 18 + Three.js • Layout horizontal, RSVP, galerie",
              en: "Wedding website • React 18 + Three.js • Horizontal layout, RSVP, gallery",
            })}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <span className="px-4 py-2 bg-[#FFB6C1]/30 text-[#8B7E7E] rounded-full text-sm font-medium">React 18</span>
            <span className="px-4 py-2 bg-[#D8B4E2]/30 text-[#8B7E7E] rounded-full text-sm font-medium">Three.js</span>
            <span className="px-4 py-2 bg-[#FFB6C1]/30 text-[#8B7E7E] rounded-full text-sm font-medium">09.05.2026</span>
          </div>
        </motion.div>

        <Timeline
          data={timelineData}
          title={translate({ ro: "Journey Lucas & Amélie", en: "Lucas & Amélie Journey" })}
          subtitle={translate({
            ro: "De la concept la site nuntă, layout horizontal, RSVP, floral decorations.",
            en: "From concept to wedding site, horizontal layout, RSVP, floral decorations.",
          })}
        />

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mt-12">
          <Card className="rounded-3xl p-8 md:p-12 max-w-2xl mx-auto bg-white/80 border-[#FFB6C1]/40">
            <h2 className="text-3xl font-bold text-[#4A4A4A] mb-4">{translate({ ro: "Vrei ceva similar?", en: "Want something similar?" })}</h2>
            <p className="text-[#8B7E7E] mb-8">{translate({ ro: "Hai să discutăm despre următorul tău proiect.", en: "Let's talk about your next project." })}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-[#FFB6C1] hover:bg-[#FFD6DC] text-[#4A4A4A]">
                  {translate({ ro: "Începe un proiect", en: "Start a project" })}
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button size="lg" variant="outline" className="border-[#FFB6C1] text-[#8B7E7E] hover:bg-[#FFB6C1]/20">
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
