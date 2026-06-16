import { motion } from "framer-motion"
import { ArrowLeft, Star, Download, UtensilsCrossed, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Timeline, type TimelineEntry } from "@/components/ui/timeline"
import { ProjectLiveSiteLink } from "@/components/ui/project-live-site-link"
import { Link } from "react-router-dom"
import { useLanguage } from "@/contexts/language-context"

const CREAM = "#F0EFEC"
const GOLD = "#B8861F"
const DARK = "#302923"

function makeTimelineData(translate: (t: { ro: string; en: string }) => string): TimelineEntry[] {
  return [
    {
      title: translate({ ro: "Overview", en: "Overview" }),
      content: (
        <Card className="border-[#B8861F]/20 bg-gradient-to-br from-[#F0EFEC] to-white">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-[#302923] mb-4">La Calul Alb</h4>
                <p className="text-[#5A5249] mb-6">
                  {translate({
                    ro: "Site pentru restaurant din centrul istoric al Timișoarei (clădire din 1746). Hero scroll-driven cu ilustrație SVG a fațadei, meniu bilingv cu 8 categorii, rezervări și catering.",
                    en: "Website for a restaurant in Timișoara's historic center (1746 building). Scroll-driven hero with SVG facade illustration, bilingual menu with 8 categories, reservations and catering.",
                  })}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-[#B8861F]/10 rounded-xl border border-[#B8861F]/20">
                    <h5 className="font-semibold text-[#B8861F] mb-2 text-sm">{translate({ ro: "Pagini", en: "Pages" })}</h5>
                    <p className="text-xs text-[#5A5249]">5 rute + alias contact</p>
                  </div>
                  <div className="p-4 bg-[#B8861F]/10 rounded-xl border border-[#B8861F]/20">
                    <h5 className="font-semibold text-[#B8861F] mb-2 text-sm">Design</h5>
                    <p className="text-xs text-[#5A5249]">Cream & Gold</p>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[#B8861F]/20">
                  <h5 className="font-semibold text-[#302923] mb-3">Tech Stack</h5>
                  <div className="flex flex-wrap gap-2">
                    {["React 18", "TypeScript", "Vite 8", "Tailwind", "GSAP", "Motion", "Lenis", "Three.js"].map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 bg-[#B8861F]/15 text-[#9E7219] rounded-full font-medium">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 bg-[#B8861F]/5 rounded-2xl border border-[#B8861F]/20">
                  <h5 className="font-semibold text-[#302923] mb-3 flex items-center gap-2">
                    <Download className="h-5 w-5 text-[#B8861F]" />
                    {translate({ ro: "Paleta", en: "Color Palette" })}
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg border border-[#C4BCB0]" style={{ background: CREAM }} />
                      <div>
                        <p className="text-sm font-semibold text-[#302923]">Cream</p>
                        <p className="text-xs text-[#5A5249]">#F0EFEC — background</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg" style={{ background: GOLD }} />
                      <div>
                        <p className="text-sm font-semibold text-[#302923]">Gold</p>
                        <p className="text-xs text-[#5A5249]">#B8861F — accent</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg" style={{ background: DARK }} />
                      <div>
                        <p className="text-sm font-semibold text-[#302923]">Espresso</p>
                        <p className="text-xs text-[#5A5249]">#302923 — primary</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-[#B8861F]/5 rounded-2xl border border-[#B8861F]/20">
                  <h5 className="font-semibold text-[#302923] mb-3 flex items-center gap-2">
                    <Star className="h-5 w-5 text-[#B8861F]" />
                    {translate({ ro: "Tipografie", en: "Typography" })}
                  </h5>
                  <ul className="text-sm text-[#5A5249] space-y-2">
                    <li>• Marcellus — display</li>
                    <li>• Cormorant Garamond — wordmark</li>
                    <li>• Manrope — body</li>
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
        <Card className="border-[#B8861F]/20 bg-gradient-to-br from-[#F0EFEC] to-white">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-[#302923] mb-4">5 Pagini</h4>
                <p className="text-[#5A5249] mb-6">
                  {translate({
                    ro: "Home cinematic cu scroll Lenis, Meniu interactiv, Despre (poveste + timeline), Rezervare, Catering/Contact. Navigare fixă + footer cu program și social.",
                    en: "Cinematic home with Lenis scroll, interactive menu, About (story + timeline), Reservation, Catering/Contact. Fixed nav + footer with hours and social.",
                  })}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { page: "Home", desc: translate({ ro: "Hero scroll + fațadă SVG", en: "Scroll hero + SVG facade" }), icon: <Star className="h-4 w-4" /> },
                    { page: "Meniu", desc: translate({ ro: "8 categorii, 60+ feluri", en: "8 categories, 60+ dishes" }), icon: <UtensilsCrossed className="h-4 w-4" /> },
                    { page: "Despre", desc: translate({ ro: "Istorie din 1746", en: "History since 1746" }), icon: <Download className="h-4 w-4" /> },
                    { page: "Rezervare", desc: translate({ ro: "Formular rezervări", en: "Reservation form" }), icon: <UtensilsCrossed className="h-4 w-4" /> },
                    { page: "Catering", desc: translate({ ro: "Evenimente private", en: "Private events" }), icon: <UtensilsCrossed className="h-4 w-4" /> },
                    { page: "Contact", desc: translate({ ro: "Alias catering", en: "Catering alias" }), icon: <Download className="h-4 w-4" /> },
                  ].map((item, i) => (
                    <div key={i} className="p-3 bg-white border border-[#B8861F]/20 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-[#B8861F]">{item.icon}</div>
                        <h5 className="font-semibold text-[#302923] text-sm">{item.page}</h5>
                      </div>
                      <p className="text-xs text-[#5A5249]">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 bg-[#B8861F]/5 rounded-2xl border border-[#B8861F]/20">
                  <h5 className="font-semibold text-[#302923] mb-3">{translate({ ro: "Features", en: "Features" })}</h5>
                  <ul className="text-sm text-[#5A5249] space-y-2">
                    <li className="flex items-start gap-2"><span className="text-[#B8861F]">•</span> Bilingv RO / EN (context custom)</li>
                    <li className="flex items-start gap-2"><span className="text-[#B8861F]">•</span> FlowingMenu GSAP — categorii meniu</li>
                    <li className="flex items-start gap-2"><span className="text-[#B8861F]">•</span> ModalCards + GlassCursor Three.js pe feluri</li>
                    <li className="flex items-start gap-2"><span className="text-[#B8861F]">•</span> Page curtain transitions la schimbare rută</li>
                    <li className="flex items-start gap-2"><span className="text-[#B8861F]">•</span> Lenis smooth scroll + prefers-reduced-motion</li>
                    <li className="flex items-start gap-2"><span className="text-[#B8861F]">•</span> Ilustrație SVG arhitecturală animată</li>
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
        <Card className="border-[#B8861F]/20 bg-gradient-to-br from-[#F0EFEC] to-white">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-[#B8861F]/10 rounded-2xl border border-[#B8861F]/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#B8861F]/20 flex items-center justify-center">
                    <UtensilsCrossed className="h-6 w-6 text-[#B8861F]" />
                  </div>
                  <h5 className="font-semibold text-[#302923] text-lg">{translate({ ro: "Design Language", en: "Design Language" })}</h5>
                </div>
                <p className="text-sm text-[#5A5249] leading-relaxed">
                  {translate({
                    ro: "Paletă caldă cream & gold, tipografie serif elegantă, atmosferă de restaurant istoric din Banat. Animații cinematice fără a compromite performanța.",
                    en: "Warm cream & gold palette, elegant serif typography, historic Banat restaurant atmosphere. Cinematic animations without compromising performance.",
                  })}
                </p>
              </div>
              <div className="p-6 bg-[#B8861F]/10 rounded-2xl border border-[#B8861F]/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#B8861F]/20 flex items-center justify-center">
                    <Star className="h-6 w-6 text-[#B8861F]" />
                  </div>
                  <h5 className="font-semibold text-[#302923] text-lg">{translate({ ro: "Impact", en: "Impact" })}</h5>
                </div>
                <p className="text-sm text-[#5A5249] leading-relaxed">
                  {translate({
                    ro: "Prezență digitală premium pentru un restaurant emblematic din Timișoara — meniu complet online, rezervări și catering, experiență bilingvă pentru turiști și localnici.",
                    en: "Premium digital presence for an iconic Timișoara restaurant — full menu online, reservations and catering, bilingual experience for tourists and locals.",
                  })}
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t-2 border-[#B8861F]/20 text-center">
              <h2 className="font-bold mb-4 text-[#302923]" style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}>
                {translate({ ro: "Ești curios cum arată?", en: "Curious how it looks?" })}
              </h2>
              <a href="https://lacalulalb.ro" target="_blank" rel="noopener noreferrer" className="inline-flex">
                <Button size="lg" className="bg-[#302923] hover:bg-[#1E1814] text-[#F0EFEC] px-8 py-6">
                  <ExternalLink className="h-6 w-6 mr-2" />
                  Vizită lacalulalb.ro
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      ),
    },
  ]
}

export function CalulAlbPage() {
  const { translate } = useLanguage()
  const timelineData = makeTimelineData(translate)

  return (
    <div className="relative" style={{ minHeight: "100vh", background: CREAM, fontFamily: "Manrope, Inter, sans-serif" }}>
      <div className="fixed inset-0 -z-10" style={{ background: CREAM, minHeight: "100%" }} />
      <div className="container-custom py-20 pt-32">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <Link to="/portfolio">
            <Button variant="ghost" size="sm" className="gap-2 text-[#B8861F] hover:bg-[#B8861F]/10">
              <ArrowLeft className="h-4 w-4" />
              {translate({ ro: "Înapoi la portofoliu", en: "Back to portfolio" })}
            </Button>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold text-[#302923] mb-6" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            La Calul Alb
          </h1>
          <p className="text-xl md:text-2xl text-[#5A5249] max-w-3xl mx-auto">
            {translate({
              ro: "Restaurant Timișoara • React 18 + GSAP + Three.js • Meniu bilingv, rezervări, lacalulalb.ro",
              en: "Timișoara Restaurant • React 18 + GSAP + Three.js • Bilingual menu, reservations, lacalulalb.ro",
            })}
          </p>
          <div className="mt-8">
            <ProjectLiveSiteLink
              url="https://lacalulalb.ro"
              buttonClassName="bg-[#302923] hover:bg-[#1E1814] text-[#F0EFEC]"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <span className="px-4 py-2 bg-[#B8861F]/15 text-[#9E7219] rounded-full text-sm font-medium">React 18</span>
            <span className="px-4 py-2 bg-[#B8861F]/15 text-[#9E7219] rounded-full text-sm font-medium">GSAP + Lenis</span>
            <span className="px-4 py-2 bg-[#B8861F]/15 text-[#9E7219] rounded-full text-sm font-medium">lacalulalb.ro</span>
          </div>
        </motion.div>

        <Timeline
          data={timelineData}
          title={translate({ ro: "Journey La Calul Alb", en: "La Calul Alb Journey" })}
          subtitle={translate({
            ro: "De la clădire istorică la experiență digitală — meniu, rezervări și povestea locului.",
            en: "From historic building to digital experience — menu, reservations and the story of the place.",
          })}
        />

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mt-12">
          <Card className="rounded-3xl p-8 md:p-12 max-w-2xl mx-auto bg-white border-[#B8861F]/30">
            <h2 className="text-3xl font-bold text-[#302923] mb-4">{translate({ ro: "Vrei ceva similar?", en: "Want something similar?" })}</h2>
            <p className="text-[#5A5249] mb-8">{translate({ ro: "Hai să discutăm despre următorul tău proiect.", en: "Let's talk about your next project." })}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-[#302923] hover:bg-[#1E1814] text-[#F0EFEC]">
                  {translate({ ro: "Începe un proiect", en: "Start a project" })}
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button size="lg" variant="outline" className="border-[#B8861F] text-[#9E7219] hover:bg-[#B8861F]/10">
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
