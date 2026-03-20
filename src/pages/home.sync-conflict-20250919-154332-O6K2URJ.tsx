import { memo } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Zap, Clock, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BackgroundEffects } from "@/components/ui/background-effects"

const highlights = [
  {
    icon: Sparkles,
    title: "Claritate",
    description: "Structură simplă, mesaj direct.",
  },
  {
    icon: Clock,
    title: "Seriozitate", 
    description: "Site livrat în 1-2 săptămâni.",
  },
  {
    icon: Zap,
    title: "Fluiditate",
    description: "Animații impresionante care scot în evidență conținutul.",
  },
]

// Memoized highlight component pentru evitarea re-render-urilor
const HighlightCard = memo(({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <Card className="group hover:scale-105 transition-all duration-300">
    <CardContent className="p-6 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-500/10 mb-4 group-hover:bg-primary-500/20 transition-colors">
        <Icon className="w-6 h-6 text-primary-500" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted">{description}</p>
    </CardContent>
  </Card>
))

export const HomePage = memo(() => {
  return (
    <div className="relative">
      <BackgroundEffects variant="hero" />
      
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            {/* Glass card with hero content */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="glass rounded-3xl p-8 md:p-12 shadow-2xl"
            >
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <motion.span 
                  className="block"
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Vrei un site care aduce clienți?
                </motion.span>
                <motion.span 
                  className="block"
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  Design curat, animații fluide?
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-muted max-w-3xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Site-uri de prezentare și e-commerce gândite pentru captarea atenției , rapide, clare și memorabile.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <Link to="/contact">
                  <Button size="lg" variant="glass" className="group">
                    Începe un proiect
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/portfolio">
                  <Button size="lg" variant="outline">
                    Vezi portofoliul
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll hint */}
        <motion.div 
          className="absolute bottom-8 left-8 scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span></span>
        </motion.div>
      </section>

      {/* Mini Highlights Section */}
      <section className="py-12 md:py-16">
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
