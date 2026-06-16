import { motion } from "framer-motion"
import { 
  Palette, 
  Zap, 
  Globe, 
  Database, 
  Sparkles,
  Mail,
  Heart,
  Rocket,
  Target,
  Users
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

const technologies = [
  {
    category: "Frontend",
    icon: Palette,
    color: "from-blue-500 to-cyan-500",
    items: [
      "React & Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "HTML5 & CSS3"
    ]
  },
  {
    category: "Backend",
    icon: Database,
    color: "from-purple-500 to-pink-500",
    items: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "REST APIs"
    ]
  },
  {
    category: "Tools & Platforms",
    icon: Zap,
    color: "from-orange-500 to-yellow-500",
    items: [
      "Git",
      "Vite & Webpack",
      "Figma",
      "Vercel & Netlify",
      "Nodemailer"
    ]
  },
  {
    category: "E-commerce",
    icon: Globe,
    color: "from-green-500 to-emerald-500",
    items: [
      "Stripe & PayPal",
      "Shopping Cart Logic",
      "Product Management",
      "Order Processing",
      "Analytics"
    ]
  }
]

const projects = [
  {
    name: "Divine Skin",
    type: { ro: "Site Complex", en: "Complex Website" },
    description: {
      ro: "Am creat un site premium pentru un salon de epilare din Timișoara. 7 pagini complete, design elegant cu gold/green palette, features avansate ca PDF generation și pricing calculator.",
      en: "I built a premium website for Divine Skin, a laser hair removal studio from Timișoara. Seven full pages, an elegant gold/green palette, and advanced features like PDF generation and a pricing calculator.",
    },
    technologies: ["React", "TypeScript", "Tailwind", "E-commerce"],
    link: "/divine"
  },
  {
    name: "Biserica Vertical",
    type: { ro: "Aplicație Web", en: "Web Application" },
    description: {
      ro: "Ecosistem digital complet pentru o comunitate bisericească: site public, platformă tineret UNITED, planner intern cu 25+ pagini. Cel mai complex proiect din portofoliu.",
      en: "A complete digital ecosystem for a church community: public site, UNITED youth platform, in-house planner with 25+ pages. The most complex project in the portfolio.",
    },
    technologies: ["HTML", "CSS", "JavaScript", "CMS"],
    link: "/biserica"
  },
  {
    name: "Selectrik",
    type: { ro: "Aplicație Web", en: "Web Application" },
    description: {
      ro: "Dashboard interactiv pentru vizualizare și generare certificate electronice cu funcții avansate.",
      en: "An interactive dashboard for viewing and generating electronic certificates with advanced functionality.",
    },
    technologies: ["React", "API Integration", "PDF Generation"],
    link: "/selectrik"
  },
  {
    name: "X-MET",
    type: { ro: "Site de Prezentare", en: "Presentation Website" },
    description: {
      ro: "Site corporativ pentru companie de sisteme metalice cu galerii video și formular contact.",
      en: "Corporate website for a metal systems company with video galleries and a detailed contact form.",
    },
    technologies: ["React", "Video Integration", "Responsive Design"],
    link: "/xmet"
  },
  {
    name: "Ruethis",
    type: { ro: "Landing Page", en: "Landing Page" },
    description: {
      ro: "Landing page modern pentru aplicație mobilă de networking cu animații fluide.",
      en: "Modern landing page for a networking mobile app with fluid animations.",
    },
    technologies: ["React", "Framer Motion", "Modern UI"],
    link: "/ruethis"
  },
  {
    name: "Carmina Estela",
    type: { ro: "Site Complex", en: "Complex Website" },
    description: {
      ro: "Portfolio elegant pentru artist cu galerie foto și design minimalist.",
      en: "Elegant portfolio for an artist with curated galleries and a minimalist design system.",
    },
    technologies: ["React", "Image Optimization", "Gallery"],
    link: "/carmina"
  }
] as const

const values = [
  {
    icon: Target,
    title: { ro: "Claritate & Simplitate", en: "Clarity & Simplicity" },
    description: {
      ro: "Cred că designul bun e invizibil. Fiecare element are un scop, nimic nu e acolo doar ca să arate bine.",
      en: "Good design stays out of the way. Every element has a job. Nothing is there just for show.",
    }
  },
  {
    icon: Rocket,
    title: { ro: "Performanță", en: "Performance" },
    description: {
      ro: "Construiesc site-uri rapide care se încarcă instant. Optimizare, lazy loading, code splitting , totul pentru experiență fluidă.",
      en: "I build fast sites. Lazy loading, code splitting, the usual performance work, so pages feel snappy.",
    }
  },
  {
    icon: Heart,
    title: { ro: "Atenție la Detalii", en: "Attention to Detail" },
    description: {
      ro: "Îmi pasă de detalii mici care fac diferența: tranziții de 600ms, spacing perfect, animații subtile care se simt bine.",
      en: "I obsess over the small things: 600ms transitions, perfect spacing, subtle animations that feel right.",
    }
  },
  {
    icon: Users,
    title: { ro: "Colaborare", en: "Collaboration" },
    description: {
      ro: "Lucrez alături de clienți ca un partener, nu ca un contractor. Înțeleg viziunea ta și o transform în cod funcțional.",
      en: "I work with you, not around you. I listen, then I build what we agreed on.",
    }
  }
] as const

export function AboutPage() {
  const { language, translate } = useLanguage()

  return (
    <div className="relative">
      <div className="container-custom py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="font-bold text-foreground mb-6" style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}>
              {translate({
                ro: "Despre Blueprint Studio Works",
                en: "About Blueprint Studio Works",
              })}
            </h1>
            <p className="text-muted max-w-3xl mx-auto leading-relaxed" style={{ fontSize: "clamp(1rem, 3vw, 1.5rem)" }}>
              {translate({
                ro: "Sunt Filip Bulc. Fac site-uri și aplicații web cu React, de la landing page la platforme cu backend.",
                en: "I'm Filip Bulc. I build websites and web apps with React, from simple landing pages to full platforms.",
              })}
            </p>
          </motion.div>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-20"
        >
          <Card className="glass rounded-3xl shadow-2xl overflow-hidden">
            <CardContent className="p-4 sm:p-6 md:p-8 lg:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {/* Profile Photo */}
                <motion.div
                  className="flex justify-center md:col-span-1"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border-4 border-white/50 shadow-2xl flex items-center justify-center overflow-hidden">
                    <img
                      src="/pozapilif.png"
                      alt="Filip Bulc"
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </motion.div>

                {/* Bio */}
                <div className="md:col-span-2">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {translate({ ro: "Salut, sunt Filip Bulc 👋", en: "Hi, I'm Filip Bulc 👋" })}
                  </h2>
                  <p className="text-lg text-muted leading-relaxed mb-4">
                    {translate({
                      ro: "Sunt fondatorul Blueprint Studio Works. Lucrez direct cu clienții, fără agenție și fără complicații inutile.",
                      en: "I founded Blueprint Studio Works. I work directly with clients, no agency layer and no unnecessary process.",
                    })}
                  </p>
                  <p className="text-lg text-muted leading-relaxed mb-4">
                    {translate({
                      ro: "Folosesc React, TypeScript și Tailwind. Îmi place designul curat și site-urile care se încarcă repede.",
                      en: "I use React, TypeScript and Tailwind. I like clean design and sites that load fast.",
                    })}
                  </p>
                  <p className="text-lg text-muted leading-relaxed mb-6">
                    {translate({
                      ro: "Am făcut proiecte pentru freelanceri, firme mici și proiecte mai complexe. Mă interesează claritatea, viteza și ca vizitatorul să înțeleagă rapid ce oferi.",
                      en: "I've built for freelancers, small businesses and larger projects. I care about clarity, speed and helping visitors understand what you do.",
                    })}
                  </p>

                  {/* Contact Info */}
                  <div className="flex flex-wrap gap-4">
                    <motion.a
                      href="mailto:blueprintstudioworks@gmail.com"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/30 hover:bg-white/40 backdrop-blur-sm rounded-xl border border-white/50 transition-all duration-300"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="text-sm font-semibold">blueprintstudioworks@gmail.com</span>
                    </motion.a>
                    <motion.a
                      href="tel:+40749084150"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/30 hover:bg-white/40 backdrop-blur-sm rounded-xl border border-white/50 transition-all duration-300"
                    >
                      <span className="text-sm font-semibold">+40 749 084 150</span>
                    </motion.a>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-xl border border-white/50">
                      <span className="text-sm font-semibold">
                        {translate({ ro: "📍 Timișoara, România", en: "📍 Timișoara, Romania" })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            {translate({ ro: "Valorile Mele", en: "My Values" })}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title.ro}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="h-full group hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="w-8 h-8 text-primary-500" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {value.title[language]}
                    </h3>
                    <p className="text-muted leading-relaxed">
                      {value.description[language]}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technologies Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            {translate({ ro: "Tehnologii & Instrumente", en: "Technologies & Tools" })}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.category}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <Card className="h-full group hover:shadow-2xl transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${tech.color} bg-opacity-20 group-hover:scale-110 transition-transform duration-300`}>
                        <tech.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">
                        {tech.category}
                      </h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tech.items.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: (index * 0.1) + (itemIndex * 0.05), duration: 0.4 }}
                          className="flex items-center gap-2 text-muted"
                        >
                          <Sparkles className="w-4 h-4 text-primary-500 flex-shrink-0" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Projects Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            {translate({ ro: "Proiecte Realizate", en: "Completed Projects" })}
          </h2>
          <p className="text-lg text-muted text-center max-w-2xl mx-auto mb-12">
            {translate({
              ro: "O selecție din proiectele mele recente, de la magazine online la platforme complexe.",
              en: "A selection of recent builds, from online stores to complex platforms.",
            })}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Link to={project.link}>
                  <Card className="h-full group hover:shadow-2xl transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="mb-3">
                        <div className="inline-block px-3 py-1 bg-primary-500/20 rounded-full text-xs font-semibold text-primary-500 mb-3">
                          {project.type[language]}
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary-500 transition-colors">
                          {project.name}
                        </h3>
                      </div>
                      <p className="text-muted text-sm leading-relaxed mb-4">
                        {project.description[language]}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-white/30 rounded-lg text-xs text-foreground font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link to="/portfolio">
              <Button size="lg" variant="glass" className="group">
                {translate({ ro: "Vezi Toate Proiectele", en: "See All Projects" })}
                <Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Card className="glass rounded-3xl shadow-2xl overflow-hidden">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {translate({ ro: "Hai să creăm ceva împreună", en: "Let's build something together" })}
              </h2>
              <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
                {translate({
                  ro: "Ai un proiect în minte? Să discutăm despre cum pot să te ajut să-ți transformi ideea în realitate.",
                  en: "Have a project in mind? Let's talk about how I can turn that idea into reality.",
                })}
              </p>
              <Link to="/contact">
                <Button size="lg" variant="glass" className="group">
                  {translate({ ro: "Începe un Proiect", en: "Start a Project" })}
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
