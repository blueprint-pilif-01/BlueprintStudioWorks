import { memo } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Zap, Clock, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MorphingText } from "@/components/ui/morphing-text"
import { useLanguage } from "@/contexts/language-context"

const highlightContent = {
  ro: [
    {
      icon: Sparkles,
      title: "Site de prezentare",
      description: "Landing page-uri și site-uri de prezentare. Mesaj clar, design curat, livrare în 1-2 săptămâni.",
    },
    {
      icon: Clock,
      title: "Magazin online",
      description: "Magazine online cu coș, plăți și tot ce trebuie ca să vinzi. Construit pe React, gata de scalat.",
    },
    {
      icon: Zap,
      title: "Aplicații web",
      description: "Dashboard-uri, formulare complexe, platforme cu backend. Fac ce ai nevoie, nu template-uri.",
    },
  ],
  en: [
    {
      icon: Sparkles,
      title: "Presentation website",
      description: "Landing pages and brochure sites. Clear message, clean design, delivered in 1-2 weeks.",
    },
    {
      icon: Clock,
      title: "Online store",
      description: "Shops with cart, payments and the basics to start selling. Built on React, ready to grow.",
    },
    {
      icon: Zap,
      title: "Web apps",
      description: "Dashboards, complex forms, platforms with a backend. Built for your case, not a template.",
    },
  ],
} as const

const morphingTexts = {
  ro: ['elegant?', 'modern?', 'fluid?', 'clar?', 'fresh?', 'profi?', 'intuitiv?', 'atractiv?', 'superb?'],
  en: ['elegant?', 'modern?', 'fluid?', 'clear?', 'fresh?', 'pro-level?', 'intuitive?', 'engaging?', 'stunning?'],
} as const

// Memoized highlight component pentru evitarea re-render-urilor
const HighlightCard = memo(({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <Card className="group glass rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 h-full overflow-hidden relative">
      <CardContent className="p-4 sm:p-6 md:p-8 h-full flex flex-col relative z-10">
        <div className="flex items-center mb-4 md:mb-6">
          <motion.div 
            className="p-2 sm:p-3 rounded-xl bg-primary/20 group-hover:bg-primary/30 transition-colors duration-300 flex-shrink-0"
            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </motion.div>
          <h3 className="ml-3 sm:ml-4 font-bold text-foreground" style={{ fontSize: "clamp(1rem, 3vw, 1.25rem)" }}>
            {title}
          </h3>
        </div>
        <p className="text-muted-foreground leading-relaxed flex-1" style={{ fontSize: "clamp(0.875rem, 2.5vw, 1.125rem)" }}>
          {description}
        </p>
      </CardContent>
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ scale: 0, rotate: 45 }}
        whileHover={{ scale: 1.5, rotate: 0 }}
        transition={{ duration: 0.6 }}
      />
    </Card>
  </motion.div>
))

export const HomePage = memo(() => {
  const { language, translate } = useLanguage()
  const highlights = highlightContent[language]
  const morphTexts = [...morphingTexts[language]]

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative flex items-start justify-center pt-28 pb-8 md:pt-32 md:pb-12">
        
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            {/* Glass card with hero content */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="glass rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl"
            >
              <motion.h1
                className="font-bold text-foreground leading-tight"
                style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <motion.span
                  className="block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  {translate({ ro: "Vrei un site", en: "Want a website" })}
                </motion.span>
              </motion.h1>

              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", minHeight: "clamp(2.5rem, 8vw, 5rem)" }}
              >
                <MorphingText
                  texts={morphTexts}
                  className="text-foreground"
                />
              </motion.div>

              <motion.p
                className="text-muted max-w-3xl mx-auto mb-8 mt-4"
                style={{ fontSize: "clamp(1rem, 3vw, 1.25rem)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                {translate({
                  ro: "Fac site-uri care arată bine și merg bine. Design modern, animații discrete, cod curat.",
                  en: "I build sites that look good and work well. Modern design, subtle motion, clean code.",
                })}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <Link to="/contact">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" variant="glass" className="group relative overflow-hidden">
                      <span className="relative z-10 flex items-center">
                        {translate({ ro: "Începe un proiect", en: "Start a project" })}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/portfolio">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" variant="outline" className="group">
                      {translate({ ro: "Vezi portofoliul", en: "See the portfolio" })}
                      <motion.span
                        className="ml-2 inline-block"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mini Highlights Section */}
      <section className="pt-4 pb-16 md:pt-8 md:pb-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <HighlightCard 
                  icon={highlight.icon}
                  title={highlight.title}
                  description={highlight.description}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
})

HomePage.displayName = 'HomePage'
