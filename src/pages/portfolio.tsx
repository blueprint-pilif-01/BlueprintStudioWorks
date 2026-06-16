import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Eye, Sparkles } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LogoBackground } from "@/components/ui/logo-background"
import { ProjectLiveSiteLink } from "@/components/ui/project-live-site-link"
import { useLanguage } from "@/contexts/language-context"
import type { Language } from "@/contexts/language-context"

// Color schemes for each project
const projectColors: Record<string, { color1: string; color2?: string; darkLogo?: boolean }> = {
  "Divine Skin": { color1: "#B8860B", color2: "#2B7A3F" },
  "Ruethis Design": { color1: "#FF8C42", color2: "#FF6B35" },
  "XMET": { color1: "#FCD000", color2: "#F59E0B" },
  "Selectrik": { color1: "#E8C547", color2: "#2B5FA5" },
  "Carmina Estela": { color1: "#C6A97E", color2: "#A78B5C" },
  "Biserica Vertical": { color1: "#EAFB2A", color2: "#34D399", darkLogo: true },
  "Alora Bright": { color1: "#6B4F10", color2: "#8B6914" },
  "Alpha Pixels": { color1: "#1E1B4B", color2: "#3730A3" },
  "CEAS Planning Center": { color1: "#FF8C42", color2: "#F59E0B" },
  "Garmedi": { color1: "#fa7c1f", color2: "#FF6B35" },
  "Ihop": { color1: "#B91C1C", color2: "#dc2626", darkLogo: true },
  "Istituto di Moda Burgo Romania": { color1: "#dc2626", color2: "#E11D48" },
  "Liceul Baptist Timisoara": { color1: "#1a3d5c", color2: "#2563EB" },
  "Lucas & Amelie": { color1: "#FF69B4", color2: "#9B59B6" },
  "Termotal TM": { color1: "#0A4046", color2: "#f97316" },
  "La Calul Alb": { color1: "#B8861F", color2: "#302923" },
}

type PortfolioProject = {
  id: number
  title: string
  description: Record<Language, string>
  categories: string[]
  image: string
  href: string
  siteUrl?: string
  technologies: string[]
  pages: string[]
  features: string[]
  badge?: string
  comingSoon?: boolean
  customText?: { text: string; parts: Array<{ text: string; color: string }>; subtextKey?: { ro: string; en: string } }
}

const projects: PortfolioProject[] = [
  {
    id: 1,
    title: "Divine Skin",
    description: {
      ro: "Salon Epilare Definitivă • 7 Pagini • React + TypeScript",
      en: "Laser Hair Removal Studio • 7 Pages • React + TypeScript",
    },
    categories: ["brand", "landing", "ecom"],
    image: "/divineskin.png",
    href: "/divine",
    siteUrl: "https://divineskin.ro",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Radix UI", "Framer Motion", "React Query", "Three.js"],
    pages: ["Home", "Servicii", "Despre", "Recenzii", "Before/After", "Prepare", "Contact"],
    features: ["SEO Optimized", "Mobile Responsive", "PDF Generation", "Video Backgrounds", "Interactive Pricing", "Chatbot Integration", "Structured Data"]
  },
  {
    id: 2,
    title: "Ruethis Design",
    description: {
      ro: "Agenție Creativă • Site Portofoliu • Modern Design",
      en: "Creative Agency • Portfolio Website • Modern Design",
    },
    categories: ["brand", "portfolio", "creative"],
    image: "/ruethis.png",
    href: "/ruethis",
    siteUrl: "https://ruethisdesign.ro",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "Glass Morphism"],
    pages: ["Home", "Portfolio", "Services", "About", "Contact"],
    features: ["Modern UI", "Smooth Animations", "Responsive Design", "Interactive Cards", "Creative Showcase"]
  },
  {
    id: 3,
    title: "XMET",
    description: {
      ro: "Configurator Garduri & Porți • Multi-Step • E-commerce",
      en: "Fence & Gate Configurator • Multi-Step • E-commerce",
    },
    categories: ["ecom", "configurator", "landing"],
    image: "/portfolio/logo1.png",
    href: "/xmet",
    siteUrl: "https://garduri-xmet.ro",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "React Hook Form", "Zod"],
    pages: ["Landing", "Configurator", "Gallery", "Contact"],
    features: ["Multi-Step Configurator", "Live Preview", "Color Selection", "Form Validation", "Analytics Integration", "Mobile Optimized"]
  },
  {
    id: 6,
    title: "Carmina Estela",
    description: {
      ro: "Haute Maroquinerie • Luxury Design • 10 Pagini Elegante",
      en: "Haute Maroquinerie • Luxury Design • 10 Elegant Pages",
    },
    categories: ["luxury", "brand", "ecommerce"],
    image: "/carminaestela.png",
    href: "/carmina",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn-ui", "Framer Motion"],
    pages: ["Home", "Origins", "Path", "Maison", "Method", "Creations", "Atelier", "Press", "Contact", "Legal"],
    features: ["Luxury Minimalist Design", "Cormorant Garamond Typography", "Magnetic Buttons", "Shimmer Effects", "Noir & Champagne Palette", "Elegant Animations"]
  },
  {
    id: 4,
    title: "Biserica Vertical",
    description: {
      ro: "Ecosistem Digital Biserică • 25+ Pagini • Full-Stack",
      en: "Church Digital Ecosystem • 25+ Pages • Full-Stack",
    },
    categories: ["fullstack", "platform", "community"],
    image: "/vertical.png",
    href: "/biserica",
    siteUrl: "https://biserica-vertical.ro",
    technologies: ["React", "TypeScript", "Node.js", "Express", "SQLite", "JWT", "Cron Jobs"],
    pages: ["Public Site", "UNITED Youth", "Planner System", "Dashboard", "Calendar", "Songs Library", "Service Builder"],
    features: ["Full-Stack Platform", "Auth System", "Admin Dashboard", "1000+ Songs Database", "Auto-Generate Services", "Voting System", "File Upload"]
  },
  {
    id: 5,
    title: "Selectrik",
    description: {
      ro: "Platformă Agenție Creativă • Premium Design • Full-Stack",
      en: "Creative Agency Platform • Premium Design • Full-Stack",
    },
    categories: ["fullstack", "creative", "premium"],
    image: "/selectrik.png",
    href: "/selectrik",
    siteUrl: "https://selectrik.ro",
    technologies: ["React", "TypeScript", "Node.js", "Express", "SQLite", "Framer Motion", "Three.js"],
    pages: ["Home", "Projects", "Services", "About", "Contact", "Admin Dashboard", "Project Editor"],
    features: ["Dark Premium Design", "Logo Animation", "Spotlight Effects", "Backend API", "Admin Panel", "Project Management", "Email & WhatsApp Integration"]
  },
  {
    id: 7,
    title: "Alora Bright",
    description: {
      ro: "Salon Epilare Definitivă • React 19 + Three.js • Design Gold & Black",
      en: "Laser Hair Removal Salon • React 19 + Three.js • Gold & Black Design",
    },
    categories: ["brand", "landing"],
    image: "/portfolio/alora-bright.png",
    href: "/alora-bright",
    technologies: ["React 19", "TypeScript", "Vite", "Tailwind", "Radix UI", "Framer Motion", "Three.js"],
    pages: ["Home", "Despre", "Prețuri", "Programare"],
    features: ["LightPillar 3D", "GlitterOverlay", "Multi-Step Booking", "Intro Animation"],
    comingSoon: true,
  },
  {
    id: 8,
    title: "Alpha Pixels",
    description: {
      ro: "Companie Producție Media • Video, Foto, 3D • Design Monochrome",
      en: "Media Production Company • Video, Photo, 3D • Monochrome Design",
    },
    categories: ["brand", "creative"],
    image: "/portfolio/alpha-pixels.png",
    href: "/alpha-pixels",
    technologies: ["React 19", "TypeScript", "Vite", "Tailwind", "Motion", "Three.js"],
    pages: ["Home", "Services", "Portfolio", "About", "Contact"],
    features: ["PixelBlast Hero", "VariableProximity Font", "Interactive Pixel Grid"],
    comingSoon: true,
  },
  {
    id: 9,
    title: "CEAS Planning Center",
    description: {
      ro: "Sistem Planificare Voluntari • Evenimente, Contracte, Înscrieri",
      en: "Volunteer Planning System • Events, Contracts, Registrations",
    },
    categories: ["fullstack", "platform"],
    image: "/portfolio/ceas-planning.png",
    href: "/ceas-planning",
    technologies: ["React 19", "TypeScript", "Vite", "Tailwind", "Framer Motion", "jsPDF", "Signature Pad"],
    pages: ["Dashboard", "Events", "Contracts", "Admin"],
    features: ["Event CRUD", "Digital Contract Signing", "PDF Export", "Auth System"],
  },
  {
    id: 10,
    title: "Garmedi",
    description: {
      ro: "E-commerce Costume Medicale • Magazin + Admin • garmedi.ro",
      en: "Medical Clothing E-commerce • Shop + Admin • garmedi.ro",
    },
    categories: ["ecom", "fullstack"],
    image: "/client-sites/garmendi/Garmedi%20Main%20Logo%20Transparent%20bg.svg",
    href: "/garmedi",
    siteUrl: "https://garmedi.ro",
    technologies: ["React 19", "TypeScript", "Vite", "Tailwind", "Motion", "Three.js", "Swiper"],
    pages: ["Shop", "Product", "Cart", "Checkout", "Admin"],
    features: ["E-commerce Complete", "BaseLinker", "Loyalty Program", "Admin Dashboard"],
  },
  {
    id: 11,
    title: "Ihop",
    description: {
      ro: "Site Organizație • React 18 + Anime.js • ihop.ro",
      en: "Organization Site • React 18 + Anime.js • ihop.ro",
    },
    categories: ["brand", "landing"],
    image: "/client-sites/ihoptm/logo.png",
    href: "/ihop",
    siteUrl: "https://ihop.ro",
    technologies: ["React 18", "TypeScript", "Vite", "Tailwind", "Framer Motion", "Anime.js"],
    pages: ["Home", "Despre", "Viziune", "Contact", "Donate"],
    features: ["Particle Hero", "YouTube Embed", "Donate Flow", "Prayer Room"],
  },
  {
    id: 12,
    title: "Istituto di Moda Burgo Romania",
    description: {
      ro: "Școală de Modă Milano • Multilingv • imbromania.com",
      en: "Milan Fashion School • Multilingual • imbromania.com",
    },
    categories: ["brand", "landing"],
    image: "/client-sites/imbromania/logo.png",
    href: "/imbromania",
    siteUrl: "https://imbromania.com",
    technologies: ["React 18", "TypeScript", "Vite", "Tailwind", "Framer Motion", "i18next"],
    pages: ["Home", "Cursuri", "Evenimente", "Info"],
    features: ["Multilingual", "Video Hero", "Aurora Background", "SEO"],
  },
  {
    id: 13,
    title: "Liceul Baptist Timisoara",
    description: {
      ro: "Olimpiada Națională de Religie • React 18 + Lenis • onr-ltbtm.ro",
      en: "National Religion Olympiad • React 18 + Lenis • onr-ltbtm.ro",
    },
    categories: ["brand", "landing"],
    image: "",
    href: "/liceul-baptist",
    siteUrl: "https://onr-ltbtm.ro",
    technologies: ["React 18", "TypeScript", "Vite", "Tailwind", "Motion", "Lenis"],
    pages: ["Home", "Concurs", "Program", "Donatii", "Contact"],
    features: ["Video Hero", "Smooth Scroll", "Accessibility", "FAQ"],
    customText: { text: "LTBTM", parts: [{ text: "LTBTM", color: "#1a3d5c" }], subtextKey: { ro: "Olimpiada Națională", en: "National Olympiad" } }
  },
  {
    id: 14,
    title: "Lucas & Amelie",
    description: {
      ro: "Site Nuntă • Layout Orizontal • RSVP, Galerie",
      en: "Wedding Website • Horizontal Layout • RSVP, Gallery",
    },
    categories: ["brand", "creative"],
    image: "/portfolio/lucas-amelie.png",
    href: "/lucas-amelie",
    technologies: ["React 18", "Vite", "Framer Motion", "Anime.js", "Three.js", "Leaflet"],
    pages: ["Home", "Schedule", "Venue", "Gallery", "RSVP"],
    features: ["Intro Animation", "Horizontal Scroll", "RSVP Form", "Floral Decorations"],
  },
  {
    id: 15,
    title: "Termotal TM",
    description: {
      ro: "Construcții Industriale • Hartă Interactivă • 14 țări",
      en: "Industrial Construction • Interactive Map • 14 Countries",
    },
    categories: ["brand", "corporate"],
    image: "/client-sites/termotaltm/colorlogo.png",
    href: "/termotal",
    technologies: ["React 18", "TypeScript", "Vite", "Tailwind", "react-simple-maps"],
    pages: ["Home", "Country Pages"],
    features: ["World Map", "14 Country Pages", "Project Gallery"],
    comingSoon: true,
  },
  {
    id: 16,
    title: "La Calul Alb",
    description: {
      ro: "Restaurant Timișoara • Meniu Bilingv • React 18 + GSAP",
      en: "Timișoara Restaurant • Bilingual Menu • React 18 + GSAP",
    },
    categories: ["brand", "landing", "hospitality"],
    image: "",
    href: "/calul-alb",
    technologies: ["React 18", "TypeScript", "Vite 8", "Tailwind", "GSAP", "Lenis", "Three.js"],
    pages: ["Home", "Menu", "About", "Reservation", "Catering"],
    features: ["Bilingual RO/EN", "Scroll Hero", "FlowingMenu", "GlassCursor 3D", "Page Transitions"],
    comingSoon: true,
    customText: {
      text: "La Calul Alb",
      parts: [
        { text: "La ", color: "#B8861F" },
        { text: "Calul Alb", color: "#302923" },
      ],
      subtextKey: { ro: "Restaurant Timișoara", en: "Timișoara Restaurant" },
    },
  }
] as const

export function PortfolioPage() {
  const { language, translate } = useLanguage()
  const navigate = useNavigate()
  return (
    <div className="relative">
      <div className="container-custom py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="font-bold text-foreground mb-4" style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}>
            {translate({ ro: "Portofoliu", en: "Portfolio" })}
          </h1>
          <p className="text-muted max-w-2xl mx-auto" style={{ fontSize: "clamp(1rem, 3vw, 1.25rem)" }}>
            {translate({ ro: "Selecție de proiecte gândite pentru conversie, viteză și memorabilitate.", en: "A curated selection focused on conversion, speed, and memorability." })}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-[1400px] mx-auto"
          layout
        >
          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="w-full"
              >
                <Card
                  className="group overflow-hidden cursor-pointer h-full flex flex-col !rounded-xl"
                  onClick={() => navigate(project.href)}
                >
                    <div className="relative aspect-square overflow-hidden">
                      {project.badge && (
                        <div className="absolute top-2 left-2 z-10">
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-primary to-secondary rounded-full backdrop-blur-sm border border-white/20">
                            <Sparkles className="h-2.5 w-2.5 text-white" />
                            <span className="text-[10px] font-semibold text-white">{project.badge}</span>
                          </div>
                        </div>
                      )}
                      
                      {(project.customText || project.title === "XMET" || project.title === "La Calul Alb") ? (
                        <LogoBackground
                          color1={projectColors[project.title]?.color1 || "#6366f1"}
                          color2={projectColors[project.title]?.color2}
                          height="100%"
                          width="100%"
                          bgMode="light"
                          customText={project.customText ?? {
                            text: "XMET",
                            parts: [
                              { text: "X", color: "#FCD000" },
                              { text: "MET", color: "#000000" }
                            ]
                          }}
                          logoSubtext={project.customText?.subtextKey ? translate(project.customText.subtextKey) : translate({ ro: "Configurator Garduri & Porți", en: "Fence & Gate Configurator" })}
                          fontFamily="Inter, sans-serif"
                          fontWeight={900}
                          letterSpacing="-0.02em"
                          className="w-full h-full"
                        />
                      ) : (
                        <LogoBackground
                          color1={projectColors[project.title]?.color1 || "#6366f1"}
                          color2={projectColors[project.title]?.color2}
                          height="100%"
                          width="100%"
                          bgMode="light"
                          logoImage={project.image}
                          logoImageAlt={project.title}
                          logoImageClassName={
                            project.title === "Alpha Pixels"
                              ? "max-w-[95%] max-h-[95%] object-contain"
                              : projectColors[project.title]?.darkLogo
                                ? "max-w-[80%] max-h-[80%] object-contain brightness-0"
                                : undefined
                          }
                          className="w-full h-full"
                        />
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
                      
                      <div
                        className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {project.siteUrl && (
                          <Button
                            size="icon"
                            variant="glass"
                            className="h-7 w-7"
                            aria-label={translate({ ro: "Vizită site live", en: "Visit live site" })}
                            onClick={() => window.open(project.siteUrl, "_blank", "noopener,noreferrer")}
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                        )}
                        <Button
                          size="icon"
                          variant="glass"
                          className="h-7 w-7"
                          aria-label={translate({ ro: "Vezi detalii proiect", en: "View project details" })}
                          onClick={() => navigate(project.href)}
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </div>

                      {project.comingSoon && (
                        <div className="absolute bottom-2 left-2 right-2 z-10">
                          <div className="flex items-center justify-center gap-1 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-md border border-white/50 shadow-sm">
                            <span className="text-[10px] font-semibold text-foreground/70">
                              {translate({ ro: "În curând", en: "Coming Soon" })}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="p-3 flex-1 flex flex-col">
                      {project.siteUrl && (
                        <ProjectLiveSiteLink
                          url={project.siteUrl}
                          variant="card"
                          onClick={(e) => e.stopPropagation()}
                        />
                      )}
                      <h3 className="font-semibold text-foreground text-sm leading-tight mb-1 line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted line-clamp-2 mb-2">
                        {project.description[language]}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-auto">
                        {project.technologies.slice(0, 2).map((tech, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 bg-primary/10 text-primary text-[10px] rounded-full">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 2 && (
                          <span className="px-1.5 py-0.5 bg-primary/20 text-primary text-[10px] rounded-full font-semibold">
                            +{project.technologies.length - 2}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="w-full"
          >
            <Card className="group overflow-hidden h-full flex flex-col !rounded-xl">
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mb-3">
                    <motion.div
                      className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-1">
                    {translate({ ro: "Următorul?", en: "Next one?" })}
                  </h3>
                  <p className="text-xs text-muted">
                    {translate({ ro: "Ar putea fi al tău", en: "Could be yours" })}
                  </p>
                </div>
              </div>
              <CardContent className="p-3 flex-1 flex flex-col">
                <h3 className="font-semibold text-foreground text-sm mb-2">
                  {translate({ ro: "Următorul Proiect", en: "The Next Project" })}
                </h3>
                <div className="flex flex-col gap-1.5 mt-auto">
                  <Button size="sm" className="btn-luxury w-full text-xs h-8" asChild>
                    <Link to="/contact">
                      {translate({ ro: "Începe proiectul", en: "Start the project" })}
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" className="w-full text-xs h-8" asChild>
                    <Link to="/pricing">
                      {translate({ ro: "Vezi pachetele", en: "View packages" })}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-20"
        >
          <div className="glass rounded-3xl p-8 md:p-12 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {translate({ ro: "Îți place direcția?", en: "Like the direction?" })}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="glass" asChild>
                <Link to="/contact">
                  {translate({ ro: "Cere o ofertă", en: "Request a quote" })}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/pricing">
                  {translate({ ro: "Vezi pachetele", en: "See packages" })}
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}






