import { motion } from "framer-motion"
import { ArrowLeft, Star, Sparkles, Award, Eye, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Timeline, type TimelineEntry } from "@/components/ui/timeline"
import { Link } from "react-router-dom"
import { useLanguage } from "@/contexts/language-context"

export function CarminaPage() {
  const { translate } = useLanguage()

  const timelineData: TimelineEntry[] = [
    {
      title: translate({ ro: "Overview", en: "Overview" }),
      content: (
        <Card className="glass" style={{ background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.95), rgba(20, 20, 20, 0.9))' }}>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold mb-4" style={{ color: '#C6A97E', letterSpacing: '0.1em', fontFamily: 'Cormorant Garamond, serif' }}>
                  Carmina Estela
                </h4>
                <p className="mb-6" style={{ color: '#F5EFE6', lineHeight: '1.6', fontWeight: 300 }}>
                  {translate({
                    ro: "Site web de lux pentru marochinărie haute couture. Design minimalist cu fundal noir absolu, accente champagne gold și tipografie elegantă Cormorant Garamond. Filosofia brandului: Discipline in Silence. Elegance without Noise.",
                    en: "Luxury website for haute couture leather goods. Minimalist design with absolute noir background, champagne gold accents and elegant Cormorant Garamond typography. Brand philosophy: Discipline in Silence. Elegance without Noise."
                  })}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold" style={{ color: '#C6A97E' }}>10</div>
                    <div className="text-sm" style={{ color: '#F5EFE6', opacity: 0.7 }}>{translate({ ro: "Pagini complete", en: "Complete pages" })}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold" style={{ color: '#C6A97E' }}>Luxury</div>
                    <div className="text-sm" style={{ color: '#F5EFE6', opacity: 0.7 }}>{translate({ ro: "Design minimalist", en: "Minimalist design" })}</div>
                  </div>
                </div>
                <div className="mt-6 p-4 rounded-xl" style={{ background: 'rgba(198, 169, 126, 0.1)', border: '1px solid rgba(198, 169, 126, 0.2)' }}>
                  <h5 className="font-semibold mb-2" style={{ color: '#C6A97E', letterSpacing: '0.1em' }}>{translate({ ro: "Tehnologii Folosite:", en: "Technologies Used:" })}</h5>
                  <div className="flex flex-wrap gap-2">
                    {["React 18", "TypeScript", "Vite", "Tailwind CSS", "shadcn-ui", "Framer Motion", "React Router"].map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(198, 169, 126, 0.15)', color: '#C6A97E' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl border" style={{ background: 'rgba(198, 169, 126, 0.05)', borderColor: 'rgba(198, 169, 126, 0.2)' }}>
                  <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#C6A97E', letterSpacing: '0.1em' }}>
                    <Award className="h-5 w-5" />
                    {translate({ ro: "Design Principles", en: "Design Principles" })}
                  </h5>
                  <ul className="text-sm space-y-2" style={{ color: '#F5EFE6', opacity: 0.9 }}>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#C6A97E' }}>•</span>
                      <span>{translate({ ro: "Minimalism cu focus pe detalii rafinate", en: "Minimalism with focus on refined details" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#C6A97E' }}>•</span>
                      <span>{translate({ ro: "Typography elegantă cu Cormorant Garamond", en: "Elegant typography with Cormorant Garamond" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#C6A97E' }}>•</span>
                      <span>{translate({ ro: "Paleta de culori exclusivistă: noir și champagne gold", en: "Exclusive color palette: noir and champagne gold" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#C6A97E' }}>•</span>
                      <span>{translate({ ro: "Animații subtile și discrete pentru eleganță", en: "Subtle and discreet animations for elegance" })}</span>
                    </li>
                  </ul>
                </div>
                <div className="p-5 rounded-2xl border" style={{ background: 'rgba(198, 169, 126, 0.05)', borderColor: 'rgba(198, 169, 126, 0.2)' }}>
                  <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#C6A97E', letterSpacing: '0.1em' }}>
                    <Sparkles className="h-5 w-5" />
                    {translate({ ro: "Feature-uri Premium", en: "Premium Features" })}
                  </h5>
                  <ul className="text-sm space-y-2" style={{ color: '#F5EFE6', opacity: 0.9 }}>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#C6A97E' }}>•</span>
                      <span>{translate({ ro: "Galerie de produse cu lightbox premium", en: "Product gallery with premium lightbox" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#C6A97E' }}>•</span>
                      <span>{translate({ ro: "Storytelling elegant pentru brand narrative", en: "Elegant storytelling for brand narrative" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#C6A97E' }}>•</span>
                      <span>{translate({ ro: "Contact form elegant cu validare avansată", en: "Elegant contact form with advanced validation" })}</span>
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
      title: translate({ ro: "Design Philosophy", en: "Design Philosophy" }),
      content: (
        <Card className="glass" style={{ background: 'rgba(10, 10, 10, 0.9)' }}>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold mb-4" style={{ color: '#C6A97E', letterSpacing: '0.1em', fontFamily: 'Cormorant Garamond, serif' }}>
                  {translate({ ro: "Filosofia Design-ului", en: "Design Philosophy" })}
                </h4>
                <p className="mb-6" style={{ color: '#F5EFE6', lineHeight: '1.6', fontWeight: 300 }}>
                  {translate({
                    ro: "Carmina Estela a fost cea mai rafinată provocare din portofoliul meu. Am creat un design care vorbește prin tăcere, noir absolu cu champagne gold, typography elegantă Cormorant Garamond, animații atât de subtile încât aproape că nu le observi... dar le simți. Fiecare pixel reflectă filosofia brandului: \"Discipline in Silence. Elegance without Noise.\"",
                    en: "Carmina Estela was the most refined challenge in my portfolio. I created a design that speaks through silence, absolute noir with champagne gold, elegant Cormorant Garamond typography, animations so subtle you almost don't notice them... but you feel them. Every pixel reflects the brand philosophy: \"Discipline in Silence. Elegance without Noise.\""
                  })}
                </p>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl" style={{ background: 'rgba(198, 169, 126, 0.05)', border: '1px solid rgba(198, 169, 126, 0.2)' }}>
                    <h5 className="font-semibold mb-2" style={{ color: '#C6A97E', letterSpacing: '0.1em' }}>{translate({ ro: "Paleta de Culori", en: "Color Palette" })}</h5>
                    <div className="flex gap-3 mt-3">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-lg" style={{ background: '#0A0A0A', border: '1px solid rgba(198, 169, 126, 0.3)' }}></div>
                        <span className="text-xs mt-1" style={{ color: '#F5EFE6', opacity: 0.7 }}>{translate({ ro: "Noir Absolu", en: "Absolute Noir" })}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-lg" style={{ background: '#C6A97E' }}></div>
                        <span className="text-xs mt-1" style={{ color: '#F5EFE6', opacity: 0.7 }}>Champagne Gold</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-lg" style={{ background: '#F5EFE6', border: '1px solid rgba(198, 169, 126, 0.3)' }}></div>
                        <span className="text-xs mt-1" style={{ color: '#F5EFE6', opacity: 0.7 }}>{translate({ ro: "Ivory Épuré", en: "Refined Ivory" })}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: 'rgba(198, 169, 126, 0.05)', border: '1px solid rgba(198, 169, 126, 0.2)' }}>
                    <h5 className="font-semibold mb-2" style={{ color: '#C6A97E', letterSpacing: '0.1em' }}>{translate({ ro: "Tipografie Elegantă", en: "Elegant Typography" })}</h5>
                    <p className="text-sm" style={{ color: '#F5EFE6', opacity: 0.8 }}>
                      {translate({
                        ro: "Cormorant Garamond pentru titluri, Helvetica Neue light pentru text, letter-spacing 0.1em-0.15em",
                        en: "Cormorant Garamond for headings, Helvetica Neue light for text, letter-spacing 0.1em-0.15em"
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl border" style={{ background: 'rgba(198, 169, 126, 0.05)', borderColor: 'rgba(198, 169, 126, 0.2)' }}>
                  <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#C6A97E', letterSpacing: '0.1em' }}>
                    <Award className="h-5 w-5" />
                    {translate({ ro: "Animații & Interacțiuni", en: "Animations & Interactions" })}
                  </h5>
                  <ul className="text-sm space-y-2" style={{ color: '#F5EFE6', opacity: 0.9 }}>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#C6A97E' }}>•</span>
                      <span>{translate({ ro: "Fade-in subtile la scroll pentru eleganță discretă", en: "Subtle fade-in on scroll for discreet elegance" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#C6A97E' }}>•</span>
                      <span>{translate({ ro: "Hover effects minimale care respectă designul sobru", en: "Minimal hover effects respecting sober design" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#C6A97E' }}>•</span>
                      <span>{translate({ ro: "Tranziții smooth între pagini pentru fluiditate", en: "Smooth transitions between pages for fluidity" })}</span>
                    </li>
                  </ul>
                </div>
                <div className="p-5 rounded-2xl border" style={{ background: 'rgba(198, 169, 126, 0.05)', borderColor: 'rgba(198, 169, 126, 0.2)' }}>
                  <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#C6A97E', letterSpacing: '0.1em' }}>
                    <Eye className="h-5 w-5" />
                    {translate({ ro: "Grid & Layout", en: "Grid & Layout" })}
                  </h5>
                  <ul className="text-sm space-y-2" style={{ color: '#F5EFE6', opacity: 0.9 }}>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#C6A97E' }}>•</span>
                      <span>{translate({ ro: "Layout asimetric pentru interes vizual", en: "Asymmetric layout for visual interest" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#C6A97E' }}>•</span>
                      <span>{translate({ ro: "Spațiere generoasă pentru respirație", en: "Generous spacing for breathing room" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#C6A97E' }}>•</span>
                      <span>{translate({ ro: "White space strategic pentru lux", en: "Strategic white space for luxury" })}</span>
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
      title: translate({ ro: "Paginile Site-ului", en: "Website Pages" }),
      content: (
        <Card className="glass" style={{ background: 'rgba(10, 10, 10, 0.9)' }}>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold mb-4" style={{ color: '#C6A97E', letterSpacing: '0.1em', fontFamily: 'Cormorant Garamond, serif' }}>
                  {translate({ ro: "10 Pagini Rafinate", en: "10 Refined Pages" })}
                </h4>
                <p className="mb-6" style={{ color: '#F5EFE6', lineHeight: '1.6', fontWeight: 300 }}>
                  {translate({
                    ro: "Am proiectat 10 pagini cu o disciplină artistică strictă: maximum 150 de cuvinte per secțiune, zero distracții vizuale, totul în serviciul storytelling-ului. Fiecare pagină respiră, de la Origins care povestește nașterea brandului până la Creations unde produsele vorbesc de la sine.",
                    en: "I designed 10 pages with strict artistic discipline: maximum 150 words per section, zero visual distractions, everything in service of storytelling. Every page breathes, from Origins telling the brand's birth story to Creations where products speak for themselves."
                  })}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { page: "Home", desc: translate({ ro: "Hero cu video background elegant", en: "Hero with elegant video background" }) },
                    { page: "Origins", desc: translate({ ro: "Istoria și originile brandului", en: "Brand history and origins" }) },
                    { page: "Path", desc: translate({ ro: "Călătoria Carmina Estela", en: "Carmina Estela journey" }) },
                    { page: "Maison", desc: translate({ ro: "Filosofia casei de modă", en: "Fashion house philosophy" }) },
                    { page: "Method", desc: translate({ ro: "Procesul CE Method detaliat", en: "Detailed CE Method process" }) },
                    { page: "Creations", desc: translate({ ro: "Galerie filtrabilă produse", en: "Filterable product gallery" }) },
                    { page: "Atelier", desc: translate({ ro: "Behind-the-scenes atelier", en: "Behind-the-scenes atelier" }) },
                    { page: "Press", desc: translate({ ro: "Premii și certificări", en: "Awards and certifications" }) },
                    { page: "Contact", desc: translate({ ro: "Formular vizionare privată", en: "Private viewing form" }) },
                    { page: "Legal", desc: translate({ ro: "Termeni și condiții", en: "Terms and conditions" }) }
                  ].map((item, index) => (
                    <div key={index} className="p-3 rounded-xl" style={{ background: 'rgba(198, 169, 126, 0.05)', border: '1px solid rgba(198, 169, 126, 0.2)' }}>
                      <h5 className="font-semibold text-sm" style={{ color: '#C6A97E', letterSpacing: '0.05em' }}>{item.page}</h5>
                      <p className="text-xs" style={{ color: '#F5EFE6', opacity: 0.7 }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl border" style={{ background: 'rgba(198, 169, 126, 0.05)', borderColor: 'rgba(198, 169, 126, 0.2)' }}>
                  <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#C6A97E', letterSpacing: '0.1em' }}>
                    <Sparkles className="h-5 w-5" />
                    {translate({ ro: "Structură & Navigație", en: "Structure & Navigation" })}
                  </h5>
                  <ul className="text-sm space-y-2" style={{ color: '#F5EFE6', opacity: 0.9 }}>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#C6A97E' }}>•</span>
                      <span>{translate({ ro: "Menu minimalist cu links discret poziționat", en: "Minimalist menu with discreetly positioned links" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#C6A97E' }}>•</span>
                      <span>{translate({ ro: "Footer elegant cu informații esențiale", en: "Elegant footer with essential information" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#C6A97E' }}>•</span>
                      <span>{translate({ ro: "Tranziții subtile între pagini pentru fluiditate", en: "Subtle transitions between pages for fluidity" })}</span>
                    </li>
                  </ul>
                </div>
                <div className="p-5 rounded-2xl border" style={{ background: 'rgba(198, 169, 126, 0.05)', borderColor: 'rgba(198, 169, 126, 0.2)' }}>
                  <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#C6A97E', letterSpacing: '0.1em' }}>
                    <Heart className="h-5 w-5" />
                    {translate({ ro: "Content Strategy", en: "Content Strategy" })}
                  </h5>
                  <ul className="text-sm space-y-2" style={{ color: '#F5EFE6', opacity: 0.9 }}>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#C6A97E' }}>•</span>
                      <span>{translate({ ro: "Storytelling elegant pentru brand narrative", en: "Elegant storytelling for brand narrative" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#C6A97E' }}>•</span>
                      <span>{translate({ ro: "Maximum 150 cuvinte per secțiune pentru concizie", en: "Maximum 150 words per section for conciseness" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#C6A97E' }}>•</span>
                      <span>{translate({ ro: "Focus pe artizanat, moștenire și excelență", en: "Focus on craftsmanship, heritage and excellence" })}</span>
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
      title: translate({ ro: "Animații & Interacțiuni", en: "Animations & Interactions" }),
      content: (
        <Card className="glass" style={{ background: 'rgba(10, 10, 10, 0.9)' }}>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold mb-4" style={{ color: '#C6A97E', letterSpacing: '0.1em', fontFamily: 'Cormorant Garamond, serif' }}>
                  {translate({ ro: "Experiență Luxoasă", en: "Luxurious Experience" })}
                </h4>
                <p className="mb-6" style={{ color: '#F5EFE6', lineHeight: '1.6', fontWeight: 300 }}>
                  {translate({
                    ro: "Animații sofisticate și tranziții elegante create cu Framer Motion. Efecte magnetic pentru butoane, shimmer subtil și glow pulse pentru cards.",
                    en: "Sophisticated animations and elegant transitions created with Framer Motion. Magnetic effects for buttons, subtle shimmer and glow pulse for cards."
                  })}
                </p>
                <div className="space-y-3">
                  <div className="p-3 rounded-xl" style={{ background: 'rgba(198, 169, 126, 0.05)', border: '1px solid rgba(198, 169, 126, 0.2)' }}>
                    <div className="flex items-center gap-3 mb-2">
                      <Sparkles className="h-5 w-5" style={{ color: '#C6A97E' }} />
                      <h5 className="font-semibold" style={{ color: '#F5EFE6', letterSpacing: '0.05em' }}>{translate({ ro: "Page Transitions", en: "Page Transitions" })}</h5>
                    </div>
                    <p className="text-sm" style={{ color: '#F5EFE6', opacity: 0.7 }}>{translate({ ro: "Smooth fade 0.6s cu blur subtil", en: "Smooth fade 0.6s with subtle blur" })}</p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: 'rgba(198, 169, 126, 0.05)', border: '1px solid rgba(198, 169, 126, 0.2)' }}>
                    <div className="flex items-center gap-3 mb-2">
                      <Eye className="h-5 w-5" style={{ color: '#C6A97E' }} />
                      <h5 className="font-semibold" style={{ color: '#F5EFE6', letterSpacing: '0.05em' }}>{translate({ ro: "Hover Effects", en: "Hover Effects" })}</h5>
                    </div>
                    <p className="text-sm" style={{ color: '#F5EFE6', opacity: 0.7 }}>{translate({ ro: "Champagne gold accent pe hover states", en: "Champagne gold accent on hover states" })}</p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: 'rgba(198, 169, 126, 0.05)', border: '1px solid rgba(198, 169, 126, 0.2)' }}>
                    <div className="flex items-center gap-3 mb-2">
                      <Heart className="h-5 w-5" style={{ color: '#C6A97E' }} />
                      <h5 className="font-semibold" style={{ color: '#F5EFE6', letterSpacing: '0.05em' }}>{translate({ ro: "Magnetic Buttons", en: "Magnetic Buttons" })}</h5>
                    </div>
                    <p className="text-sm" style={{ color: '#F5EFE6', opacity: 0.7 }}>{translate({ ro: "Efect magnetic cu ripple champagne gold", en: "Magnetic effect with champagne gold ripple" })}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(198, 169, 126, 0.1), rgba(198, 169, 126, 0.05))' }}>
                  <h5 className="font-semibold mb-3" style={{ color: '#C6A97E', letterSpacing: '0.1em' }}>{translate({ ro: "Scroll Effects", en: "Scroll Effects" })}</h5>
                  <ul className="text-sm space-y-2" style={{ color: '#F5EFE6', opacity: 0.8 }}>
                    <li>• {translate({ ro: "Luxury scroll progress indicator", en: "Luxury scroll progress indicator" })}</li>
                    <li>• {translate({ ro: "Smooth scroll behavior", en: "Smooth scroll behavior" })}</li>
                    <li>• {translate({ ro: "Lazy loading pentru imagini", en: "Lazy loading for images" })}</li>
                    <li>• {translate({ ro: "Fade reveal on scroll", en: "Fade reveal on scroll" })}</li>
                  </ul>
                </div>
                <div className="p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(198, 169, 126, 0.1), rgba(198, 169, 126, 0.05))' }}>
                  <h5 className="font-semibold mb-3" style={{ color: '#C6A97E', letterSpacing: '0.1em' }}>{translate({ ro: "Luxury Features", en: "Luxury Features" })}</h5>
                  <ul className="text-sm space-y-2" style={{ color: '#F5EFE6', opacity: 0.8 }}>
                    <li>• {translate({ ro: "Shimmer effect pentru elemente premium", en: "Shimmer effect for premium elements" })}</li>
                    <li>• {translate({ ro: "Soft glow pulse pentru cards", en: "Soft glow pulse for cards" })}</li>
                    <li>• {translate({ ro: "Elegant spacing (180px între secțiuni)", en: "Elegant spacing (180px between sections)" })}</li>
                    <li>• Mobile-first responsive design</li>
                  </ul>
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
        <Card className="glass" style={{ background: 'rgba(10, 10, 10, 0.9)' }}>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(198, 169, 126, 0.1), rgba(198, 169, 126, 0.05))' }}>
                <Award className="h-8 w-8 mx-auto mb-3" style={{ color: '#C6A97E' }} />
                <div className="text-3xl font-bold mb-2" style={{ color: '#F5EFE6' }}>10</div>
                <div className="text-sm" style={{ color: '#F5EFE6', opacity: 0.7 }}>{translate({ ro: "Pagini elegante", en: "Elegant pages" })}</div>
              </div>
              <div className="text-center p-6 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(198, 169, 126, 0.1), rgba(198, 169, 126, 0.05))' }}>
                <Star className="h-8 w-8 mx-auto mb-3" style={{ color: '#C6A97E' }} />
                <div className="text-3xl font-bold mb-2" style={{ color: '#F5EFE6' }}>Luxury</div>
                <div className="text-sm" style={{ color: '#F5EFE6', opacity: 0.7 }}>{translate({ ro: "Design minimalist", en: "Minimalist design" })}</div>
              </div>
              <div className="text-center p-6 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(198, 169, 126, 0.1), rgba(198, 169, 126, 0.05))' }}>
                <Sparkles className="h-8 w-8 mx-auto mb-3" style={{ color: '#C6A97E' }} />
                <div className="text-3xl font-bold mb-2" style={{ color: '#F5EFE6' }}>Premium</div>
                <div className="text-sm" style={{ color: '#F5EFE6', opacity: 0.7 }}>{translate({ ro: "Animații rafinate", en: "Refined animations" })}</div>
              </div>
              <div className="text-center p-6 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(198, 169, 126, 0.1), rgba(198, 169, 126, 0.05))' }}>
                <Eye className="h-8 w-8 mx-auto mb-3" style={{ color: '#C6A97E' }} />
                <div className="text-3xl font-bold mb-2" style={{ color: '#F5EFE6' }}>Elegant</div>
                <div className="text-sm" style={{ color: '#F5EFE6', opacity: 0.7 }}>{translate({ ro: "Experiență unică", en: "Unique experience" })}</div>
              </div>
            </div>
            <div className="mt-8 p-6 rounded-xl" style={{ background: 'rgba(198, 169, 126, 0.05)', border: '1px solid rgba(198, 169, 126, 0.2)' }}>
              <h5 className="text-lg font-semibold mb-4" style={{ color: '#C6A97E', letterSpacing: '0.1em' }}>{translate({ ro: "Impactul Proiectului", en: "Project Impact" })}</h5>
              <p style={{ color: '#F5EFE6', lineHeight: '1.6', fontWeight: 300 }}>
                {translate({
                  ro: "Acest proiect m-a învățat că adevăratul lux înseamnă reținere. Am lucrat luni întregi la detalii pe care majoritatea nu le vor observa conștient, letter-spacing perfect, tranziții de 600ms (nu 500, nu 700), gradient-uri atât de subtile încât par naturale. Rezultatul e un site care nu strigă \"lux\", ci îl emană. Noir absolu cu champagne gold. Nimic mai mult, nimic mai puțin. Perfecțiune prin simplitate.",
                  en: "This project taught me that true luxury means restraint. I spent months on details most won't consciously notice, perfect letter-spacing, 600ms transitions (not 500, not 700), gradients so subtle they seem natural. The result is a site that doesn't shout \"luxury\", it emanates it. Absolute noir with champagne gold. Nothing more, nothing less. Perfection through simplicity."
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      )
    }
  ]

  return (
    <div className="relative carmina-page" style={{ minHeight: '100vh', background: '#0A0A0A', fontFamily: 'Cormorant Garamond, serif' }}>
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 -z-10" style={{ background: '#0A0A0A', minHeight: '100%' }}></div>

      {/* Carmina Estela Luxury Styling */}
      <style>{`
        .carmina-page {
          background: #0A0A0A !important;
          color: #F5EFE6;
        }
        .carmina-page .glass {
          background: rgba(198, 169, 126, 0.05) !important;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(198, 169, 126, 0.15) !important;
        }
        .carmina-page .text-muted {
          color: rgba(245, 239, 230, 0.7) !important;
        }
        .carmina-page .text-foreground {
          color: #F5EFE6 !important;
        }
      `}</style>

      <div className="container-custom py-20 pt-32">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link to="/portfolio">
            <Button variant="ghost" size="sm" className="gap-2" style={{
              color: '#C6A97E',
              backgroundColor: 'rgba(198, 169, 126, 0.1)',
              border: '1px solid rgba(198, 169, 126, 0.2)'
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
          <h1 className="text-6xl md:text-8xl font-bold mb-6" style={{ color: '#C6A97E', letterSpacing: '0.1em', fontFamily: 'Cormorant Garamond, serif' }}>
            Carmina Estela
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-4" style={{ color: '#F5EFE6', lineHeight: '1.6', fontWeight: 300 }}>
            {translate({ ro: "Haute Maroquinerie, Design web de lux minimalist", en: "Haute Leather Goods, Minimalist luxury web design" })}
          </p>
          <p className="text-lg italic max-w-2xl mx-auto" style={{ color: '#C6A97E', letterSpacing: '0.15em' }}>
            "Discipline in Silence. Elegance without Noise."
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: 'rgba(198, 169, 126, 0.15)', color: '#C6A97E', letterSpacing: '0.05em' }}>
              Luxury Design
            </span>
            <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: 'rgba(198, 169, 126, 0.15)', color: '#C6A97E', letterSpacing: '0.05em' }}>
              {translate({ ro: "10 Pagini", en: "10 Pages" })}
            </span>
            <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: 'rgba(198, 169, 126, 0.15)', color: '#C6A97E', letterSpacing: '0.05em' }}>
              Minimalist
            </span>
          </div>
        </motion.div>

        {/* Timeline */}
        <Timeline
          data={timelineData}
          title={translate({ ro: "Journey-ul Carmina Estela", en: "Carmina Estela Journey" })}
          subtitle={translate({ ro: "De la concept la excelență, marochinărie haute couture în digital", en: "From concept to excellence, haute couture leather goods in digital" })}
        />

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-12"
        >
          <Card className="glass rounded-3xl p-8 md:p-12 max-w-2xl mx-auto" style={{ background: 'rgba(198, 169, 126, 0.05)', border: '1px solid rgba(198, 169, 126, 0.2)' }}>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#C6A97E', letterSpacing: '0.1em' }}>
              {translate({ ro: "Vrei un design de lux similar?", en: "Want a similar luxury design?" })}
            </h2>
            <p className="mb-8" style={{ color: '#F5EFE6', lineHeight: '1.6', fontWeight: 300 }}>
              {translate({ ro: "Hai să discutăm despre următorul tău proiect și să creăm o experiență elegantă și rafinată.", en: "Let's talk about your next project and create an elegant and refined experience." })}
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
