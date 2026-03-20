import { motion } from "framer-motion"
import { ArrowLeft, Star, Download, Camera, MessageSquare, FileText, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Timeline, type TimelineEntry } from "@/components/ui/timeline"
import { Link } from "react-router-dom"
import { useLanguage } from "@/contexts/language-context"

const timelineDataRo: TimelineEntry[] = [
  {
    title: "Overview",
    content: (
      <Card className="border-[#B8860B]/20 bg-gradient-to-br from-white/90 to-[#FFF8E7]/50">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-2xl font-bold text-[#2C1810] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                Proiectul Divine Skin
              </h4>
              <p className="text-[#4A3428] mb-6" style={{ lineHeight: '1.6' }}>
                Am creat un site web premium pentru Divine Skin, un salon de epilare definitivă din Timișoara. 
                Am ales o paletă de culori naturale , gold și green , pentru a transmite eleganță și profesionalism. 
                Fiecare element a fost gândit cu grijă pentru a reflecta experiența premium pe care o oferă salonul.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-[#B8860B]/10 to-[#2B7A3F]/10 rounded-xl border border-[#B8860B]/20">
                  <h5 className="font-semibold text-[#B8860B] mb-2 text-sm">Pagini</h5>
                  <p className="text-xs text-[#4A3428]">7 pagini complete optimizate</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-[#2B7A3F]/10 to-[#B8860B]/10 rounded-xl border border-[#2B7A3F]/20">
                  <h5 className="font-semibold text-[#2B7A3F] mb-2 text-sm">Design Language</h5>
                  <p className="text-xs text-[#4A3428]">Modern, curat, profesional</p>
                </div>
              </div>
              <div className="p-4 bg-[#B8860B]/10 rounded-xl border border-[#B8860B]/20">
                <h5 className="font-semibold text-[#2C1810] mb-3">Stack Tehnologic:</h5>
                <div className="flex flex-wrap gap-2">
                  {["React", "TypeScript", "Vite", "Tailwind CSS", "Radix UI", "Framer Motion", "React Router", "React Query", "Three.js", "HTML2PDF"].map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 bg-[#B8860B]/20 text-[#B8860B] rounded-full font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-5 bg-gradient-to-br from-[#B8860B]/10 to-[#2B7A3F]/10 rounded-2xl border border-[#B8860B]/20">
                <h5 className="font-semibold text-[#2C1810] mb-3 flex items-center gap-2">
                  <Download className="h-5 w-5 text-[#B8860B]" />
                  Paleta de Culori
                </h5>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg" style={{ background: '#B8860B' }}></div>
                    <div>
                      <p className="text-sm font-semibold text-[#2C1810]">Dark Goldenrod</p>
                      <p className="text-xs text-[#6B5D52]">#B8860B - Accent principal</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg" style={{ background: '#2B7A3F' }}></div>
                    <div>
                      <p className="text-sm font-semibold text-[#2C1810]">Forest Green</p>
                      <p className="text-xs text-[#6B5D52]">#2B7A3F - Accent secundar</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg border-2" style={{ background: '#FFF8E7', borderColor: '#B8860B' }}></div>
                    <div>
                      <p className="text-sm font-semibold text-[#2C1810]">Cream</p>
                      <p className="text-xs text-[#6B5D52]">#FFF8E7 - Background</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-gradient-to-br from-[#2B7A3F]/10 to-[#B8860B]/10 rounded-2xl border border-[#2B7A3F]/20">
                <h5 className="font-semibold text-[#2C1810] mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5 text-[#2B7A3F]" />
                  Tipografie & Style
                </h5>
                <ul className="text-sm text-[#4A3428] space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#2B7A3F] mt-1">•</span>
                    <span>Inter pentru text clean și modern</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2B7A3F] mt-1">•</span>
                    <span>Componente Radix UI pentru accesibilitate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2B7A3F] mt-1">•</span>
                    <span>Animații subtile cu Framer Motion</span>
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
    title: "Structura Site-ului",
    content: (
      <Card className="border-[#B8860B]/20 bg-gradient-to-br from-white/90 to-[#FFF8E7]/50">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-2xl font-bold text-[#2C1810] mb-4">7 Pagini Complete</h4>
              <p className="text-[#4A3428] mb-6">
                Am construit 7 pagini complete, fiecare cu un scop clar: de la homepage-ul care captează atenția 
                până la galeria before/after care construiește încredere. Fiecare pagină este optimizată pentru 
                experiența utilizatorului și conversie.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { page: "Home", desc: "Hero cu video, servicii, testimoniale", icon: <Camera className="h-4 w-4" /> },
                  { page: "Servicii", desc: "Prețuri detaliate, tehnologii laser", icon: <FileText className="h-4 w-4" /> },
                  { page: "Despre", desc: "Povestea salonului, echipa", icon: <MessageSquare className="h-4 w-4" /> },
                  { page: "Recenzii", desc: "Testimoniale video și text", icon: <Star className="h-4 w-4" /> },
                  { page: "Before/After", desc: "Galerie rezultate", icon: <Camera className="h-4 w-4" /> },
                  { page: "Prepare", desc: "Instrucțiuni pre-tratament", icon: <FileText className="h-4 w-4" /> },
                  { page: "Contact", desc: "Formular, hărți, program", icon: <MessageSquare className="h-4 w-4" /> }
                ].map((item, index) => (
                  <div key={index} className="p-3 bg-white/80 border border-[#B8860B]/20 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="text-[#B8860B]">{item.icon}</div>
                      <h5 className="font-semibold text-[#2C1810] text-sm">{item.page}</h5>
                    </div>
                    <p className="text-xs text-[#6B5D52]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-5 bg-gradient-to-br from-[#B8860B]/10 to-[#2B7A3F]/10 rounded-2xl border border-[#B8860B]/20">
                <h5 className="font-semibold text-[#2C1810] mb-3 flex items-center gap-2">
                  <Download className="h-5 w-5 text-[#B8860B]" />
                  Feature-uri Avansate
                </h5>
                <ul className="text-sm text-[#4A3428] space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] mt-1">•</span>
                    <span>PDF generation pentru programări și instrucțiuni</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] mt-1">•</span>
                    <span>Video backgrounds cu efecte de zoom pentru hero sections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] mt-1">•</span>
                    <span>Chatbot integration pentru răspunsuri automate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] mt-1">•</span>
                    <span>Interactive pricing calculator cu selecție servicii</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] mt-1">•</span>
                    <span>Structured Data pentru SEO optimizat și rich snippets</span>
                  </li>
                </ul>
              </div>
              <div className="p-5 bg-gradient-to-br from-[#2B7A3F]/10 to-[#B8860B]/10 rounded-2xl border border-[#2B7A3F]/20">
                <h5 className="font-semibold text-[#2C1810] mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5 text-[#2B7A3F]" />
                  Optimizări Implementate
                </h5>
                <ul className="text-sm text-[#4A3428] space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#2B7A3F] mt-1">•</span>
                    <span>Lazy loading pentru imagini și componente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2B7A3F] mt-1">•</span>
                    <span>Code splitting automat pentru viteza de încărcare</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2B7A3F] mt-1">•</span>
                    <span>Optimizare imagini cu format modern (WebP)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2B7A3F] mt-1">•</span>
                    <span>Meta tags dinamice pentru fiecare pagină</span>
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
    title: "Tehnologii Folosite",
    content: (
      <Card className="border-[#B8860B]/20 bg-gradient-to-br from-white/90 to-[#FFF8E7]/50">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-2xl font-bold text-[#2C1810] mb-4">Stack Tehnologic Complet</h4>
              <p className="text-[#4A3428] mb-6">
                Am ales un stack tehnologic modern care să asigure performanță maximă și experiență fluidă. 
                React pentru interactivitate, Framer Motion pentru animații naturale, și Three.js pentru efecte 
                vizuale memorabile. Tot ce am folosit a fost ales cu grijă pentru rezultate concrete.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-white/80 border border-[#B8860B]/20 rounded-2xl">
                  <h5 className="font-semibold text-[#B8860B] mb-2">Frontend</h5>
                  <div className="flex flex-wrap gap-2">
                    {["React 18", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"].map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 bg-[#B8860B]/10 text-[#B8860B] rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-white/80 border border-[#2B7A3F]/20 rounded-2xl">
                  <h5 className="font-semibold text-[#2B7A3F] mb-2">UI Components</h5>
                  <div className="flex flex-wrap gap-2">
                    {["Radix UI", "Lucide Icons", "Class Variance Authority", "Tailwind Merge"].map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 bg-[#2B7A3F]/10 text-[#2B7A3F] rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-white/80 border border-[#4A3428]/20 rounded-2xl">
                  <h5 className="font-semibold text-[#4A3428] mb-2">Funcționalități</h5>
                  <div className="flex flex-wrap gap-2">
                    {["React Router", "React Query", "Three.js", "HTML2PDF", "React Helmet"].map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 bg-[#4A3428]/10 text-[#4A3428] rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-[#B8860B]/10 to-[#2B7A3F]/10 rounded-2xl border border-[#B8860B]/20">
                <h5 className="font-semibold text-[#2C1810] mb-2">Performanță</h5>
                <ul className="text-sm text-[#4A3428] space-y-1">
                  <li>• Vite pentru build rapid</li>
                  <li>• Code splitting automat</li>
                  <li>• Optimizare imagini</li>
                  <li>• Lazy loading</li>
                </ul>
              </div>
              <div className="p-4 bg-gradient-to-r from-[#2B7A3F]/10 to-[#B8860B]/10 rounded-2xl border border-[#2B7A3F]/20">
                <h5 className="font-semibold text-[#2C1810] mb-2">SEO & Analytics</h5>
                <ul className="text-sm text-[#4A3428] space-y-1">
                  <li>• Structured Data (JSON-LD)</li>
                  <li>• Meta tags dinamice</li>
                  <li>• Sitemap XML</li>
                  <li>• Open Graph tags</li>
                </ul>
              </div>
              <div className="p-4 bg-gradient-to-r from-[#B8860B]/10 to-[#2B7A3F]/10 rounded-2xl border border-[#B8860B]/20">
                <h5 className="font-semibold text-[#2C1810] mb-2">UX Features</h5>
                <ul className="text-sm text-[#4A3428] space-y-1">
                  <li>• Animații fluide</li>
                  <li>• Responsive design</li>
                  <li>• PDF generation</li>
                  <li>• Video backgrounds</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  },
  {
    title: "Rezultate",
    content: (
      <Card className="border-[#B8860B]/20 bg-gradient-to-br from-white/90 to-[#FFF8E7]/50">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-[#B8860B]/10 to-[#2B7A3F]/10 rounded-2xl border border-[#B8860B]/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#B8860B]/20 flex items-center justify-center">
                  <Camera className="h-6 w-6 text-[#B8860B]" />
                </div>
                <h5 className="font-semibold text-[#2C1810] text-lg">Design Language</h5>
              </div>
              <p className="text-sm text-[#4A3428] leading-relaxed">
                Paletă naturală cu gold și green accents, design clean și profesional, tipografie modernă cu Inter, 
                animații subtile pentru fluiditate, glass morphism pentru depth.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-[#2B7A3F]/10 to-[#B8860B]/10 rounded-2xl border border-[#2B7A3F]/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#2B7A3F]/20 flex items-center justify-center">
                  <Star className="h-6 w-6 text-[#2B7A3F]" />
                </div>
                <h5 className="font-semibold text-[#2C1810] text-lg">Features Principale</h5>
              </div>
              <p className="text-sm text-[#4A3428] leading-relaxed">
                Video backgrounds pentru hero sections, pricing calculator interactiv, PDF generation pentru programări, 
                structured data pentru SEO, galerie before/after pentru testimoniale vizuale.
              </p>
            </div>
          </div>
          <div className="mt-8 p-6 bg-white/80 border border-[#B8860B]/20 rounded-xl">
            <h5 className="text-lg font-semibold text-[#2C1810] mb-4">Impactul Proiectului</h5>
            <p className="text-[#4A3428] mb-6">
              Am lucrat îndeaproape cu echipa Divine Skin pentru a crea un site care nu doar arată frumos, 
              ci funcționează impecabil. De la pricing calculator interactiv până la PDF generation pentru programări, 
              fiecare feature a fost implementat cu atenție la detalii și gândire strategică. 
              Rezultatul? Un site care atrage clienți și construiește încredere instant.
            </p>
            
            <div className="mt-8 pt-8 border-t-2 border-[#B8860B]/20 text-center">
              <h2 className="font-bold mb-4" style={{ 
                fontSize: "clamp(2rem, 6vw, 3.75rem)",
                background: 'linear-gradient(135deg, #B8860B, #2B7A3F)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Ești curios cum arată?
              </h2>
              <p className="text-[#4A3428] mb-6 text-lg">
                Explorează site-ul live și descoperă toate funcționalitățile Divine Skin.
              </p>
              <a 
                href="https://divineskin.ro" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Button size="lg" className="bg-gradient-to-r from-[#B8860B] to-[#2B7A3F] hover:from-[#9A7209] hover:to-[#236332] text-white px-8 py-6 text-lg">
                  <ExternalLink className="h-6 w-6" />
                  Vizită divineskin.ro
                </Button>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
];

const timelineDataEn: TimelineEntry[] = [
  {
    title: "Overview",
    content: (
      <Card className="border-[#B8860B]/20 bg-gradient-to-br from-white/90 to-[#FFF8E7]/50">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-2xl font-bold text-[#2C1810] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                Divine Skin Project
              </h4>
              <p className="text-[#4A3428] mb-6" style={{ lineHeight: '1.6' }}>
                I designed a premium website for Divine Skin, a laser hair removal studio from Timișoara.
                The palette mixes natural neutrals with gold and green highlights to communicate elegance and professionalism.
                Every section mirrors the premium experience clients get inside the studio.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-[#B8860B]/10 to-[#2B7A3F]/10 rounded-xl border border-[#B8860B]/20">
                  <h5 className="font-semibold text-[#B8860B] mb-2 text-sm">Pages</h5>
                  <p className="text-xs text-[#4A3428]">7 fully optimized pages</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-[#2B7A3F]/10 to-[#B8860B]/10 rounded-xl border border-[#2B7A3F]/20">
                  <h5 className="font-semibold text-[#2B7A3F] mb-2 text-sm">Design Language</h5>
                  <p className="text-xs text-[#4A3428]">Modern, clean, professional</p>
                </div>
              </div>
              <div className="p-4 bg-[#B8860B]/10 rounded-xl border border-[#B8860B]/20">
                <h5 className="font-semibold text-[#2C1810] mb-3">Tech Stack:</h5>
                <div className="flex flex-wrap gap-2">
                  {["React", "TypeScript", "Vite", "Tailwind CSS", "Radix UI", "Framer Motion", "React Router", "React Query", "Three.js", "HTML2PDF"].map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 bg-[#B8860B]/20 text-[#B8860B] rounded-full font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-5 bg-gradient-to-br from-[#B8860B]/10 to-[#2B7A3F]/10 rounded-2xl border border-[#B8860B]/20">
                <h5 className="font-semibold text-[#2C1810] mb-3 flex items-center gap-2">
                  <Download className="h-5 w-5 text-[#B8860B]" />
                  Color Palette
                </h5>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg" style={{ background: '#B8860B' }}></div>
                    <div>
                      <p className="text-sm font-semibold text-[#2C1810]">Dark Goldenrod</p>
                      <p className="text-xs text-[#6B5D52]">#B8860B - Primary accent</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg" style={{ background: '#2B7A3F' }}></div>
                    <div>
                      <p className="text-sm font-semibold text-[#2C1810]">Forest Green</p>
                      <p className="text-xs text-[#6B5D52]">#2B7A3F - Secondary accent</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg border-2" style={{ background: '#FFF8E7', borderColor: '#B8860B' }}></div>
                    <div>
                      <p className="text-sm font-semibold text-[#2C1810]">Cream</p>
                      <p className="text-xs text-[#6B5D52]">#FFF8E7 - Background tone</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-gradient-to-br from-[#2B7A3F]/10 to-[#B8860B]/10 rounded-2xl border border-[#2B7A3F]/20">
                <h5 className="font-semibold text-[#2C1810] mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5 text-[#2B7A3F]" />
                  Typography & Style
                </h5>
                <ul className="text-sm text-[#4A3428] space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#2B7A3F] mt-1">•</span>
                    <span>Inter keeps the copy crisp and modern</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2B7A3F] mt-1">•</span>
                    <span>Radix UI components guarantee accessibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2B7A3F] mt-1">•</span>
                    <span>Subtle Framer Motion animations</span>
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
    title: "Site Structure",
    content: (
      <Card className="border-[#B8860B]/20 bg-gradient-to-br from-white/90 to-[#FFF8E7]/50">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-2xl font-bold text-[#2C1810] mb-4">7 Full Pages</h4>
              <p className="text-[#4A3428] mb-6">
                We built seven focused pages—from the attention-grabbing homepage to a detailed before/after gallery.
                Every screen is optimized for conversions, trust, and a frictionless user experience.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { page: "Home", desc: "Video hero, services, testimonials", icon: <Camera className="h-4 w-4" /> },
                  { page: "Services", desc: "Detailed pricing, laser tech explained", icon: <FileText className="h-4 w-4" /> },
                  { page: "About", desc: "Salon story and team", icon: <MessageSquare className="h-4 w-4" /> },
                  { page: "Reviews", desc: "Video and written testimonials", icon: <Star className="h-4 w-4" /> },
                  { page: "Before/After", desc: "Results gallery", icon: <Camera className="h-4 w-4" /> },
                  { page: "Prepare", desc: "Pre-treatment instructions", icon: <FileText className="h-4 w-4" /> },
                  { page: "Contact", desc: "Form, map, schedule", icon: <MessageSquare className="h-4 w-4" /> }
                ].map((item, index) => (
                  <div key={index} className="p-3 bg-white/80 border border-[#B8860B]/20 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="text-[#B8860B]">{item.icon}</div>
                      <h5 className="font-semibold text-[#2C1810] text-sm">{item.page}</h5>
                    </div>
                    <p className="text-xs text-[#6B5D52]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-5 bg-gradient-to-br from-[#B8860B]/10 to-[#2B7A3F]/10 rounded-2xl border border-[#B8860B]/20">
                <h5 className="font-semibold text-[#2C1810] mb-3 flex items-center gap-2">
                  <Download className="h-5 w-5 text-[#B8860B]" />
                  Advanced Features
                </h5>
                <ul className="text-sm text-[#4A3428] space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] mt-1">•</span>
                    <span>PDF generation for appointments and prep guides</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] mt-1">•</span>
                    <span>Video backgrounds with cinematic zoom effects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] mt-1">•</span>
                    <span>Chatbot integration for instant replies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] mt-1">•</span>
                    <span>Interactive pricing calculator with service selector</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] mt-1">•</span>
                    <span>Structured Data for SEO and rich snippets</span>
                  </li>
                </ul>
              </div>
              <div className="p-5 bg-gradient-to-br from-[#2B7A3F]/10 to-[#B8860B]/10 rounded-2xl border border-[#2B7A3F]/20">
                <h5 className="font-semibold text-[#2C1810] mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5 text-[#2B7A3F]" />
                  Implemented Optimizations
                </h5>
                <ul className="text-sm text-[#4A3428] space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#2B7A3F] mt-1">•</span>
                    <span>Lazy loading for images and sections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2B7A3F] mt-1">•</span>
                    <span>Automatic code splitting for speed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2B7A3F] mt-1">•</span>
                    <span>Modern image formats (WebP)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2B7A3F] mt-1">•</span>
                    <span>Dynamic meta tags per page</span>
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
    title: "Technology Stack",
    content: (
      <Card className="border-[#B8860B]/20 bg-gradient-to-br from-white/90 to-[#FFF8E7]/50">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-2xl font-bold text-[#2C1810] mb-4">Full Stack Lineup</h4>
              <p className="text-[#4A3428] mb-6">
                A modern stack built for performance: React for interactivity, Framer Motion for natural motion,
                and Three.js for memorable visuals. Every tool was chosen for tangible results.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-white/80 border border-[#B8860B]/20 rounded-2xl">
                  <h5 className="font-semibold text-[#B8860B] mb-2">Frontend</h5>
                  <div className="flex flex-wrap gap-2">
                    {["React 18", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"].map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 bg-[#B8860B]/10 text-[#B8860B] rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-white/80 border border-[#2B7A3F]/20 rounded-2xl">
                  <h5 className="font-semibold text-[#2B7A3F] mb-2">UI Components</h5>
                  <div className="flex flex-wrap gap-2">
                    {["Radix UI", "Lucide Icons", "Class Variance Authority", "Tailwind Merge"].map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 bg-[#2B7A3F]/10 text-[#2B7A3F] rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-white/80 border border-[#4A3428]/20 rounded-2xl">
                  <h5 className="font-semibold text-[#4A3428] mb-2">Functionality</h5>
                  <div className="flex flex-wrap gap-2">
                    {["React Router", "React Query", "Three.js", "HTML2PDF", "React Helmet"].map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 bg-[#4A3428]/10 text-[#4A3428] rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-[#B8860B]/10 to-[#2B7A3F]/10 rounded-2xl border border-[#B8860B]/20">
                <h5 className="font-semibold text-[#2C1810] mb-2">Performance</h5>
                <ul className="text-sm text-[#4A3428] space-y-1">
                  <li>• Vite for blazing builds</li>
                  <li>• Automatic code splitting</li>
                  <li>• Image optimization</li>
                  <li>• Lazy loading</li>
                </ul>
              </div>
              <div className="p-4 bg-gradient-to-r from-[#2B7A3F]/10 to-[#B8860B]/10 rounded-2xl border border-[#2B7A3F]/20">
                <h5 className="font-semibold text-[#2C1810] mb-2">SEO & Analytics</h5>
                <ul className="text-sm text-[#4A3428] space-y-1">
                  <li>• Structured Data (JSON-LD)</li>
                  <li>• Dynamic meta tags</li>
                  <li>• XML sitemap</li>
                  <li>• Open Graph tags</li>
                </ul>
              </div>
              <div className="p-4 bg-gradient-to-r from-[#B8860B]/10 to-[#2B7A3F]/10 rounded-2xl border border-[#B8860B]/20">
                <h5 className="font-semibold text-[#2C1810] mb-2">UX Features</h5>
                <ul className="text-sm text-[#4A3428] space-y-1">
                  <li>• Fluid animations</li>
                  <li>• Responsive layouts</li>
                  <li>• PDF generation</li>
                  <li>• Video backgrounds</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  },
  {
    title: "Results",
    content: (
      <Card className="border-[#B8860B]/20 bg-gradient-to-br from-white/90 to-[#FFF8E7]/50">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-[#B8860B]/10 to-[#2B7A3F]/10 rounded-2xl border border-[#B8860B]/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#B8860B]/20 flex items-center justify-center">
                  <Camera className="h-6 w-6 text-[#B8860B]" />
                </div>
                <h5 className="font-semibold text-[#2C1810] text-lg">Design Language</h5>
              </div>
              <p className="text-sm text-[#4A3428] leading-relaxed">
                Natural palette with gold and green touches, clean professional layouts, Inter typography, 
                subtle transitions for flow, and glassmorphism cards for depth.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-[#2B7A3F]/10 to-[#B8860B]/10 rounded-2xl border border-[#2B7A3F]/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#2B7A3F]/20 flex items-center justify-center">
                  <Star className="h-6 w-6 text-[#2B7A3F]" />
                </div>
                <h5 className="font-semibold text-[#2C1810] text-lg">Key Features</h5>
              </div>
              <p className="text-sm text-[#4A3428] leading-relaxed">
                Cinematic hero videos, interactive pricing calculator, PDF appointment exports,
                structured data for SEO, and a before/after gallery for visual trust.
              </p>
            </div>
          </div>
          <div className="mt-8 p-6 bg-white/80 border border-[#B8860B]/20 rounded-xl">
            <h5 className="text-lg font-semibold text-[#2C1810] mb-4">Project Impact</h5>
            <p className="text-[#4A3428] mb-6">
              We teamed up closely with Divine Skin to craft a site that looks premium and works flawlessly.
              From the pricing calculator to automated PDFs, every feature was built with intention and polish.
              The result: a website that earns trust instantly and brings new clients in.
            </p>
            
            <div className="mt-8 pt-8 border-t-2 border-[#B8860B]/20 text-center">
              <h2 className="font-bold mb-4" style={{ 
                fontSize: "clamp(2rem, 6vw, 3.75rem)",
                background: 'linear-gradient(135deg, #B8860B, #2B7A3F)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Curious how it looks?
              </h2>
              <p className="text-[#4A3428] mb-6 text-lg">
                Open the live website and explore every Divine Skin feature.
              </p>
              <a 
                href="https://divineskin.ro" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Button size="lg" className="bg-gradient-to-r from-[#B8860B] to-[#2B7A3F] hover:from-[#9A7209] hover:to-[#236332] text-white px-8 py-6 text-lg">
                  <ExternalLink className="h-6 w-6" />
                  Visit divineskin.ro
                </Button>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
];

export function DivinePage() {
  const { language, translate } = useLanguage()
  const timelineData = language === "ro" ? timelineDataRo : timelineDataEn

  return (
    <div className="relative" style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #FFFFFF, #FFF8E7)', fontFamily: 'Inter, sans-serif' }}>
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 -z-10" style={{ background: 'linear-gradient(to bottom, #FFFFFF, #FFF8E7)', minHeight: '100%' }}></div>
      
      <div className="container-custom py-20 pt-32">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link to="/portfolio">
            <Button variant="ghost" size="sm" className="gap-2 text-[#B8860B] hover:text-[#2C1810] hover:bg-[#B8860B]/10">
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
          <h1 className="text-6xl md:text-8xl font-bold text-[#2C1810] mb-6">
            Divine Skin
          </h1>
          <p className="text-xl md:text-2xl text-[#4A3428] max-w-3xl mx-auto">
            {translate({
              ro: "Salon de epilare definitivă premium cu site web modern - 7 pagini complete, React + TypeScript, SEO optimizat",
              en: "Premium laser hair removal studio with a modern site — 7 full pages, React + TypeScript, SEO ready."
            })}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <span className="px-4 py-2 bg-[#B8860B]/20 text-[#B8860B] rounded-full text-sm font-medium">
              React + TypeScript
            </span>
            <span className="px-4 py-2 bg-[#2B7A3F]/20 text-[#2B7A3F] rounded-full text-sm font-medium">
              {translate({ ro: "7 Pagini Complete", en: "7 Complete Pages" })}
            </span>
            <span className="px-4 py-2 bg-[#B8860B]/20 text-[#B8860B] rounded-full text-sm font-medium">
              {translate({ ro: "SEO Optimizat", en: "SEO Optimized" })}
            </span>
            <span className="px-4 py-2 bg-[#2B7A3F]/20 text-[#2B7A3F] rounded-full text-sm font-medium">
              Mobile Responsive
            </span>
          </div>
        </motion.div>

        {/* Timeline */}
        <Timeline 
          data={timelineData}
          title={translate({ ro: "Journey-ul Divine Skin", en: "Divine Skin Journey" })}
          subtitle={translate({
            ro: "De la concept la succes - povestea completă a transformării digitale",
            en: "From concept to results—the full story of this digital transformation.",
          })}
        />

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-12"
        >
          <Card className="rounded-3xl p-8 md:p-12 max-w-2xl mx-auto bg-gradient-to-br from-[#B8860B]/10 to-[#2B7A3F]/10 border-[#B8860B]/30">
            <h2 className="text-3xl font-bold text-[#2C1810] mb-4">
              {translate({ ro: "Vrei ceva similar?", en: "Want something similar?" })}
            </h2>
            <p className="text-[#4A3428] mb-8">
              {translate({
                ro: "Hai să discutăm despre următorul tău proiect și să îl facem la fel de impresionant.",
                en: "Let's talk about your next project and make it just as impressive.",
              })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-[#B8860B] hover:bg-[#9A7209] text-white">
                  {translate({ ro: "Începe un proiect", en: "Start a project" })}
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button size="lg" variant="outline" className="border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B]/10">
                  {translate({ ro: "Vezi alte proiecte", en: "See more projects" })}
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
