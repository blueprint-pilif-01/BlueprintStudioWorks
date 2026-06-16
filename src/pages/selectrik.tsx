import { motion } from "framer-motion"
import { ArrowLeft, Zap, Layers, Code, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Timeline, type TimelineEntry } from "@/components/ui/timeline"
import { ProjectLiveSiteLink } from "@/components/ui/project-live-site-link"
import { Link } from "react-router-dom"
import { useLanguage } from "@/contexts/language-context"

export function SelectrikPage() {
  const { translate } = useLanguage()

  const timelineData: TimelineEntry[] = [
    {
      title: translate({ ro: "Overview", en: "Overview" }),
      content: (
        <Card className="glass" style={{ background: 'linear-gradient(135deg, rgba(232, 197, 71, 0.1), rgba(43, 95, 165, 0.1))' }}>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold mb-4" style={{ color: '#E8C547' }}>
                  {translate({ ro: "Proiectul Selectrik", en: "The Selectrik Project" })}
                </h4>
                <p className="text-muted mb-6">
                  {translate({
                    ro: "Selectrik a fost playground-ul perfect pentru a explora limitele design-ului web. Am implementat efecte speciale cu Three.js, spotlight care urmărește mouse-ul, particule animate, gradient backgrounds cinematice. Dar nu e doar show , sub capotă rulează un backend Node.js solid cu dashboard admin complet. E ceea ce numesc eu \"premium cu substanță\".",
                    en: "Selectrik was the perfect playground to explore the limits of web design. I implemented special effects with Three.js, spotlight tracking the mouse, animated particles, cinematic gradient backgrounds. But it's not just show, under the hood runs a solid Node.js backend with complete admin dashboard. It's what I call \"premium with substance\"."
                  })}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold" style={{ color: '#E8C547' }}>12+</div>
                    <div className="text-sm text-muted">{translate({ ro: "Pagini complete", en: "Complete pages" })}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold" style={{ color: '#2B5FA5' }}>Full-Stack</div>
                    <div className="text-sm text-muted">Frontend + Backend</div>
                  </div>
                </div>
                <div className="mt-6 p-4 rounded-xl" style={{ background: 'rgba(232, 197, 71, 0.05)', border: '1px solid rgba(232, 197, 71, 0.2)' }}>
                  <h5 className="font-semibold mb-2" style={{ color: '#E8C547' }}>{translate({ ro: "Tehnologii Folosite:", en: "Technologies Used:" })}</h5>
                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "Framer Motion", "Node.js", "Express", "SQLite", "Three.js"].map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(232, 197, 71, 0.1)', color: '#E8C547' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(232, 197, 71, 0.1), rgba(43, 95, 165, 0.1))', border: '1px solid rgba(232, 197, 71, 0.2)' }}>
                  <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#E8C547' }}>
                    <Zap className="h-5 w-5" />
                    {translate({ ro: "Paleta de Culori", en: "Color Palette" })}
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg" style={{ background: '#E8C547' }}></div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Gold Yellow</p>
                        <p className="text-xs text-muted">{translate({ ro: "#E8C547 - Accent principal", en: "#E8C547 - Primary accent" })}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg" style={{ background: '#2B5FA5' }}></div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Deep Blue</p>
                        <p className="text-xs text-muted">{translate({ ro: "#2B5FA5 - Accent secundar", en: "#2B5FA5 - Secondary accent" })}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg" style={{ background: '#0f1419' }}></div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Dark Blue</p>
                        <p className="text-xs text-muted">#0f1419 - Background</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(43, 95, 165, 0.1), rgba(232, 197, 71, 0.1))', border: '1px solid rgba(43, 95, 165, 0.2)' }}>
                  <h5 className="font-semibold mb-3" style={{ color: '#2B5FA5' }}>Architecture</h5>
                  <p className="text-sm text-muted">
                    {translate({
                      ro: "Full-stack platform cu frontend React și backend Node.js. SQLite pentru storage, Express pentru routing, autentificare JWT, dashboard admin complet.",
                      en: "Full-stack platform with React frontend and Node.js backend. SQLite for storage, Express for routing, JWT authentication, complete admin dashboard."
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
      title: translate({ ro: "Homepage cu Efecte Speciale", en: "Homepage with Special Effects" }),
      content: (
        <Card className="glass">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-foreground mb-4" style={{ color: '#E8C547' }}>
                  {translate({ ro: "Design Premium cu Animații", en: "Premium Design with Animations" })}
                </h4>
                <p className="text-muted mb-6">
                  {translate({
                    ro: "Homepage-ul include logo animation intro, background gradient animat, spotlight effects și particule flotante. Design dark cu accente gold create o experiență premium.",
                    en: "The homepage includes logo animation intro, animated background gradient, spotlight effects and floating particles. Dark design with gold accents creates a premium experience."
                  })}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#E8C547' }}></div>
                    <span className="text-muted">{translate({ ro: "Logo animation intro cu logo Selectrik", en: "Logo animation intro with Selectrik logo" })}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#E8C547' }}></div>
                    <span className="text-muted">{translate({ ro: "Background gradient animat 60s cycle", en: "Animated background gradient 60s cycle" })}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#E8C547' }}></div>
                    <span className="text-muted">{translate({ ro: "Spotlight effect urmărind mouse-ul", en: "Spotlight effect tracking the mouse" })}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#E8C547' }}></div>
                    <span className="text-muted">{translate({ ro: "Particule flotante animate", en: "Animated floating particles" })}</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl" style={{ background: 'rgba(232, 197, 71, 0.05)', border: '1px solid rgba(232, 197, 71, 0.2)' }}>
                  <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#E8C547' }}>
                    <Zap className="h-5 w-5" />
                    {translate({ ro: "Efecte Speciale", en: "Special Effects" })}
                  </h5>
                  <ul className="text-sm text-muted space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#E8C547' }}>•</span>
                      <span>{translate({ ro: "Three.js pentru animații 3D și particule", en: "Three.js for 3D animations and particles" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#E8C547' }}>•</span>
                      <span>{translate({ ro: "Spotlight effect reactiv la mișcarea mouse-ului", en: "Spotlight effect reactive to mouse movement" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#E8C547' }}>•</span>
                      <span>{translate({ ro: "Gradient animations pentru background", en: "Gradient animations for background" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#E8C547' }}>•</span>
                      <span>{translate({ ro: "Logo animation intro cinematică", en: "Cinematic logo animation intro" })}</span>
                    </li>
                  </ul>
                </div>
                <div className="p-5 rounded-2xl" style={{ background: 'rgba(43, 95, 165, 0.05)', border: '1px solid rgba(43, 95, 165, 0.2)' }}>
                  <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#2B5FA5' }}>
                    <Layers className="h-5 w-5" />
                    {translate({ ro: "Full-Stack Features", en: "Full-Stack Features" })}
                  </h5>
                  <ul className="text-sm text-muted space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#2B5FA5' }}>•</span>
                      <span>{translate({ ro: "Node.js backend cu Express și SQLite", en: "Node.js backend with Express and SQLite" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#2B5FA5' }}>•</span>
                      <span>{translate({ ro: "Dashboard admin complet pentru management", en: "Complete admin dashboard for management" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#2B5FA5' }}>•</span>
                      <span>{translate({ ro: "Sistem de autentificare și autorizare", en: "Authentication and authorization system" })}</span>
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
      title: translate({ ro: "Portofoliu Interactiv", en: "Interactive Portfolio" }),
      content: (
        <Card className="glass">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-foreground mb-4" style={{ color: '#E8C547' }}>
                  {translate({ ro: "Showcase Proiecte", en: "Projects Showcase" })}
                </h4>
                <p className="text-muted mb-6">
                  {translate({
                    ro: "Pagina de portofoliu prezintă proiectele cu design cards 3D, video thumbnails și efecte hover. Fiecare proiect are propria pagină roadmap cu timeline și detalii complete.",
                    en: "The portfolio page showcases projects with 3D card design, video thumbnails and hover effects. Each project has its own roadmap page with timeline and complete details."
                  })}
                </p>
                <div className="space-y-3">
                  <div className="p-3 rounded-xl" style={{ background: 'rgba(232, 197, 71, 0.05)', border: '1px solid rgba(232, 197, 71, 0.2)' }}>
                    <div className="flex items-center gap-3 mb-2">
                      <Layers className="h-5 w-5" style={{ color: '#E8C547' }} />
                      <h5 className="font-semibold text-foreground">3D Cards</h5>
                    </div>
                    <p className="text-sm text-muted">{translate({ ro: "Cards cu efecte 3D și hover animat", en: "Cards with 3D effects and animated hover" })}</p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: 'rgba(232, 197, 71, 0.05)', border: '1px solid rgba(232, 197, 71, 0.2)' }}>
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="h-5 w-5" style={{ color: '#E8C547' }} />
                      <h5 className="font-semibold text-foreground">Video Thumbnails</h5>
                    </div>
                    <p className="text-sm text-muted">{translate({ ro: "Preview video pentru fiecare proiect", en: "Video preview for each project" })}</p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: 'rgba(232, 197, 71, 0.05)', border: '1px solid rgba(232, 197, 71, 0.2)' }}>
                    <div className="flex items-center gap-3 mb-2">
                      <Code className="h-5 w-5" style={{ color: '#E8C547' }} />
                      <h5 className="font-semibold text-foreground">Project Roadmap</h5>
                    </div>
                    <p className="text-sm text-muted">{translate({ ro: "Timeline detaliat pentru fiecare proiect", en: "Detailed timeline for each project" })}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(232, 197, 71, 0.1), rgba(43, 95, 165, 0.1))', border: '1px solid rgba(232, 197, 71, 0.2)' }}>
                  <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#E8C547' }}>
                    <Zap className="h-5 w-5" />
                    {translate({ ro: "Design Elements", en: "Design Elements" })}
                  </h5>
                  <ul className="text-sm text-muted space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#E8C547' }}>•</span>
                      <span>{translate({ ro: "Grid responsive cu filtru pe categorii de proiecte", en: "Responsive grid with filter by project categories" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#E8C547' }}>•</span>
                      <span>{translate({ ro: "Modal expandabil pentru detalii complete", en: "Expandable modal for complete details" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#E8C547' }}>•</span>
                      <span>{translate({ ro: "Lightbox pentru imagini în rezoluție înaltă", en: "Lightbox for high-resolution images" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#E8C547' }}>•</span>
                      <span>{translate({ ro: "Smooth scrolling cu lazy loading pentru performanță", en: "Smooth scrolling with lazy loading for performance" })}</span>
                    </li>
                  </ul>
                </div>
                <div className="p-5 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(43, 95, 165, 0.1), rgba(232, 197, 71, 0.1))', border: '1px solid rgba(43, 95, 165, 0.2)' }}>
                  <h5 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#2B5FA5' }}>
                    <Layers className="h-5 w-5" />
                    {translate({ ro: "Layout & Style", en: "Layout & Style" })}
                  </h5>
                  <ul className="text-sm text-muted space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#2B5FA5' }}>•</span>
                      <span>{translate({ ro: "Masonry grid pentru varietate vizuală", en: "Masonry grid for visual variety" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#2B5FA5' }}>•</span>
                      <span>{translate({ ro: "Paleta dark cu gold/blue accents", en: "Dark palette with gold/blue accents" })}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1" style={{ color: '#2B5FA5' }}>•</span>
                      <span>{translate({ ro: "Typography modern cu hierarchy clară", en: "Modern typography with clear hierarchy" })}</span>
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
      title: translate({ ro: "Backend & Dashboard Admin", en: "Backend & Admin Dashboard" }),
      content: (
        <Card className="glass">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-foreground mb-4" style={{ color: '#E8C547' }}>
                  {translate({ ro: "Sistem Complet Backend", en: "Complete Backend System" })}
                </h4>
                <p className="text-muted mb-6">
                  {translate({
                    ro: "Backend Node.js + Express cu bază de date SQLite pentru managementul proiectelor, formularelor și utilizatorilor. Dashboard admin cu autentificare și CRUD complet.",
                    en: "Node.js + Express backend with SQLite database for managing projects, forms and users. Admin dashboard with authentication and complete CRUD."
                  })}
                </p>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(232, 197, 71, 0.05), rgba(43, 95, 165, 0.05))' }}>
                    <h5 className="font-semibold mb-2" style={{ color: '#E8C547' }}>API RESTful</h5>
                    <p className="text-sm text-muted">{translate({ ro: "Endpoints pentru projects, forms, auth și file upload", en: "Endpoints for projects, forms, auth and file upload" })}</p>
                  </div>
                  <div className="p-4 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(232, 197, 71, 0.05), rgba(43, 95, 165, 0.05))' }}>
                    <h5 className="font-semibold mb-2" style={{ color: '#E8C547' }}>Dashboard Admin</h5>
                    <p className="text-sm text-muted">{translate({ ro: "Interfață admin pentru managementul proiectelor și formularelor", en: "Admin interface for managing projects and forms" })}</p>
                  </div>
                  <div className="p-4 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(232, 197, 71, 0.05), rgba(43, 95, 165, 0.05))' }}>
                    <h5 className="font-semibold mb-2" style={{ color: '#E8C547' }}>Email & WhatsApp</h5>
                    <p className="text-sm text-muted">{translate({ ro: "Servicii de notificare prin email și WhatsApp", en: "Email and WhatsApp notification services" })}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(232, 197, 71, 0.1), rgba(43, 95, 165, 0.1))' }}>
                  <h5 className="font-semibold mb-3" style={{ color: '#E8C547' }}>Backend Stack</h5>
                  <ul className="text-sm text-muted space-y-2">
                    <li>• Node.js + Express.js</li>
                    <li>• {translate({ ro: "SQLite database", en: "SQLite database" })}</li>
                    <li>• {translate({ ro: "JWT authentication", en: "JWT authentication" })}</li>
                    <li>• File upload {translate({ ro: "cu multer", en: "with multer" })}</li>
                    <li>• Email service (Nodemailer)</li>
                  </ul>
                </div>
                <div className="p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(232, 197, 71, 0.1), rgba(43, 95, 165, 0.1))' }}>
                  <h5 className="font-semibold mb-3" style={{ color: '#E8C547' }}>{translate({ ro: "Features Admin", en: "Admin Features" })}</h5>
                  <ul className="text-sm text-muted space-y-2">
                    <li>• {translate({ ro: "CRUD proiecte complete", en: "Complete project CRUD" })}</li>
                    <li>• {translate({ ro: "Vizualizare submissions formulare", en: "Form submissions viewing" })}</li>
                    <li>• User management</li>
                    <li>• {translate({ ro: "Project editor cu roadmap", en: "Project editor with roadmap" })}</li>
                    <li>• Protected routes</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      title: translate({ ro: "Design System Dark Premium", en: "Premium Dark Design System" }),
      content: (
        <Card className="glass">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-foreground mb-4" style={{ color: '#E8C547' }}>
                  {translate({ ro: "Paleta Dark & Gold", en: "Dark & Gold Palette" })}
                </h4>
                <p className="text-muted mb-6">
                  {translate({
                    ro: "Design system bazat pe fundal dark blue (#0f1419 → #2B5FA5) cu accente gold (#E8C547). Gradient animat, glass effects și micro-animații pentru o experiență premium.",
                    en: "Design system based on dark blue background (#0f1419 → #2B5FA5) with gold accents (#E8C547). Animated gradient, glass effects and micro-animations for a premium experience."
                  })}
                </p>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl" style={{ background: 'rgba(232, 197, 71, 0.05)', border: '1px solid rgba(232, 197, 71, 0.2)' }}>
                    <h5 className="font-semibold mb-2" style={{ color: '#E8C547' }}>{translate({ ro: "Culori Principale", en: "Main Colors" })}</h5>
                    <div className="flex gap-2 mt-2">
                      <div className="w-12 h-12 rounded-lg" style={{ background: '#2B5FA5' }}></div>
                      <div className="w-12 h-12 rounded-lg" style={{ background: '#E8C547' }}></div>
                      <div className="w-12 h-12 rounded-lg" style={{ background: '#0f1419' }}></div>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl" style={{ background: 'rgba(232, 197, 71, 0.05)', border: '1px solid rgba(232, 197, 71, 0.2)' }}>
                    <h5 className="font-semibold mb-2" style={{ color: '#E8C547' }}>Typography</h5>
                    <p className="text-sm text-muted">{translate({ ro: "Font Montserrat cu fluid scaling responsive", en: "Montserrat font with responsive fluid scaling" })}</p>
                  </div>
                  <div className="p-4 rounded-2xl" style={{ background: 'rgba(232, 197, 71, 0.05)', border: '1px solid rgba(232, 197, 71, 0.2)' }}>
                    <h5 className="font-semibold mb-2" style={{ color: '#E8C547' }}>{translate({ ro: "Animații", en: "Animations" })}</h5>
                    <p className="text-sm text-muted">{translate({ ro: "Framer Motion + CSS animations pentru efecte fluide", en: "Framer Motion + CSS animations for smooth effects" })}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(43, 95, 165, 0.2), rgba(232, 197, 71, 0.1))' }}>
                  <h5 className="font-semibold mb-3" style={{ color: '#E8C547' }}>Effects & Animations</h5>
                  <ul className="text-sm text-muted space-y-2">
                    <li>• Gradient shift 60s cycle</li>
                    <li>• Text glow & pulse effects</li>
                    <li>• {translate({ ro: "Electric border animations", en: "Electric border animations" })}</li>
                    <li>• {translate({ ro: "Magnetic buttons", en: "Magnetic buttons" })}</li>
                    <li>• Spotlight cursor tracking</li>
                  </ul>
                </div>
                <div className="p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(43, 95, 165, 0.2), rgba(232, 197, 71, 0.1))' }}>
                  <h5 className="font-semibold mb-3" style={{ color: '#E8C547' }}>Responsive Design</h5>
                  <ul className="text-sm text-muted space-y-2">
                    <li>• Mobile-first approach</li>
                    <li>• {translate({ ro: "Fluid typography scaling", en: "Fluid typography scaling" })}</li>
                    <li>• {translate({ ro: "Container-safe overflow prevention", en: "Container-safe overflow prevention" })}</li>
                    <li>• {translate({ ro: "Touch-optimized interactions", en: "Touch-optimized interactions" })}</li>
                    <li>• {translate({ ro: "Performance optimizat", en: "Optimized performance" })}</li>
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
        <Card className="glass">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(232, 197, 71, 0.1), rgba(43, 95, 165, 0.1))', border: '1px solid rgba(232, 197, 71, 0.2)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(232, 197, 71, 0.2)' }}>
                    <Zap className="h-6 w-6" style={{ color: '#E8C547' }} />
                  </div>
                  <h5 className="font-semibold text-foreground text-lg">Design Language</h5>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  {translate({
                    ro: "Dark blue cu accente gold/yellow, efecte speciale cu Three.js, glass morphism pentru cards, typography modern cu hierarchy clară, spotlight effect reactiv.",
                    en: "Dark blue with gold/yellow accents, special effects with Three.js, glass morphism for cards, modern typography with clear hierarchy, reactive spotlight effect."
                  })}
                </p>
              </div>
              <div className="p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(43, 95, 165, 0.1), rgba(232, 197, 71, 0.1))', border: '1px solid rgba(43, 95, 165, 0.2)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(43, 95, 165, 0.2)' }}>
                    <Layers className="h-6 w-6" style={{ color: '#2B5FA5' }} />
              </div>
                  <h5 className="font-semibold text-foreground text-lg">{translate({ ro: "Full-Stack Platform", en: "Full-Stack Platform" })}</h5>
              </div>
                <p className="text-sm text-muted leading-relaxed">
                  {translate({
                    ro: "12+ pagini complete, backend Node.js cu Express și SQLite, dashboard admin pentru management, sistem de autentificare, integrare WhatsApp/Email.",
                    en: "12+ complete pages, Node.js backend with Express and SQLite, admin dashboard for management, authentication system, WhatsApp/Email integration."
                  })}
                </p>
              </div>
            </div>
            <div className="mt-8 p-6 rounded-xl" style={{ background: 'rgba(232, 197, 71, 0.05)', border: '1px solid rgba(232, 197, 71, 0.2)' }}>
              <h5 className="text-lg font-semibold mb-4" style={{ color: '#E8C547' }}>{translate({ ro: "Impactul Proiectului", en: "Project Impact" })}</h5>
              <p className="text-muted mb-6">
                {translate({
                  ro: "Am construit Selectrik ca pe o declarație: \"Pot crea orice\". De la logo animation intro cinematică până la dashboard-ul admin care gestionează totul, fiecare componentă a fost lovită cu pasiune. Nu am făcut compromisuri , dark blue gradient animat 60 secunde, spotlight effect reactiv, Three.js pentru particule. E proiectul care arată ce pot când nu există limite.",
                  en: "I built Selectrik as a statement: \"I can create anything\". From the cinematic logo animation intro to the admin dashboard that manages everything, every component was hit with passion. I made no compromises, animated dark blue gradient 60 seconds, reactive spotlight effect, Three.js for particles. It's the project that shows what I can do when there are no limits."
                })}
              </p>

              <div className="mt-8 pt-8" style={{ borderTop: '2px solid rgba(232, 197, 71, 0.2)' }}>
                <div className="text-center">
                  <h2 className="font-bold mb-4" style={{
                    fontSize: "clamp(2rem, 6vw, 3.75rem)",
                    background: 'linear-gradient(135deg, #E8C547, #2B5FA5)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    {translate({ ro: "Ești curios cum arată?", en: "Curious how it looks?" })}
                  </h2>
                  <p className="text-muted mb-6 text-lg">
                    {translate({ ro: "Explorează platforma live și descoperă efectele speciale Selectrik.", en: "Explore the live platform and discover Selectrik's special effects." })}
                  </p>
                  <a
                    href="https://selectrik.ro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Button size="lg" className="px-8 py-6 text-lg" style={{ backgroundColor: '#E8C547', color: '#000', fontWeight: 700 }}>
                      <ExternalLink className="h-6 w-6" />
                      {translate({ ro: "Vizită selectrik.ro", en: "Visit selectrik.ro" })}
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
    <div className="relative selectrik-page" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 25%, #2B5FA5 50%, #1a2332 75%, #0f1419 100%)',
      fontFamily: 'Montserrat, sans-serif'
    }}>
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 -z-10" style={{ background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 25%, #2B5FA5 50%, #1a2332 75%, #0f1419 100%)', minHeight: '100%' }}></div>

      {/* Selectrik Styling - Yellow/Blue on Dark */}
      <style>{`
        .selectrik-page {
          background: linear-gradient(135deg, #0f1419 0%, #1a2332 25%, #2B5FA5 50%, #1a2332 75%, #0f1419 100%) !important;
          position: relative;
          min-height: 100vh;
        }
        .selectrik-page::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 30% 20%, rgba(232, 197, 71, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 70% 80%, rgba(43, 95, 165, 0.15) 0%, transparent 40%);
          pointer-events: none;
        }
        .selectrik-page .glass {
          background: rgba(10, 20, 30, 0.8) !important;
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(232, 197, 71, 0.3) !important;
        }
        .selectrik-page h1, .selectrik-page h2, .selectrik-page h3, .selectrik-page h4, .selectrik-page h5 {
          color: #E8C547 !important;
        }
        .selectrik-page .text-muted {
          color: rgba(255, 255, 255, 0.85) !important;
        }
        .selectrik-page .text-foreground {
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
              color: '#E8C547',
              backgroundColor: 'rgba(232, 197, 71, 0.1)',
              border: '1px solid rgba(232, 197, 71, 0.3)'
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
              color: '#E8C547',
              textShadow: '0 0 30px rgba(232, 197, 71, 0.4)'
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Selectrik
          </motion.h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            {translate({
              ro: "Platformă full-stack premium pentru agenție creativă - design dark cu efecte speciale + backend complet",
              en: "Premium full-stack platform for creative agency - dark design with special effects + complete backend"
            })}
          </p>
          <div className="mt-8">
            <ProjectLiveSiteLink
              url="https://selectrik.ro"
              buttonClassName="font-bold bg-[#E8C547] hover:bg-[#d4b23f] text-black"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <motion.span
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{
                backgroundColor: 'rgba(232, 197, 71, 0.2)',
                color: '#E8C547',
                border: '1px solid rgba(232, 197, 71, 0.4)'
              }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(232, 197, 71, 0.3)' }}
            >
              React + Node.js
            </motion.span>
            <motion.span
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{
                backgroundColor: 'rgba(43, 95, 165, 0.3)',
                color: '#6BA3E5',
                border: '1px solid rgba(43, 95, 165, 0.5)'
              }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(43, 95, 165, 0.4)' }}
            >
              {translate({ ro: "Premium Design", en: "Premium Design" })}
            </motion.span>
            <motion.span
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{
                backgroundColor: 'rgba(232, 197, 71, 0.2)',
                color: '#E8C547',
                border: '1px solid rgba(232, 197, 71, 0.4)'
              }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(232, 197, 71, 0.3)' }}
            >
              Admin Dashboard
            </motion.span>
          </div>
        </motion.div>

        {/* Timeline */}
        <Timeline
          data={timelineData}
          title={translate({ ro: "Journey-ul Selectrik", en: "Selectrik Journey" })}
          subtitle={translate({ ro: "De la concept la platformă full-stack complexă - agenție creativă digitală", en: "From concept to complex full-stack platform - digital creative agency" })}
        />

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-12"
        >
          <Card className="glass rounded-3xl p-8 md:p-12 max-w-2xl mx-auto" style={{ background: 'rgba(232, 197, 71, 0.05)' }}>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#E8C547' }}>
              {translate({ ro: "Vrei o platformă similară?", en: "Want a similar platform?" })}
            </h2>
            <p className="mb-8" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              {translate({ ro: "Hai să discutăm despre următorul tău proiect și să creăm o experiență premium full-stack.", en: "Let's talk about your next project and create a premium full-stack experience." })}
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
