import { motion } from "framer-motion"
import { ArrowLeft, Star, Download, ShoppingCart, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Timeline, type TimelineEntry } from "@/components/ui/timeline"
import { Link } from "react-router-dom"
import { useLanguage } from "@/contexts/language-context"

const ORANGE = "#fa7c1f"
const NAVY = "#1a1a2e"

function makeTimelineData(translate: (t: { ro: string; en: string }) => string): TimelineEntry[] {
  return [
    {
      title: translate({ ro: "Overview", en: "Overview" }),
      content: (
        <Card className="border-[#fa7c1f]/20 bg-gradient-to-br from-white to-[#f8f9fa]">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-[#1a1a2e] mb-4">Garmedi</h4>
                <p className="text-[#4a3428] mb-6">
                  {translate({
                    ro: "E-commerce pentru costume medicale din bumbac fabricate în România. Magazin public cu coș, favorite, auth, checkout și dashboard admin complet. Particule în fundal, glass cards, carousel Swiper.",
                    en: "E-commerce for medical cotton clothing made in Romania. Public shop with cart, favorites, auth, checkout, and complete admin dashboard. Particle background, glass cards, Swiper carousel.",
                  })}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-[#fa7c1f]/10 rounded-xl border border-[#fa7c1f]/20">
                    <h5 className="font-semibold text-[#fa7c1f] mb-2 text-sm">{translate({ ro: "Rute", en: "Routes" })}</h5>
                    <p className="text-xs text-[#6b7280]">30+ rute</p>
                  </div>
                  <div className="p-4 bg-[#fa7c1f]/10 rounded-xl border border-[#fa7c1f]/20">
                    <h5 className="font-semibold text-[#fa7c1f] mb-2 text-sm">Stack</h5>
                    <p className="text-xs text-[#6b7280]">React 19, Three.js</p>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[#fa7c1f]/20">
                  <h5 className="font-semibold text-[#1a1a2e] mb-3">Tech Stack</h5>
                  <div className="flex flex-wrap gap-2">
                    {["React 19", "TypeScript", "Vite 7", "Tailwind 4", "Motion", "Three.js", "R3F", "Swiper"].map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 bg-[#fa7c1f]/20 text-[#fa7c1f] rounded-full font-medium">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 bg-[#fa7c1f]/10 rounded-2xl border border-[#fa7c1f]/20">
                  <h5 className="font-semibold text-[#1a1a2e] mb-3 flex items-center gap-2">
                    <Download className="h-5 w-5 text-[#fa7c1f]" />
                    {translate({ ro: "Paleta", en: "Color Palette" })}
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg" style={{ background: ORANGE }} />
                      <div>
                        <p className="text-sm font-semibold text-[#1a1a2e]">Orange</p>
                        <p className="text-xs text-[#6b7280]">#fa7c1f — accent</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg" style={{ background: NAVY }} />
                      <div>
                        <p className="text-sm font-semibold text-[#1a1a2e]">Navy</p>
                        <p className="text-xs text-[#6b7280]">#1a1a2e — text</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-[#fa7c1f]/10 rounded-2xl border border-[#fa7c1f]/20">
                  <h5 className="font-semibold text-[#1a1a2e] mb-3 flex items-center gap-2">
                    <Star className="h-5 w-5 text-[#fa7c1f]" />
                    {translate({ ro: "Features", en: "Features" })}
                  </h5>
                  <ul className="text-sm text-[#6b7280] space-y-2">
                    <li>• CartProvider, FavoritesProvider, AuthProvider</li>
                    <li>• Loading screen (blur → sharp)</li>
                    <li>• StaggeredText typography</li>
                    <li>• Lazy loading routes</li>
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
        <Card className="border-[#fa7c1f]/20 bg-gradient-to-br from-white to-[#f8f9fa]">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-[#1a1a2e] mb-4">{translate({ ro: "Rute Publice", en: "Public Routes" })}</h4>
                <p className="text-[#6b7280] mb-6">
                  {translate({
                    ro: "Home, Magazin, Produs/:slug, Coș, Categorii, Despre, Contact, FAQ, Favorite, Profil, Checkout, formulare retur, tabel mărimi, politică cookies, etc.",
                    en: "Home, Shop, Product/:slug, Cart, Categories, About, Contact, FAQ, Favorites, Profile, Checkout, return forms, size chart, cookie policy, etc.",
                  })}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { page: "Magazin", desc: translate({ ro: "Catalog, categorii", en: "Catalog, categories" }), icon: <ShoppingCart className="h-4 w-4" /> },
                    { page: "Coș", desc: translate({ ro: "Checkout", en: "Checkout" }), icon: <ShoppingCart className="h-4 w-4" /> },
                    { page: "Admin", desc: "Comenzi, produse, stoc", icon: <Star className="h-4 w-4" /> },
                    { page: "BaseLinker", desc: translate({ ro: "Integrare", en: "Integration" }), icon: <Download className="h-4 w-4" /> },
                  ].map((item, i) => (
                    <div key={i} className="p-3 bg-white border border-[#fa7c1f]/20 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-[#fa7c1f]">{item.icon}</div>
                        <h5 className="font-semibold text-[#1a1a2e] text-sm">{item.page}</h5>
                      </div>
                      <p className="text-xs text-[#6b7280]">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 bg-[#fa7c1f]/10 rounded-2xl border border-[#fa7c1f]/20">
                  <h5 className="font-semibold text-[#1a1a2e] mb-3">{translate({ ro: "Funcționalități E-commerce", en: "E-commerce Features" })}</h5>
                  <ul className="text-sm text-[#6b7280] space-y-2">
                    <li className="flex items-start gap-2"><span className="text-[#fa7c1f]">•</span> Catalog produse, categorii (femei/bărbați)</li>
                    <li className="flex items-start gap-2"><span className="text-[#fa7c1f]">•</span> Coș, favorite, auth</li>
                    <li className="flex items-start gap-2"><span className="text-[#fa7c1f]">•</span> Checkout, confirmare plată</li>
                    <li className="flex items-start gap-2"><span className="text-[#fa7c1f]">•</span> Program fidelitate, discount studenți, comenzi grup</li>
                    <li className="flex items-start gap-2"><span className="text-[#fa7c1f]">•</span> Admin: produse, comenzi, stoc, cupoane, recenzii, BaseLinker</li>
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
        <Card className="border-[#fa7c1f]/20 bg-gradient-to-br from-white to-[#f8f9fa]">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-[#fa7c1f]/10 rounded-2xl border border-[#fa7c1f]/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#fa7c1f]/20 flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-[#fa7c1f]" />
                  </div>
                  <h5 className="font-semibold text-[#1a1a2e] text-lg">{translate({ ro: "E-commerce Complet", en: "Complete E-commerce" })}</h5>
                </div>
                <p className="text-sm text-[#6b7280] leading-relaxed">
                  {translate({
                    ro: "Magazin medical complet cu coș, favorite, checkout, auth, program fidelitate, discount studenți. Admin pentru produse, comenzi, stoc, cupoane, integrare BaseLinker.",
                    en: "Complete medical shop with cart, favorites, checkout, auth, loyalty program, student discount. Admin for products, orders, stock, coupons, BaseLinker integration.",
                  })}
                </p>
              </div>
              <div className="p-6 bg-[#fa7c1f]/10 rounded-2xl border border-[#fa7c1f]/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#fa7c1f]/20 flex items-center justify-center">
                    <Star className="h-6 w-6 text-[#fa7c1f]" />
                  </div>
                  <h5 className="font-semibold text-[#1a1a2e] text-lg">{translate({ ro: "Design", en: "Design" })}</h5>
                </div>
                <p className="text-sm text-[#6b7280] leading-relaxed">
                  {translate({
                    ro: "Orange accent pe fundal alb, particle background, glass cards, gradient text, Swiper carousel produse, StaggeredText animat.",
                    en: "Orange accent on white background, particle background, glass cards, gradient text, Swiper product carousel, animated StaggeredText.",
                  })}
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t-2 border-[#fa7c1f]/20 text-center">
              <h2 className="font-bold mb-4 text-[#1a1a2e]" style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}>
                {translate({ ro: "Ești curios cum arată?", en: "Curious how it looks?" })}
              </h2>
              <a href="https://garmedi.ro" target="_blank" rel="noopener noreferrer" className="inline-flex">
                <Button size="lg" className="bg-[#fa7c1f] hover:bg-[#e86b10] text-white px-8 py-6">
                  <ExternalLink className="h-6 w-6 mr-2" />
                  Vizită garmedi.ro
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      ),
    },
  ]
}

export function GarmediPage() {
  const { translate } = useLanguage()
  const timelineData = makeTimelineData(translate)

  return (
    <div className="relative" style={{ minHeight: '100vh', background: '#f8f9fa', fontFamily: "Inter, sans-serif" }}>
  <div className="fixed inset-0 -z-10" style={{ background: '#f8f9fa', minHeight: '100%' }}></div>
      <div className="container-custom py-20 pt-32">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <Link to="/portfolio">
            <Button variant="ghost" size="sm" className="gap-2 text-[#fa7c1f] hover:bg-[#fa7c1f]/10">
              <ArrowLeft className="h-4 w-4" />
              {translate({ ro: "Înapoi la portofoliu", en: "Back to portfolio" })}
            </Button>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-bold text-[#1a1a2e] mb-6">Garmedi</h1>
          <p className="text-xl md:text-2xl text-[#6b7280] max-w-3xl mx-auto">
            {translate({
              ro: "E-commerce costume medicale • React 19 + Three.js • Magazin + Admin complet",
              en: "Medical clothing e-commerce • React 19 + Three.js • Shop + complete Admin",
            })}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <span className="px-4 py-2 bg-[#fa7c1f]/20 text-[#fa7c1f] rounded-full text-sm font-medium">React 19</span>
            <span className="px-4 py-2 bg-[#fa7c1f]/20 text-[#fa7c1f] rounded-full text-sm font-medium">E-commerce</span>
            <span className="px-4 py-2 bg-[#fa7c1f]/20 text-[#fa7c1f] rounded-full text-sm font-medium">garmedi.ro</span>
          </div>
        </motion.div>

        <Timeline
          data={timelineData}
          title={translate({ ro: "Journey Garmedi", en: "Garmedi Journey" })}
          subtitle={translate({
            ro: "E-commerce medical complet — magazin, coș, admin, BaseLinker.",
            en: "Complete medical e-commerce — shop, cart, admin, BaseLinker.",
          })}
        />

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mt-12">
          <Card className="rounded-3xl p-8 md:p-12 max-w-2xl mx-auto bg-white border-[#fa7c1f]/30">
            <h2 className="text-3xl font-bold text-[#1a1a2e] mb-4">{translate({ ro: "Vrei ceva similar?", en: "Want something similar?" })}</h2>
            <p className="text-[#6b7280] mb-8">{translate({ ro: "Hai să discutăm despre următorul tău proiect.", en: "Let's talk about your next project." })}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-[#fa7c1f] hover:bg-[#e86b10] text-white">
                  {translate({ ro: "Începe un proiect", en: "Start a project" })}
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button size="lg" variant="outline" className="border-[#fa7c1f] text-[#fa7c1f] hover:bg-[#fa7c1f]/10">
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
