import { motion } from "framer-motion"
import { ArrowLeft, Star, Palette, Briefcase, Eye, Sparkles, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Timeline, type TimelineEntry } from "@/components/ui/timeline"
import { ProjectLiveSiteLink } from "@/components/ui/project-live-site-link"
import { Link } from "react-router-dom"
import { Localized } from "@/components/localized"

const timelineData: TimelineEntry[] = [
  {
    title: <Localized ro="Overview" en="Overview" />,
    content: (
      <Localized
        ro={(
          <Card className="glass" style={{ background: 'rgba(10, 10, 10, 0.9)', border: '1px solid rgba(255, 111, 0, 0.3)' }}>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-2xl font-bold mb-4" style={{ color: '#FF6F00' }}>
                    Proiectul Ruethis Design
                  </h4>
                  <p className="mb-6" style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                    Am creat un brand vizual puternic pentru Ruethis Design, un studio specializat în identități vizuale. 
                    Am ales orange vibrant pe fundal negru , o combinație bold care transmite creativitate și energie. 
                    Site-ul este un portofoliu live care prezintă fiecare logo cu mândrie și impact maxim.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                      <h5 className="font-semibold mb-2 text-sm" style={{ color: '#FF6F00' }}>Pagini</h5>
                      <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Home, Portfolio, Servicii, Contact</p>
                    </div>
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                      <h5 className="font-semibold mb-2 text-sm" style={{ color: '#FF6F00' }}>Design Language</h5>
                      <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Bold, vibrant, modern</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.05)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                    <h5 className="font-semibold mb-3" style={{ color: '#FF6F00' }}>Stack Tehnologic:</h5>
                    <div className="flex flex-wrap gap-2">
                      {["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Radix UI"].map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(255, 111, 0, 0.15)', color: '#FF6F00' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                    <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#FF6F00' }}>
                      <Palette className="h-5 w-5" />
                      Paleta de Culori
                    </h5>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg" style={{ background: '#FF6F00' }}></div>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Vibrant Orange</p>
                          <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>#FF6F00 - Accent principal</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg" style={{ background: '#0a0a0a' }}></div>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Deep Black</p>
                          <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>#0a0a0a - Background</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                    <h5 className="font-semibold mb-3" style={{ color: '#FF6F00' }}>Tipografie & Style</h5>
                    <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Font modern cu weight variations, glass morphism pentru depth, animații fluide, contrast puternic orange/black.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        en={(
          <Card className="glass" style={{ background: 'rgba(10, 10, 10, 0.9)', border: '1px solid rgba(255, 111, 0, 0.3)' }}>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-2xl font-bold mb-4" style={{ color: '#FF6F00' }}>
                    Ruethis Design Project
                  </h4>
                  <p className="mb-6" style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                    I crafted a bold visual identity for Ruethis Design, a studio focused on premium brand systems.
                    Vibrant orange over a deep black base delivers an energetic, fearless vibe.
                    The site is a living portfolio where every logo is showcased with pride and maximum impact.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                      <h5 className="font-semibold mb-2 text-sm" style={{ color: '#FF6F00' }}>Pages</h5>
                      <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Home, Portfolio, Services, Contact</p>
                    </div>
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                      <h5 className="font-semibold mb-2 text-sm" style={{ color: '#FF6F00' }}>Design Language</h5>
                      <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Bold, vibrant, modern</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.05)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                    <h5 className="font-semibold mb-3" style={{ color: '#FF6F00' }}>Tech Stack</h5>
                    <div className="flex flex-wrap gap-2">
                      {["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Radix UI"].map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(255, 111, 0, 0.15)', color: '#FF6F00' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                    <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#FF6F00' }}>
                      <Palette className="h-5 w-5" />
                      Color Palette
                    </h5>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg" style={{ background: '#FF6F00' }}></div>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Vibrant Orange</p>
                          <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>#FF6F00 - Primary accent</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg" style={{ background: '#0a0a0a' }}></div>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Deep Black</p>
                          <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>#0a0a0a - Background</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                    <h5 className="font-semibold mb-3" style={{ color: '#FF6F00' }}>Typography & Style</h5>
                    <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Modern font with bold weight contrasts, glass morphism depth, fluid animations, and a striking orange/black contrast.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      />
    )
  },
  {
    title: <Localized ro="Homepage Design" en="Homepage Design" />,
    content: (
      <Localized
        ro={(
          <Card className="glass" style={{ background: 'rgba(10, 10, 10, 0.9)', border: '1px solid rgba(255, 111, 0, 0.3)' }}>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-2xl font-bold mb-4" style={{ color: '#FF6F00' }}>Pagina Principală</h4>
                  <p className="mb-6" style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                    Am conceput homepage-ul să comunice instant valoarea: "Designer Logo Premium | Identitate Vizuală Memorabilă". 
                    Fiecare secțiune ghidează vizitatorul de la inspirație la acțiune , de la galeria de logo-uri create 
                    până la pachetele de servicii clare și accesibile.
                  </p>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <Star className="h-5 w-5" style={{ color: '#FF6F00' }} />
                        <h5 className="font-semibold" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Hero Section</h5>
                      </div>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Mesaj puternic: "Designer Logo Premium | Identitate Vizuală Memorabilă"</p>
                    </div>
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <Palette className="h-5 w-5" style={{ color: '#FF6F00' }} />
                        <h5 className="font-semibold" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Logo Showcase</h5>
                      </div>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Galerie cu cele mai bune logo-uri create</p>
                    </div>
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <Briefcase className="h-5 w-5" style={{ color: '#FF6F00' }} />
                        <h5 className="font-semibold" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Servicii</h5>
                      </div>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>3 pachete: Logo (299 RON), Brand (599 RON), Premium (999 RON)</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                    <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#FF6F00' }}>
                      <Sparkles className="h-5 w-5" />
                      Design Elements
                    </h5>
                    <ul className="text-sm space-y-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>Glass morphism cu backdrop blur pentru cards</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>Gradient animations pentru background</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>Hover effects pe logo cards</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>Smooth scroll și parallax effects</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                    <h5 className="font-semibold mb-3" style={{ color: '#FF6F00' }}>Features Unice</h5>
                    <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Interactive pricing tables, testimoniale de la clienți, portfolio filtering, 
                      contact form cu validare avansată.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        en={(
          <Card className="glass" style={{ background: 'rgba(10, 10, 10, 0.9)', border: '1px solid rgba(255, 111, 0, 0.3)' }}>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-2xl font-bold mb-4" style={{ color: '#FF6F00' }}>Homepage</h4>
                  <p className="mb-6" style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                    The homepage communicates value immediately: "Premium Logo Designer | Memorable Visual Identity".
                    Every section guides visitors from inspiration to action, from the curated logo gallery
                    to transparent, easy-to-understand service packages.
                  </p>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <Star className="h-5 w-5" style={{ color: '#FF6F00' }} />
                        <h5 className="font-semibold" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Hero Section</h5>
                      </div>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Statement headline: "Premium Logo Designer | Memorable Visual Identity"</p>
                    </div>
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <Palette className="h-5 w-5" style={{ color: '#FF6F00' }} />
                        <h5 className="font-semibold" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Logo Showcase</h5>
                      </div>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Gallery with the most impactful logo work</p>
                    </div>
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <Briefcase className="h-5 w-5" style={{ color: '#FF6F00' }} />
                        <h5 className="font-semibold" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Services</h5>
                      </div>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Three packages: Logo (299 RON), Brand (599 RON), Premium (999 RON)</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                    <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#FF6F00' }}>
                      <Sparkles className="h-5 w-5" />
                      Design Elements
                    </h5>
                    <ul className="text-sm space-y-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>Glass-morphism cards with backdrop blur</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>Animated gradients flowing across the background</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>Playful hover reactions on every logo card</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>Smooth scrolling with subtle parallax effects</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                    <h5 className="font-semibold mb-3" style={{ color: '#FF6F00' }}>Unique Features</h5>
                    <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Interactive pricing tables, client testimonials, portfolio filtering,
                      and a contact form with advanced validation.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      />
    )
  },
  {
    title: <Localized ro="Portfolio Gallery" en="Portfolio Gallery" />,
    content: (
      <Localized
        ro={(
          <Card className="glass" style={{ background: 'rgba(10, 10, 10, 0.9)', border: '1px solid rgba(255, 111, 0, 0.3)' }}>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-2xl font-bold mb-4" style={{ color: '#FF6F00' }}>Portofoliu Logo Design</h4>
                  <p className="mb-6" style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                    Galerie curată și impactantă cu logo-uri create pentru branduri din diverse industrii. 
                    Fiecare logo este prezent cu case study și insight în procesul creativ.
                  </p>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <h5 className="font-semibold mb-2" style={{ color: '#FF6F00' }}>Grid Interactiv</h5>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Masonry layout responsive cu hover effects și filtering pe categorii</p>
                    </div>
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <h5 className="font-semibold mb-2" style={{ color: '#FF6F00' }}>Project Details</h5>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Modal expandabil cu proces creativ și inspirație pentru fiecare logo</p>
                    </div>
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <h5 className="font-semibold mb-2" style={{ color: '#FF6F00' }}>Categorii</h5>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Filtrare pe: E-commerce, Corporate, Startup, Restaurant, Tech</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                    <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#FF6F00' }}>
                      <Eye className="h-5 w-5" />
                      User Experience
                    </h5>
                    <ul className="text-sm space-y-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>Lightbox pentru vizualizare detaliată a logo-urilor</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>Lazy loading pentru performanță optimă</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>Smooth scroll și section transitions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>Mobile-first responsive design</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                    <h5 className="font-semibold mb-3" style={{ color: '#FF6F00' }}>Visual Impact</h5>
                    <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Palette vibrantă orange pe fundal negru profund creează contrast maxim și impact vizual memorabil.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        en={(
          <Card className="glass" style={{ background: 'rgba(10, 10, 10, 0.9)', border: '1px solid rgba(255, 111, 0, 0.3)' }}>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-2xl font-bold mb-4" style={{ color: '#FF6F00' }}>Logo Portfolio</h4>
                  <p className="mb-6" style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                    A clean, high-impact gallery featuring logos for brands across multiple industries.
                    Every piece is paired with a short case study and insight into the creative process.
                  </p>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <h5 className="font-semibold mb-2" style={{ color: '#FF6F00' }}>Interactive Grid</h5>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Responsive masonry layout with hover effects and category filters</p>
                    </div>
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <h5 className="font-semibold mb-2" style={{ color: '#FF6F00' }}>Project Details</h5>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Expandable modal with creative process notes for each logo</p>
                    </div>
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <h5 className="font-semibold mb-2" style={{ color: '#FF6F00' }}>Categories</h5>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Filter options: E-commerce, Corporate, Startup, Restaurant, Tech</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                    <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#FF6F00' }}>
                      <Eye className="h-5 w-5" />
                      User Experience
                    </h5>
                    <ul className="text-sm space-y-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>Lightbox for detailed logo previews</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>Lazy loading for optimal performance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>Smooth scrolling with section transitions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>Mobile-first responsive design</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                    <h5 className="font-semibold mb-3" style={{ color: '#FF6F00' }}>Visual Impact</h5>
                    <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Vibrant orange on a deep black canvas delivers maximum contrast and an unforgettable visual punch.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      />
    )
  },
  {
    title: <Localized ro="Servicii & Pricing" en="Services & Pricing" />,
    content: (
      <Localized
        ro={(
          <Card className="glass" style={{ background: 'rgba(10, 10, 10, 0.9)', border: '1px solid rgba(255, 111, 0, 0.3)' }}>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-2xl font-bold mb-4" style={{ color: '#FF6F00' }}>Pachete de Servicii</h4>
                  <p className="mb-6" style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                    Trei pachete clare pentru diferite nevoi: de la design logo simplu până la identitate vizuală completă.
                    Prețuri transparente și revizuiri nelimitate pentru satisfacție garantată.
                  </p>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold" style={{ color: '#FF6F00' }}>Design Logo Principal</h5>
                        <span className="text-lg font-bold" style={{ color: '#FF6F00' }}>299 RON</span>
                      </div>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Logo complet cu 3 concepte inițiale și revizuiri nelimitate</p>
                    </div>
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold" style={{ color: '#FF6F00' }}>Pachet Brand Complet</h5>
                        <span className="text-lg font-bold" style={{ color: '#FF6F00' }}>599 RON</span>
                      </div>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Identitate vizuală completă cu logo, paletă de culori și tipografie</p>
                    </div>
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold" style={{ color: '#FF6F00' }}>Pachet Premium</h5>
                        <span className="text-lg font-bold" style={{ color: '#FF6F00' }}>999 RON</span>
                      </div>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Soluție completă pentru lansarea brandului tău</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                    <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#FF6F00' }}>
                      <Sparkles className="h-5 w-5" />
                      Procesul de Lucru
                    </h5>
                    <ul className="text-sm space-y-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>Consultație inițială pentru înțelegerea brandului</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>3 concepte inițiale în 3-5 zile</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>Revizuiri nelimitate până la satisfacție totală</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>Livrare fișiere în toate formatele necesare</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                    <h5 className="font-semibold mb-3" style={{ color: '#FF6F00' }}>Interactive Features</h5>
                    <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Pricing calculator interactiv, formular de contact cu validare, secțiune testimoniale.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        en={(
          <Card className="glass" style={{ background: 'rgba(10, 10, 10, 0.9)', border: '1px solid rgba(255, 111, 0, 0.3)' }}>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-2xl font-bold mb-4" style={{ color: '#FF6F00' }}>Service Packages</h4>
                  <p className="mb-6" style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                    Three transparent packages for different needs, from a focused logo to a complete identity.
                    Clear pricing and unlimited revisions for total peace of mind.
                  </p>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold" style={{ color: '#FF6F00' }}>Primary Logo Design</h5>
                        <span className="text-lg font-bold" style={{ color: '#FF6F00' }}>299 RON</span>
                      </div>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Three initial concepts + unlimited revisions</p>
                    </div>
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold" style={{ color: '#FF6F00' }}>Full Brand Package</h5>
                        <span className="text-lg font-bold" style={{ color: '#FF6F00' }}>599 RON</span>
                      </div>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Logo, color palette, typography, and usage guide</p>
                    </div>
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold" style={{ color: '#FF6F00' }}>Premium Package</h5>
                        <span className="text-lg font-bold" style={{ color: '#FF6F00' }}>999 RON</span>
                      </div>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Complete launch kit for bold brands</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                    <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#FF6F00' }}>
                      <Sparkles className="h-5 w-5" />
                      Workflow
                    </h5>
                    <ul className="text-sm space-y-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>Discovery call to understand the story</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>3 concepts delivered within 3-5 days</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>Unlimited revisions until it's perfect</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>Delivery in every format you need</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                    <h5 className="font-semibold mb-3" style={{ color: '#FF6F00' }}>Interactive Features</h5>
                    <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Interactive pricing calculator, validated contact form, and a testimonial carousel.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      />
    )
  },
  {
    title: <Localized ro="Design System" en="Design System" />,
    content: (
      <Localized
        ro={(
          <Card className="glass" style={{ background: 'rgba(10, 10, 10, 0.9)', border: '1px solid rgba(255, 111, 0, 0.3)' }}>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-2xl font-bold mb-4" style={{ color: '#FF6F00' }}>Identitate Vizuală</h4>
                  <p className="mb-6" style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                    Design system consistent cu focus pe contrast și readability. Orange vibrant (#FF6F00) 
                    pe fundal negru profund pentru impact maxim și memorabilitate.
                  </p>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <h5 className="font-semibold mb-2" style={{ color: '#FF6F00' }}>Typography</h5>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Font modern cu weight variations pentru hierarchy clară</p>
                    </div>
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <h5 className="font-semibold mb-2" style={{ color: '#FF6F00' }}>Components</h5>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Glass morphism cards, gradient buttons, animated icons</p>
                    </div>
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <h5 className="font-semibold mb-2" style={{ color: '#FF6F00' }}>Animations</h5>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Framer Motion pentru tranziții fluide și micro-interacțiuni</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                    <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#FF6F00' }}>
                      <Palette className="h-5 w-5" />
                      Color Psychology
                    </h5>
                    <ul className="text-sm space-y-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>Orange reprezintă creativitate și energie</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>Negru adaugă profesionalism și eleganță</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>Contrast puternic pentru vizibilitate maximă</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                    <h5 className="font-semibold mb-3" style={{ color: '#FF6F00' }}>Responsive Design</h5>
                    <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Layout adaptat perfect pentru mobile, tablet și desktop. Grid responsiv cu breakpoints optimizate.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        en={(
          <Card className="glass" style={{ background: 'rgba(10, 10, 10, 0.9)', border: '1px solid rgba(255, 111, 0, 0.3)' }}>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-2xl font-bold mb-4" style={{ color: '#FF6F00' }}>Visual Identity</h4>
                  <p className="mb-6" style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                    A consistent system built for contrast and readability. Vibrant orange (#FF6F00)
                    on deep black to keep every screen memorable.
                  </p>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <h5 className="font-semibold mb-2" style={{ color: '#FF6F00' }}>Typography</h5>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Modern font with clear hierarchy and weight play</p>
                    </div>
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <h5 className="font-semibold mb-2" style={{ color: '#FF6F00' }}>Components</h5>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Glass-morphism cards, gradient buttons, animated icons</p>
                    </div>
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <h5 className="font-semibold mb-2" style={{ color: '#FF6F00' }}>Animations</h5>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Framer Motion transitions and micro-interactions</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                    <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#FF6F00' }}>
                      <Palette className="h-5 w-5" />
                      Color Psychology
                    </h5>
                    <ul className="text-sm space-y-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>Orange stands for creativity and bold energy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>Black adds elegance and trust</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1" style={{ color: '#FF6F00' }}>•</span>
                        <span>High contrast keeps everything legible</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                    <h5 className="font-semibold mb-3" style={{ color: '#FF6F00' }}>Responsive Design</h5>
                    <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Perfectly tuned layout for mobile, tablet, and desktop with optimized breakpoints.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      />
    )
  },
  {
    title: <Localized ro="Pagina de Contact" en="Contact Page" />,
    content: (
      <Localized
        ro={(
          <Card className="glass" style={{ background: 'rgba(10, 10, 10, 0.9)', border: '1px solid rgba(255, 111, 0, 0.3)' }}>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-2xl font-bold mb-4" style={{ color: '#FF6F00' }}>Formular de Contact</h4>
                  <p className="mb-6" style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                    Pagina de contact include un formular detaliat pentru brief-ul de proiect și informații complete 
                    despre disponibilitate și modalități de colaborare.
                  </p>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <h5 className="font-semibold mb-2" style={{ color: '#FF6F00' }}>Form Fields</h5>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Nume, Email, Tip proiect, Buget, Descriere detaliată</p>
                    </div>
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <h5 className="font-semibold mb-2" style={{ color: '#FF6F00' }}>Validare</h5>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Validare în timp real cu mesaje de eroare clare și helpful</p>
                    </div>
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <h5 className="font-semibold mb-2" style={{ color: '#FF6F00' }}>Success State</h5>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Animație de confirmare și mesaj de mulțumire personalizat</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                    <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#FF6F00' }}>
                      <Briefcase className="h-5 w-5" />
                      Program & Disponibilitate
                    </h5>
                    <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Program afișat: Luni-Vineri 09:00-18:00. Răspuns în maxim 24h pentru toate solicitările. 
                      Consultație gratuită de 30 minute pentru fiecare proiect nou.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                    <h5 className="font-semibold mb-3" style={{ color: '#FF6F00' }}>Design Form</h5>
                    <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Formular stilizat cu inputs custom, focus states cu orange glow, submit button cu gradient și hover effect.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        en={(
          <Card className="glass" style={{ background: 'rgba(10, 10, 10, 0.9)', border: '1px solid rgba(255, 111, 0, 0.3)' }}>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-2xl font-bold mb-4" style={{ color: '#FF6F00' }}>Project Brief Form</h4>
                  <p className="mb-6" style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                    The contact page collects everything needed for a project brief plus schedule and collaboration details.
                  </p>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <h5 className="font-semibold mb-2" style={{ color: '#FF6F00' }}>Form Fields</h5>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Name, Email, Project type, Budget, Detailed brief</p>
                    </div>
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <h5 className="font-semibold mb-2" style={{ color: '#FF6F00' }}>Validation</h5>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Real-time validation with friendly error messages</p>
                    </div>
                    <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <h5 className="font-semibold mb-2" style={{ color: '#FF6F00' }}>Success State</h5>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Animated confirmation with a personalized thank-you note</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                    <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#FF6F00' }}>
                      <Briefcase className="h-5 w-5" />
                      Schedule & Availability
                    </h5>
                    <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Monday-Friday 09:00-18:00. Replies within 24h. Every new project starts with a free 30-minute call.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                    <h5 className="font-semibold mb-3" style={{ color: '#FF6F00' }}>Form Styling</h5>
                    <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Custom inputs, orange focus glow, and a gradient submit button with a bold hover state.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      />
    )
  },
  {
    title: <Localized ro="Rezultate" en="Results" />,
    content: (
      <Localized
        ro={(
          <Card className="glass" style={{ background: 'rgba(10, 10, 10, 0.9)', border: '1px solid rgba(255, 111, 0, 0.3)' }}>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <Palette className="h-6 w-6" style={{ color: '#FF6F00' }} />
                    </div>
                    <h5 className="font-semibold text-lg" style={{ color: '#FF6F00' }}>Design Language</h5>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Orange vibrant pe negru profund pentru contrast maxim, glass morphism pentru depth, 
                    typography modern cu hierarchy clară, animații fluide cu Framer Motion.
                  </p>
                </div>
                <div className="p-6 rounded-2xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <Star className="h-6 w-6" style={{ color: '#FF6F00' }} />
                    </div>
                    <h5 className="font-semibold text-lg" style={{ color: '#FF6F00' }}>Features Principale</h5>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Portfolio interactiv cu filtering, pricing calculator pentru pachete, secțiune testimoniale, 
                    formular de contact avansat, SEO optimization complet.
                  </p>
                </div>
              </div>
              <div className="mt-8 p-6 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.05)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                <h5 className="text-lg font-semibold mb-4" style={{ color: '#FF6F00' }}>Impactul Proiectului</h5>
                <p className="mb-6" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  Am pus suflet în acest proiect. Orange-ul vibrant pe negru nu e doar o alegere estetică , 
                  e o declarație. Fiecare animație, fiecare tranziție a fost implementată pentru a crea o experiență 
                  care rămâne în minte. De la glassmorphism subtil până la hover effects perfect calibrate, 
                  totul comunică profesionalism și creativitate.
                </p>
                
                <div className="mt-8 pt-8 border-t-2" style={{ borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                  <div className="text-center">
                    <h2 className="font-bold mb-4" style={{ 
                      fontSize: "clamp(2rem, 6vw, 3.75rem)",
                      background: 'linear-gradient(135deg, #FF6F00, #FF8F00)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      Ești curios cum arată?
                    </h2>
                    <p className="mb-6 text-lg" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Explorează site-ul live și descoperă serviciile de design logo premium.
                    </p>
                    <a 
                      href="https://ruethisdesign.ro" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <Button size="lg" className="px-8 py-6 text-lg" style={{ backgroundColor: '#FF6F00', color: '#000', fontWeight: 700 }}>
                        <ExternalLink className="h-6 w-6" />
                        Vizită ruethisdesign.ro
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        en={(
          <Card className="glass" style={{ background: 'rgba(10, 10, 10, 0.9)', border: '1px solid rgba(255, 111, 0, 0.3)' }}>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <Palette className="h-6 w-6" style={{ color: '#FF6F00' }} />
                    </div>
                    <h5 className="font-semibold text-lg" style={{ color: '#FF6F00' }}>Design Language</h5>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Vibrant orange on deep black for maximum contrast, glass-morphism depth,
                    modern typography, and fluid Framer Motion transitions.
                  </p>
                </div>
                <div className="p-6 rounded-2xl border" style={{ background: 'rgba(255, 111, 0, 0.1)', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 111, 0, 0.2)' }}>
                      <Star className="h-6 w-6" style={{ color: '#FF6F00' }} />
                    </div>
                    <h5 className="font-semibold text-lg" style={{ color: '#FF6F00' }}>Key Features</h5>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Interactive portfolio filtering, pricing calculator, testimonials, advanced contact flows,
                    and full SEO optimization.
                  </p>
                </div>
              </div>
              <div className="mt-8 p-6 rounded-xl border" style={{ background: 'rgba(255, 111, 0, 0.05)', borderColor: 'rgba(255, 111, 0, 0.2)' }}>
                <h5 className="text-lg font-semibold mb-4" style={{ color: '#FF6F00' }}>Project Impact</h5>
                <p className="mb-6" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  We poured a lot of heart into this build. The bold orange-on-black combo is a statement.
                  Every animation is tuned to leave a memory, subtle glassmorphism, precise hovers,
                  and a confident aesthetic that screams creativity.
                </p>
                
                <div className="mt-8 pt-8 border-t-2" style={{ borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                  <div className="text-center">
                    <h2 className="font-bold mb-4" style={{ 
                      fontSize: "clamp(2rem, 6vw, 3.75rem)",
                      background: 'linear-gradient(135deg, #FF6F00, #FF8F00)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      Curious how it looks?
                    </h2>
                    <p className="mb-6 text-lg" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Explore the live site and discover the full premium logo experience.
                    </p>
                    <a 
                      href="https://ruethisdesign.ro" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <Button size="lg" className="px-8 py-6 text-lg" style={{ backgroundColor: '#FF6F00', color: '#000', fontWeight: 700 }}>
                        <ExternalLink className="h-6 w-6" />
                        Visit ruethisdesign.ro
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      />
    )
  }
];

export function RuethisPage() {
  return (
    <div className="relative" style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 -z-10" style={{ background: '#0a0a0a', minHeight: '100%' }}></div>
      
      {/* Ruethis Design Orange on Black Styling */}
      <style>{`
        .ruethis-page {
          background: #0a0a0a !important;
          color: #ffffff;
        }
        .ruethis-page .glass {
          background: rgba(255, 111, 0, 0.05) !important;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 111, 0, 0.2) !important;
        }
        .ruethis-page .text-muted {
          color: rgba(255, 255, 255, 0.7) !important;
        }
        .ruethis-page .text-foreground {
          color: #ffffff !important;
        }
      `}</style>
      
      <div className="container-custom py-20 pt-32 ruethis-page">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link to="/portfolio">
            <Button variant="ghost" size="sm" className="gap-2" style={{ color: '#FF6F00', backgroundColor: 'rgba(255, 111, 0, 0.1)' }}>
              <ArrowLeft className="h-4 w-4" />
              <Localized ro="Înapoi la portofoliu" en="Back to portfolio" />
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
          <h1 className="text-6xl md:text-8xl font-bold mb-6" style={{ color: '#FF6F00' }}>
            Ruethis Design
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            <Localized
              ro="Designer Logo Premium - Identitate vizuală memorabilă pentru branduri de succes"
              en="Premium Logo Designer, Memorable visual identities for ambitious brands"
            />
          </p>
          <div className="mt-8">
            <ProjectLiveSiteLink
              url="https://ruethisdesign.ro"
              buttonClassName="font-bold bg-[#FF6F00] hover:bg-[#e86400] text-black"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: 'rgba(255, 111, 0, 0.2)', color: '#FF6F00' }}>
              React + TypeScript
            </span>
            <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: 'rgba(255, 111, 0, 0.2)', color: '#FF6F00' }}>
              Logo Design
            </span>
            <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: 'rgba(255, 111, 0, 0.2)', color: '#FF6F00' }}>
              <Localized ro="Identități Vizuale" en="Visual Identities" />
            </span>
            <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: 'rgba(255, 111, 0, 0.2)', color: '#FF6F00' }}>
              <Localized ro="Branding Complet" en="Full Branding" />
            </span>
          </div>
        </motion.div>

        {/* Timeline */}
        <Timeline 
          data={timelineData}
          title={<Localized ro="Journey-ul Ruethis Design" en="Ruethis Design Journey" />}
          subtitle={
            <Localized
              ro="De la concept la brand puternic - servicii premium de identitate vizuală"
              en="From concept to a bold brand, premium visual identity services"
            />
          }
        />

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-12"
        >
            <Card className="glass rounded-3xl p-8 md:p-12 max-w-2xl mx-auto" style={{ background: 'rgba(255, 111, 0, 0.1)', border: '1px solid rgba(255, 111, 0, 0.3)' }}>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#FF6F00' }}>
              <Localized ro="Vrei un design logo similar?" en="Want a logo like this?" />
            </h2>
            <p className="mb-8" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              <Localized
                ro="Hai să discutăm despre următorul tău proiect și să creăm o identitate vizuală memorabilă."
                en="Let's talk about your next project and craft a memorable identity."
              />
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" style={{ backgroundColor: '#FF6F00', color: '#000', fontWeight: 700 }}>
                  <Localized ro="Începe un proiect" en="Start a project" />
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button size="lg" variant="ghost" style={{ color: '#FF6F00', borderColor: 'rgba(255, 111, 0, 0.3)' }}>
                  <Localized ro="Vezi alte proiecte" en="See other projects" />
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
