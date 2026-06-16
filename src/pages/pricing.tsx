import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Check, Star } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { api } from "@/lib/api"
import type { Package } from "@/hooks/use-api"

const FALLBACK_PLANS = [
  { id: "simple", name_ro: "Site Simplu", name_en: "Simple Website", badge_ro: "Site Simplu", badge_en: "Simple Website", price: 400, description_ro: "Pentru freelanceri, artiști, firme mici", description_en: "For freelancers, artists, and small businesses", features_ro: ["1-5 pagini (Home, About, Contact, Services)", "Design modern și responsive (desktop + mobil)", "Hero section cu CTA", "Formular de contact funcțional (trimite pe email)", "Integrare Google Maps / Social Media icons", "Optimizare SEO de bază (titluri, meta descrieri)", "Hosting 1 lună gratuit"], features_en: ["1-5 pages (Home, About, Contact, Services)", "Modern responsive design (desktop + mobile)", "Hero section with CTA", "Working contact form (delivers straight to email)", "Google Maps & social icon integration", "Basic SEO setup (titles, meta descriptions)", "1 month of hosting included"], is_popular: false },
  { id: "complex", name_ro: "Site Complex", name_en: "Complex Website", badge_ro: "Site Complex", badge_en: "Complex Website", price: 750, description_ro: "Pentru firme medii, organizații, proiecte serioase", description_en: "For mid-sized companies, organizations, and serious projects", features_ro: ["5-15 pagini dinamice", "Blog / Noutăți cu panou de administrare simplu", "Galerii foto/video, carusele, testimoniale animate", "Formulare avansate (cerere ofertă, rezervări, upload fișiere)", "Optimizări SEO avansate (heading-uri, sitemap, schema.org)", "Integrare Google Analytics + Search Console", "Performanță ridicată (lazy loading, optimizare viteză)", "Include tot din Site Simplu"], features_en: ["5-15 dynamic pages", "Blog / News with a simple admin panel", "Photo/video galleries, carousels, animated testimonials", "Advanced forms (quotes, bookings, file uploads)", "Advanced SEO (headings, sitemap, schema.org)", "Google Analytics + Search Console integration", "High performance (lazy loading, speed optimizations)", "Includes everything from Simple Website"], is_popular: false },
  { id: "complex-backend", name_ro: "Site Complex + Backend", name_en: "Complex Website + Backend", badge_ro: "Site Complex + Backend", badge_en: "Complex Website + Backend", price: 1200, description_ro: "Pentru proiecte care necesită funcționalități avansate", description_en: "For projects that demand advanced functionality", features_ro: ["Backend custom cu Node.js / Express", "Bază de date (PostgreSQL sau MongoDB)", "API-uri REST pentru integrări", "Autentificare și management utilizatori", "Dashboard pentru administrare conținut", "Sistem de notificări email automate", "Integrări externe (CRM, email marketing, etc.)", "Securitate avansată și backup automat", "Include tot din Site Complex"], features_en: ["Custom backend with Node.js / Express", "Database (PostgreSQL or MongoDB)", "REST APIs for integrations", "Authentication and user management", "Content management dashboard", "Automated email notification system", "External integrations (CRM, email marketing, etc.)", "Advanced security and automatic backups", "Includes everything from Complex Website"], is_popular: true },
  { id: "ecommerce", name_ro: "E-commerce", name_en: "E-commerce", badge_ro: "E-commerce", badge_en: "E-commerce", price: 1600, description_ro: "Pentru magazine online și vânzări directe", description_en: "For online stores and direct sales", features_ro: ["Magazin online complet (produse nelimitate)", "Coș de cumpărături + checkout securizat", "Plăți integrate (Stripe, PayPal, card bancar)", "Gestionare stocuri și facturi", "Integrare livrare (curier, easybox, personalizată)", "Pagini personalizate pentru produse și categorii", "Conturi clienți și sistem de notificări email", "Include tot din Site Complex + Backend"], features_en: ["Full online store (unlimited products)", "Shopping cart + secure checkout", "Integrated payments (Stripe, PayPal, cards)", "Inventory and invoicing management", "Shipping integrations (courier, locker, custom)", "Custom product and category pages", "Customer accounts & email notification system", "Includes everything from Complex Website + Backend"], is_popular: false },
]

const FALLBACK_ADDONS = [
  { name_ro: "Suport Premium", name_en: "Premium Support", price: 100, period: "month", description_ro: "Modificări nelimitate, asistență prioritară", description_en: "Unlimited updates, priority assistance", note_ro: "Prima lună GRATUITĂ. Abonamentul se plătește pe minimum 3 luni în avans", note_en: "First month FREE. Subscription billed at least 3 months in advance", original_price: null, is_discount: false, discount_label_ro: null, discount_label_en: null },
  { name_ro: "Hosting", name_en: "Hosting", price: 30, period: "month", description_ro: "Hosting profesional pentru site-ul tău", description_en: "Professional hosting for your website", note_ro: null, note_en: null, original_price: null, is_discount: false, discount_label_ro: null, discount_label_en: null },
  { name_ro: "Hosting + Suport Premium", name_en: "Hosting + Premium Support", price: 120, period: "month", description_ro: "Pachet complet: hosting + suport premium", description_en: "Full bundle: hosting + premium support", note_ro: null, note_en: null, original_price: 130, is_discount: true, discount_label_ro: "-€10 Reducere", discount_label_en: "-€10 Discount" },
  { name_ro: "O zi de modificări", name_en: "One Day of Updates", price: 40, period: "day", description_ro: "O zi prestabilită dedicată pentru modificări majore", description_en: "A pre-scheduled day dedicated to major updates", note_ro: "Taxe suplimentare pot fi aplicate pentru modificări excesiv de complexe", note_en: "Additional fees may apply for extremely complex changes", original_price: null, is_discount: false, discount_label_ro: null, discount_label_en: null },
]

export function PricingPage() {
  const { language, translate } = useLanguage()
  const [plans, setPlans] = useState<Package[]>([])
  const [addons, setAddons] = useState<Package[]>([])

  useEffect(() => {
    api<{ packages: Package[] }>("/api/packages")
      .then((r) => {
        const pkgs = r.packages || []
        setPlans(pkgs.filter((p) => p.type === "plan"))
        setAddons(pkgs.filter((p) => p.type === "addon"))
      })
      .catch(() => {
        setPlans(FALLBACK_PLANS as unknown as Package[])
        setAddons(FALLBACK_ADDONS as unknown as Package[])
      })
  }, [])

  const displayPlans = plans.length ? plans : (FALLBACK_PLANS as unknown as Package[])
  const displayAddons = addons.length ? addons : (FALLBACK_ADDONS as unknown as Package[])

  const lang = language as "ro" | "en"
  const nameKey = `name_${lang}` as keyof Package
  const badgeKey = `badge_${lang}` as keyof Package
  const descKey = `description_${lang}` as keyof Package
  const featuresKey = `features_${lang}` as keyof Package
  const noteKey = `note_${lang}` as keyof Package
  const discountKey = `discount_label_${lang}` as keyof Package

  return (
    <div className="relative">
      <div className="container-custom py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            {translate({ ro: "Pachete Detaliate", en: "Detailed Packages" })}
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto">
            {translate({
              ro: "Alege pachetul potrivit pentru obiectivul tău. Toate includ design modern, performanță și implementare curată.",
              en: "Choose the package that matches your goal. Every option includes modern design, performance, and clean implementation.",
            })}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayPlans.map((plan, index) => {
            const name = String(plan[nameKey] ?? plan.name_ro ?? plan.name_en ?? "")
            const badge = String(plan[badgeKey] ?? plan.badge_ro ?? plan.badge_en ?? name)
            const desc = String(plan[descKey] ?? plan.description_ro ?? plan.description_en ?? "")
            const features = (plan[featuresKey] ?? plan.features_ro ?? plan.features_en ?? []) as string[]
            const popular = plan.is_popular ?? false
            return (
              <motion.div
                key={plan.id ?? plan.slug ?? index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="relative"
              >
                {popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {translate({ ro: "Popular", en: "Popular" })}
                    </div>
                  </div>
                )}
                <Card className={`h-full flex flex-col ${popular ? 'ring-2 ring-primary-500 ring-opacity-50' : ''}`}>
                  <CardHeader className="text-center pb-2">
                    <div className="inline-block px-3 py-1 bg-white/50 backdrop-blur-sm rounded-full text-xs font-semibold text-foreground mb-3">
                      {badge}
                    </div>
                    <h3 className="font-bold text-foreground mb-2" style={{ fontSize: "clamp(1.125rem, 3vw, 1.25rem)" }}>
                      {name}
                    </h3>
                    <div className="font-bold text-foreground" style={{ fontSize: "clamp(1.5rem, 4vw, 1.875rem)" }}>
                      {translate({ ro: "de la", en: "from" })} {formatCurrency(plan.price)}
                      <span className="text-muted font-normal ml-1" style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)" }}>
                        / {translate({ ro: "proiect", en: "project" })}
                      </span>
                    </div>
                    <p className="text-muted mt-2" style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)" }}>
                      {desc}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-4 flex-1 flex flex-col">
                    <ul className="space-y-3 mb-6 flex-1">
                      {features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index * 0.2) + (featureIndex * 0.1), duration: 0.5 }}
                          className="flex items-start gap-3 text-sm"
                        >
                          <Check className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                          <span className="text-muted">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <Link to="/contact" className="block mt-auto">
                      <Button variant={popular ? "primary" : "glass"} className="w-full">
                        {translate({ ro: "Alege", en: "Choose" })}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">
            {translate({ ro: "Opțiuni Suplimentare", en: "Additional Options" })}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayAddons.map((service, index) => {
              const name = String(service[nameKey] ?? service.name_ro ?? service.name_en ?? "")
              const desc = String(service[descKey] ?? service.description_ro ?? service.description_en ?? "")
              const periodRaw = service.period || "month"
              const period = periodRaw === "month" ? (lang === "ro" ? "lună" : "month") : periodRaw === "day" ? (lang === "ro" ? "zi" : "day") : String(periodRaw)
              const note = service[noteKey] ?? service.note_ro ?? service.note_en
              const discount = service.is_discount ?? false
              const discountLabel = String(service[discountKey] ?? service.discount_label_ro ?? service.discount_label_en ?? "")
              return (
                <motion.div
                  key={service.id ?? service.slug ?? index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + (index * 0.1), duration: 0.8 }}
                  className="relative"
                >
                  {discount && discountLabel && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        {discountLabel}
                      </div>
                    </div>
                  )}
                  <Card className={`h-full flex flex-col ${discount ? 'ring-2 ring-green-500 ring-opacity-50' : ''}`}>
                    <CardHeader className="text-center pb-2">
                      <h3 className="text-lg font-bold text-foreground mb-2">{name}</h3>
                      <div className="flex flex-col items-center gap-1">
                        {service.original_price && (
                          <div className="text-lg text-muted line-through">
                            {formatCurrency(service.original_price)}
                          </div>
                        )}
                        <div className="text-2xl font-bold text-foreground">
                          {formatCurrency(service.price)}
                          <span className="text-sm text-muted font-normal ml-1">/{period}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted mt-2">{desc}</p>
                      {note && (
                        <p className="text-xs text-primary-500 mt-2 font-medium">{note as string}</p>
                      )}
                    </CardHeader>
                    <CardContent className="pt-4 flex-1 flex flex-col">
                      <div className="flex-1" />
                      <Link to="/contact" className="mt-auto">
                        <Button className="w-full glass-button">
                          {translate({ ro: "Alege", en: "Choose" })}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center"
        >
          <p className="text-muted text-sm max-w-3xl mx-auto">
            {translate({
              ro: "Toate pachetele includ: implementare responsive, SEO de bază, optimizare viteză, tracking (GA4) și handover clar.",
              en: "Every package includes: responsive implementation, baseline SEO, speed optimization, tracking (GA4), and a clear handover.",
            })}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
