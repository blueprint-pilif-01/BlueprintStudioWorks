import { motion } from "framer-motion"
import { ArrowLeft, Star, TrendingUp, Palette, Settings, Ruler, Zap, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Timeline, type TimelineEntry } from "@/components/ui/timeline"
import { Link } from "react-router-dom"
import { useLanguage } from "@/contexts/language-context"

export function XmetPage() {
  const { translate } = useLanguage()

  const timelineData: TimelineEntry[] = [
    {
      title: translate({ ro: "Overview", en: "Overview" }),
      content: (
        <Card className="glass" style={{ background: 'linear-gradient(135deg, rgba(252, 208, 0, 0.05), rgba(255, 255, 255, 0.1))' }}>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-foreground mb-4" style={{ color: '#FCD000', fontFamily: 'Inter, sans-serif', fontWeight: 900, letterSpacing: '-0.02em' }}>
                  {translate({ ro: "Proiectul XMET", en: "The XMET Project" })}
                </h4>
                <p className="text-muted mb-6">
                  {translate({
                    ro: "Am construit o platformă completă pentru XMET , de la zero până la un configurator funcțional care simplifică procesul de comandă. Design-ul industrial cu galben gold transmite calitate premium și încredere. Fiecare pas al configuratorului a fost gândit pentru claritate maximă și ușurință în utilizare.",
                    en: "We built a complete platform for XMET, from scratch to a functional configurator that simplifies the ordering process. The industrial design with gold yellow conveys premium quality and trust. Every step of the configurator was designed for maximum clarity and ease of use."
                  })}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(252, 208, 0, 0.1), rgba(252, 208, 0, 0.05))', border: '1px solid rgba(252, 208, 0, 0.2)' }}>
                    <h5 className="font-semibold mb-2 text-sm" style={{ color: '#FCD000' }}>{translate({ ro: "Pagini", en: "Pages" })}</h5>
                    <p className="text-xs text-muted">{translate({ ro: "Landing + Configurator", en: "Landing + Configurator" })}</p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(252, 208, 0, 0.05), rgba(252, 208, 0, 0.1))', border: '1px solid rgba(252, 208, 0, 0.2)' }}>
                    <h5 className="font-semibold mb-2 text-sm" style={{ color: '#FCD000' }}>{translate({ ro: "Design Language", en: "Design Language" })}</h5>
                    <p className="text-xs text-muted">{translate({ ro: "Industrial, modern, premium", en: "Industrial, modern, premium" })}</p>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-yellow-400/20">
                  <h5 className="font-semibold mb-3" style={{ color: '#FCD000' }}>{translate({ ro: "Stack Tehnologic:", en: "Technology Stack:" })}</h5>
                  <div className="flex flex-wrap gap-2">
                    {["React 18", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "React Router", "React Hook Form", "Zod"].map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(252, 208, 0, 0.1)', color: '#FCD000' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl border border-yellow-400/20" style={{ background: 'linear-gradient(135deg, rgba(252, 208, 0, 0.1), rgba(252, 208, 0, 0.05))' }}>
                  <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#FCD000' }}>
                    <Palette className="h-5 w-5" />
                    {translate({ ro: "Paleta de Culori", en: "Color Palette" })}
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg" style={{ background: '#FCD000' }}></div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Yellow Gold</p>
                        <p className="text-xs text-muted">{translate({ ro: "#FCD000 - Accent principal", en: "#FCD000 - Primary Accent" })}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg" style={{ background: '#1a1a1a' }}></div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Dark Gray</p>
                        <p className="text-xs text-muted">#1a1a1a - Background</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-2xl border border-yellow-400/20" style={{ background: 'linear-gradient(135deg, rgba(252, 208, 0, 0.05), rgba(252, 208, 0, 0.1))' }}>
                  <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#FCD000' }}>
                    <Settings className="h-5 w-5" />
                    {translate({ ro: "Tipografie & Style", en: "Typography & Style" })}
                  </h5>
                  <ul className="text-sm text-muted space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#FCD000' }}>•</span>
                      <span>{translate({ ro: "Inter font cu font-weight 900 pentru titluri", en: "Inter font with font-weight 900 for headings" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#FCD000' }}>•</span>
                      <span>{translate({ ro: "Glass morphism pentru cards și componente", en: "Glass morphism for cards and components" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#FCD000' }}>•</span>
                      <span>{translate({ ro: "Design industrial modern și premium", en: "Modern and premium industrial design" })}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      title: translate({ ro: "Landing Page", en: "Landing Page" }),
      content: (
        <Card className="glass">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-foreground mb-4" style={{ color: '#FCD000' }}>{translate({ ro: "Landing Page Premium", en: "Premium Landing Page" })}</h4>
                <p className="text-muted mb-6">
                  {translate({
                    ro: "Am creat o landing page care vinde singură. Hero section-ul comunică instant valoarea, galeria de realizări construiește credibilitate, iar procesul vizual elimină orice îndoială. Fiecare secțiune e un pas logic spre conversie , de la \"wow\" la \"vreau și eu\".",
                    en: "We created a landing page that sells itself. The hero section instantly communicates value, the gallery builds credibility, and the visual process eliminates any doubt. Every section is a logical step towards conversion, from \"wow\" to \"I want it too\"."
                  })}
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FCD000' }}></div>
                    <span className="text-muted">{translate({ ro: "Hero section cu CTA principal", en: "Hero section with main CTA" })}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FCD000' }}></div>
                    <span className="text-muted">{translate({ ro: "Galerie showcase cu proiecte finalizate", en: "Showcase gallery with completed projects" })}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FCD000' }}></div>
                    <span className="text-muted">{translate({ ro: "Vizualizare proces pas cu pas", en: "Step-by-step process visualization" })}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FCD000' }}></div>
                    <span className="text-muted">{translate({ ro: "Testimoniale video cu clienți satisfăcuți", en: "Video testimonials with satisfied clients" })}</span>
                  </li>
                </ul>
                <div className="p-4 rounded-xl border border-yellow-400/20" style={{ background: 'rgba(252, 208, 0, 0.05)' }}>
                  <h5 className="font-semibold mb-2 flex items-center gap-2" style={{ color: '#FCD000' }}>
                    <Palette className="h-4 w-4" />
                    {translate({ ro: "Design Highlights", en: "Design Highlights" })}
                  </h5>
                  <p className="text-sm text-muted mb-3">
                    {translate({ ro: "Design industrial modern cu accente galbene și efecte glass morphism.", en: "Modern industrial design with yellow accents and glass morphism effects." })}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Industrial Design", "Glass Morphism", "Smooth Animations", "Premium UX"].map((item) => (
                      <span key={item} className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(252, 208, 0, 0.1)', color: '#FCD000' }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl border border-yellow-400/20" style={{ background: 'linear-gradient(135deg, rgba(252, 208, 0, 0.1), rgba(252, 208, 0, 0.05))' }}>
                  <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#FCD000' }}>
                    <Star className="h-5 w-5" />
                    {translate({ ro: "Feature-uri Avansate", en: "Advanced Features" })}
                  </h5>
                  <ul className="text-sm text-muted space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#FCD000' }}>•</span>
                      <span>{translate({ ro: "Galerie cu before/after pentru proiecte finalizate", en: "Before/after gallery for completed projects" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#FCD000' }}>•</span>
                      <span>{translate({ ro: "Video backgrounds pentru secțiuni hero", en: "Video backgrounds for hero sections" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#FCD000' }}>•</span>
                      <span>Interactive process timeline</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#FCD000' }}>•</span>
                      <span>{translate({ ro: "Optimizare pentru conversie și lead generation", en: "Optimization for conversion and lead generation" })}</span>
                    </li>
                  </ul>
                </div>
                <div className="p-5 rounded-2xl border border-yellow-400/20" style={{ background: 'linear-gradient(135deg, rgba(252, 208, 0, 0.05), rgba(252, 208, 0, 0.1))' }}>
                  <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#FCD000' }}>
                    <TrendingUp className="h-5 w-5" />
                    Performance
                  </h5>
                  <ul className="text-sm text-muted space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#FCD000' }}>•</span>
                      <span>{translate({ ro: "92% scor performanță Google PageSpeed", en: "92% Google PageSpeed performance score" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#FCD000' }}>•</span>
                      <span>{translate({ ro: "2.8s timp mediu de încărcare", en: "2.8s average load time" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#FCD000' }}>•</span>
                      <span>{translate({ ro: "5x mai multe lead-uri calificate", en: "5x more qualified leads" })}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      title: translate({ ro: "Configurator Multi-Step", en: "Multi-Step Configurator" }),
      content: (
        <Card className="glass">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-foreground mb-4" style={{ color: '#FCD000' }}>{translate({ ro: "Configurator Inteligent", en: "Smart Configurator" })}</h4>
                <p className="text-muted mb-6">
                  {translate({
                    ro: "Am proiectat configuratorul să fie intuitiv până la nivel instinctiv. 5 pași logici, fiecare cu preview instant al alegerilor tale. Am implementat validare smart în timp real , site-ul te ghidează, nu te blochează. Rezultatul? Clienții finalizează comenzi mai repede și cu mai multă încredere.",
                    en: "We designed the configurator to be intuitive to an instinctive level. 5 logical steps, each with instant preview of your choices. We implemented smart real-time validation - the site guides you, doesn't block you. The result? Clients complete orders faster and with more confidence."
                  })}
                </p>
                <div className="space-y-3">
                  <div className="p-3 bg-white/5 rounded-xl border border-yellow-400/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Settings className="h-5 w-5" style={{ color: '#FCD000' }} />
                      <h5 className="font-semibold text-foreground">{translate({ ro: "Pas 1: Selecție Model", en: "Step 1: Model Selection" })}</h5>
                    </div>
                    <p className="text-sm text-muted">{translate({ ro: "Orizontal, Vertical, Mixt, Perforat", en: "Horizontal, Vertical, Mixed, Perforated" })}</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-yellow-400/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Ruler className="h-5 w-5" style={{ color: '#FCD000' }} />
                      <h5 className="font-semibold text-foreground">{translate({ ro: "Pas 2: Dimensiuni", en: "Step 2: Dimensions" })}</h5>
                    </div>
                    <p className="text-sm text-muted">{translate({ ro: "Configurare lungime totală gard", en: "Total fence length configuration" })}</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-yellow-400/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="h-5 w-5" style={{ color: '#FCD000' }} />
                      <h5 className="font-semibold text-foreground">{translate({ ro: "Pas 3: Produse", en: "Step 3: Products" })}</h5>
                    </div>
                    <p className="text-sm text-muted">{translate({ ro: "Panouri, Poartă Pietonală, Poartă Auto", en: "Panels, Pedestrian Gate, Auto Gate" })}</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-yellow-400/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Palette className="h-5 w-5" style={{ color: '#FCD000' }} />
                      <h5 className="font-semibold text-foreground">{translate({ ro: "Pas 4: Culoare", en: "Step 4: Color" })}</h5>
                    </div>
                    <p className="text-sm text-muted">{translate({ ro: "6 culori RAL standard + preview live", en: "6 standard RAL colors + live preview" })}</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-yellow-400/20">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="h-5 w-5" style={{ color: '#FCD000' }} />
                      <h5 className="font-semibold text-foreground">{translate({ ro: "Pas 5: Rezumat & Comandă", en: "Step 5: Summary & Order" })}</h5>
                    </div>
                    <p className="text-sm text-muted">{translate({ ro: "Preț total, review și submit formular", en: "Total price, review and submit form" })}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl border border-yellow-400/20" style={{ background: 'linear-gradient(135deg, rgba(252, 208, 0, 0.1), rgba(252, 208, 0, 0.05))' }}>
                  <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#FCD000' }}>
                    <Zap className="h-5 w-5" />
                    {translate({ ro: "Funcționalități Configurator", en: "Configurator Features" })}
                  </h5>
                  <ul className="text-sm text-muted space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#FCD000' }}>•</span>
                      <span>{translate({ ro: "Validare în timp real pentru toate selecțiile", en: "Real-time validation for all selections" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#FCD000' }}>•</span>
                      <span>{translate({ ro: "Preview live al configurației în timp real", en: "Live preview of configuration in real time" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#FCD000' }}>•</span>
                      <span>{translate({ ro: "Calcul automat prețuri bazat pe selecții", en: "Automatic price calculation based on selections" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#FCD000' }}>•</span>
                      <span>{translate({ ro: "Progress indicator pentru fiecare pas", en: "Progress indicator for each step" })}</span>
                    </li>
                  </ul>
                </div>
                <div className="p-5 rounded-2xl border border-yellow-400/20" style={{ background: 'linear-gradient(135deg, rgba(252, 208, 0, 0.05), rgba(252, 208, 0, 0.1))' }}>
                  <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#FCD000' }}>
                    <Settings className="h-5 w-5" />
                    User Experience
                  </h5>
                  <ul className="text-sm text-muted space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#FCD000' }}>•</span>
                      <span>{translate({ ro: "40% rată conversie configurator", en: "40% configurator conversion rate" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#FCD000' }}>•</span>
                      <span>{translate({ ro: "Intuitiv și ușor de folosit pentru toți", en: "Intuitive and easy to use for everyone" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#FCD000' }}>•</span>
                      <span>{translate({ ro: "Mobile-friendly design complet", en: "Fully mobile-friendly design" })}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      title: translate({ ro: "Design System & Animații", en: "Design System & Animations" }),
      content: (
        <Card className="glass">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-foreground mb-4" style={{ color: '#FCD000' }}>{translate({ ro: "Design Modern & Performant", en: "Modern & Performant Design" })}</h4>
                <p className="text-muted mb-6">
                  {translate({
                    ro: "Site-ul folosește un design system curat și modern bazat pe paleta galben-auriu (#FCD000). Glass morphism effects și animații fluide cu Framer Motion.",
                    en: "The site uses a clean and modern design system based on the golden yellow palette (#FCD000). Glass morphism effects and smooth animations with Framer Motion."
                  })}
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-yellow-400/20">
                    <h5 className="font-semibold mb-2" style={{ color: '#FCD000' }}>{translate({ ro: "Paleta de Culori", en: "Color Palette" })}</h5>
                    <p className="text-sm text-muted">{translate({ ro: "Galben principal (#FCD000), fundal gradient, accente subtile", en: "Primary yellow (#FCD000), gradient background, subtle accents" })}</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-yellow-400/20">
                    <h5 className="font-semibold mb-2" style={{ color: '#FCD000' }}>Glass Morphism</h5>
                    <p className="text-sm text-muted">{translate({ ro: "Efecte de sticlă blur pentru cards și componente", en: "Glass blur effects for cards and components" })}</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-yellow-400/20">
                    <h5 className="font-semibold mb-2" style={{ color: '#FCD000' }}>{translate({ ro: "Animații Fluide", en: "Smooth Animations" })}</h5>
                    <p className="text-sm text-muted">{translate({ ro: "Framer Motion pentru tranziții smooth și micro-interacțiuni", en: "Framer Motion for smooth transitions and micro-interactions" })}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(252, 208, 0, 0.1), rgba(252, 208, 0, 0.05))' }}>
                  <h5 className="font-semibold mb-3" style={{ color: '#FCD000' }}>Performance</h5>
                  <ul className="text-sm text-muted space-y-2">
                    <li>• {translate({ ro: "Score 92/100 Google PageSpeed", en: "92/100 Google PageSpeed score" })}</li>
                    <li>• {translate({ ro: "Lazy loading pentru imagini", en: "Lazy loading for images" })}</li>
                    <li>• {translate({ ro: "Code splitting automat", en: "Automatic code splitting" })}</li>
                    <li>• {translate({ ro: "Optimizare build cu Vite", en: "Build optimization with Vite" })}</li>
                  </ul>
                </div>
                <div className="p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(252, 208, 0, 0.1), rgba(252, 208, 0, 0.05))' }}>
                  <h5 className="font-semibold mb-3" style={{ color: '#FCD000' }}>UX Features</h5>
                  <ul className="text-sm text-muted space-y-2">
                    <li>• Mobile-first responsive design</li>
                    <li>• {translate({ ro: "Preview live selecții", en: "Live selection preview" })}</li>
                    <li>• {translate({ ro: "Validare forms cu Zod", en: "Form validation with Zod" })}</li>
                    <li>• Microsoft Clarity & Google Analytics</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      title: translate({ ro: "Galerie Proiecte", en: "Project Gallery" }),
      content: (
        <Card className="glass">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-foreground mb-4" style={{ color: '#FCD000' }}>{translate({ ro: "Showcase Realizări", en: "Achievements Showcase" })}</h4>
                <p className="text-muted mb-6">
                  {translate({
                    ro: "Galeria prezintă proiectele finalizate de XMET cu imagini de înaltă calitate. Fiecare proiect include detalii despre tipul de gard/poartă și locația.",
                    en: "The gallery showcases XMET's completed projects with high-quality images. Each project includes details about the type of fence/gate and location."
                  })}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FCD000' }}></div>
                    <span className="text-muted">{translate({ ro: "Imagini profesionale before & after", en: "Professional before & after images" })}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FCD000' }}></div>
                    <span className="text-muted">{translate({ ro: "Grid responsive cu hover effects", en: "Responsive grid with hover effects" })}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FCD000' }}></div>
                    <span className="text-muted">{translate({ ro: "Lightbox pentru vizualizare detaliată", en: "Lightbox for detailed viewing" })}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FCD000' }}></div>
                    <span className="text-muted">{translate({ ro: "Filtrare pe tipuri de produse", en: "Filtering by product types" })}</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl border border-yellow-400/20" style={{ background: 'linear-gradient(135deg, rgba(252, 208, 0, 0.1), rgba(252, 208, 0, 0.05))' }}>
                  <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#FCD000' }}>
                    <Palette className="h-5 w-5" />
                    Design Gallery
                  </h5>
                  <ul className="text-sm text-muted space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#FCD000' }}>•</span>
                      <span>{translate({ ro: "Grid masonry pentru layout dinamic și interesant", en: "Masonry grid for dynamic and interesting layout" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#FCD000' }}>•</span>
                      <span>{translate({ ro: "Overlay cu informații la hover pentru context", en: "Overlay with hover information for context" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#FCD000' }}>•</span>
                      <span>{translate({ ro: "Categorii clare: Garduri orizontale, verticale, mixte", en: "Clear categories: Horizontal, vertical, mixed fences" })}</span>
                    </li>
                  </ul>
                </div>
                <div className="p-5 rounded-2xl border border-yellow-400/20" style={{ background: 'linear-gradient(135deg, rgba(252, 208, 0, 0.05), rgba(252, 208, 0, 0.1))' }}>
                  <h5 className="font-semibold mb-3" style={{ color: '#FCD000' }}>User Experience</h5>
                  <p className="text-sm text-muted">
                    {translate({
                      ro: "Click pe imagine deschide lightbox pentru vizualizare full-screen. Navigation ușoară între proiecte cu săgeți laterale. Smooth transitions și lazy loading pentru performanță.",
                      en: "Click on image opens lightbox for full-screen viewing. Easy navigation between projects with side arrows. Smooth transitions and lazy loading for performance."
                    })}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      title: translate({ ro: "Rezultate", en: "Results" }),
      content: (
        <Card className="glass">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-yellow-400/20" style={{ background: 'linear-gradient(135deg, rgba(252, 208, 0, 0.1), rgba(252, 208, 0, 0.05))' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(252, 208, 0, 0.15)' }}>
                    <Palette className="h-6 w-6" style={{ color: '#FCD000' }} />
                  </div>
                  <h5 className="font-semibold text-foreground text-lg">Design Language</h5>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  {translate({
                    ro: "Industrial modern cu yellow gold accent, fundal dark gradient, typography Inter cu font-weight 900, glass morphism pentru cards, animații smooth pentru tranziții.",
                    en: "Modern industrial with yellow gold accent, dark gradient background, Inter typography with font-weight 900, glass morphism for cards, smooth animations for transitions."
                  })}
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-yellow-400/20" style={{ background: 'linear-gradient(135deg, rgba(252, 208, 0, 0.05), rgba(252, 208, 0, 0.1))' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(252, 208, 0, 0.15)' }}>
                    <Settings className="h-6 w-6" style={{ color: '#FCD000' }} />
              </div>
                  <h5 className="font-semibold text-foreground text-lg">{translate({ ro: "Configurator Premium", en: "Premium Configurator" })}</h5>
              </div>
                <p className="text-sm text-muted leading-relaxed">
                  {translate({
                    ro: "5 pași intuitivi: Model, Dimensiuni, Produse, Culoare, Comandă. Preview live al selecțiilor, validare în timp real, calcul automat prețuri, design responsive complet.",
                    en: "5 intuitive steps: Model, Dimensions, Products, Color, Order. Live preview of selections, real-time validation, automatic price calculation, fully responsive design."
                  })}
                </p>
              </div>
            </div>
            <div className="mt-8 p-6 bg-white/5 rounded-xl border border-yellow-400/20">
              <h5 className="text-lg font-semibold mb-4" style={{ color: '#FCD000' }}>{translate({ ro: "Impactul Proiectului", en: "Project Impact" })}</h5>
              <p className="text-muted mb-6">
                {translate({
                  ro: "XMET a fost o provocare tehnică pasionantă. Am transformat un proces complex (alegerea gardurilor și porților) într-o experiență simplă și plăcută. Design-ul industrial cu galben gold reflectă calitatea premium a produselor, iar configuratorul face munca grea pentru client. Am investit ore în detalii mici care fac o diferență enormă , de la calculul automat al prețurilor până la preview-ul live al fiecărei selecții.",
                  en: "XMET was a passionate technical challenge. We transformed a complex process (choosing fences and gates) into a simple and pleasant experience. The industrial design with gold yellow reflects the premium quality of the products, and the configurator does the heavy lifting for the client. We invested hours in small details that make a huge difference, from automatic price calculation to live preview of each selection."
                })}
              </p>

              <div className="mt-8 pt-8 border-t-2" style={{ borderColor: 'rgba(252, 208, 0, 0.2)' }}>
                <div className="text-center">
                  <h2 className="font-bold mb-4" style={{
                    fontSize: "clamp(2rem, 6vw, 3.75rem)",
                    background: 'linear-gradient(135deg, #FCD000, #B8860B)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 900,
                    letterSpacing: '-0.02em'
                  }}>
                    {translate({ ro: "Ești curios cum arată?", en: "Curious how it looks?" })}
                  </h2>
                  <p className="text-muted mb-6 text-lg">
                    {translate({ ro: "Explorează configuratorul live și descoperă funcționalitățile XMET.", en: "Explore the live configurator and discover XMET's features." })}
                  </p>
                  <a
                    href="https://garduri-xmet.ro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Button size="lg" className="px-8 py-6 text-lg" style={{ backgroundColor: '#FCD000', color: '#000', fontWeight: 700 }}>
                      <ExternalLink className="h-6 w-6" />
                      {translate({ ro: "Vizită garduri-xmet.ro", en: "Visit garduri-xmet.ro" })}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }
  ]

  return (
    <div className="relative xmet-page" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
      fontFamily: 'Montserrat, sans-serif'
    }}>
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 -z-10" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)', minHeight: '100%' }}></div>

      {/* XMET Styling */}
      <style>{`
        .xmet-page {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%) !important;
          position: relative;
          min-height: 100vh;
        }
        .xmet-page::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 30%, rgba(252, 208, 0, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(252, 208, 0, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }
        .xmet-page .glass {
          background: rgba(252, 208, 0, 0.05) !important;
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(252, 208, 0, 0.2) !important;
        }
        .xmet-page h1, .xmet-page h2, .xmet-page h3, .xmet-page h4, .xmet-page h5 {
          color: #FCD000 !important;
        }
        .xmet-page .text-muted {
          color: rgba(255, 255, 255, 0.7) !important;
        }
        .xmet-page .text-foreground {
          color: #ffffff !important;
        }
      `}</style>

      <div className="container-custom py-20 pt-32 relative z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link to="/portfolio">
            <Button variant="ghost" size="sm" className="gap-2" style={{
              color: '#FCD000',
              backgroundColor: 'rgba(252, 208, 0, 0.1)',
              border: '1px solid rgba(252, 208, 0, 0.2)'
            }}>
              <ArrowLeft className="h-4 w-4" />
              {translate({ ro: "Înapoi la portofoliu", en: "Back to portfolio" })}
            </Button>
          </Link>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6"
            style={{
              color: '#FCD000',
              textShadow: '0 0 30px rgba(252, 208, 0, 0.5)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 900,
              letterSpacing: '-0.02em'
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            XMET
          </motion.h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
            {translate({ ro: "Configurator modern pentru garduri și porți din aluminiu premium", en: "Modern configurator for premium aluminum fences and gates" })}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <motion.span
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{
                backgroundColor: 'rgba(252, 208, 0, 0.15)',
                color: '#FCD000',
                border: '1px solid rgba(252, 208, 0, 0.3)'
              }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(252, 208, 0, 0.25)' }}
            >
              React + TypeScript
            </motion.span>
            <motion.span
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{
                backgroundColor: 'rgba(252, 208, 0, 0.15)',
                color: '#FCD000',
                border: '1px solid rgba(252, 208, 0, 0.3)'
              }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(252, 208, 0, 0.25)' }}
            >
              {translate({ ro: "Configurator Multi-Step", en: "Multi-Step Configurator" })}
            </motion.span>
            <motion.span
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{
                backgroundColor: 'rgba(252, 208, 0, 0.15)',
                color: '#FCD000',
                border: '1px solid rgba(252, 208, 0, 0.3)'
              }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(252, 208, 0, 0.25)' }}
            >
              Glass Morphism
            </motion.span>
          </div>
        </motion.div>

        {/* Timeline */}
        <Timeline
          data={timelineData}
          title={translate({ ro: "Journey-ul XMET", en: "XMET Journey" })}
          subtitle={translate({ ro: "De la concept la platformă completă - configurator inteligent pentru produse premium", en: "From concept to complete platform - smart configurator for premium products" })}
        />

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-12"
        >
          <Card className="glass rounded-3xl p-8 md:p-12 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {translate({ ro: "Vrei un configurator similar?", en: "Want a similar configurator?" })}
            </h2>
            <p className="text-muted mb-8">
              {translate({ ro: "Hai să discutăm despre următorul tău proiect și să creăm o experiență premium pentru clienții tăi.", en: "Let's talk about your next project and create a premium experience for your clients." })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" variant="primary">
                  {translate({ ro: "Începe un proiect", en: "Start a project" })}
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button size="lg" variant="glass">
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
