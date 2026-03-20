import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Eye } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BackgroundEffects } from "@/components/ui/background-effects"

const filters = [
  { id: "all", label: "Toate" },
  { id: "landing", label: "Landing" },
  { id: "ecom", label: "eCommerce" },
  { id: "brand", label: "Brand" },
  { id: "saas", label: "SaaS" },
]

const projects = [
  {
    id: 1,
    title: "Divine Skin",
    description: "Branding • Design • E-commerce",
    categories: ["brand", "ecom"],
    image: "/divine.jpg",
    href: "/divine",
  },
  {
    id: 2,
    title: "Ruethis Design",
    description: "Branding • Design • Web",
    categories: ["brand", "landing"],
    image: "/ruethis.jpg",
    href: "/ruethis",
  },
  {
    id: 3,
    title: "Coming soon",
    description: "The next site could be yours",
    categories: ["brand"],
    image: "https://picsum.photos/seed/soon-1/1200/800",
    href: "/coming-soon",
  },
]

export function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())

  const filteredProjects = projects.filter(project => 
    activeFilter === "all" || project.categories.includes(activeFilter)
  )

  const handleImageLoad = (projectId: number) => {
    setLoadedImages(prev => new Set(prev).add(projectId))
  }

  return (
    <div className="relative">
      <BackgroundEffects variant="edge" />
      
      <div className="container-custom py-20 pt-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Portofoliu
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto">
            Selecție de proiecte gândite pentru conversie, viteză și memorabilitate.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "glass" : "ghost"}
              size="sm"
              onClick={() => setActiveFilter(filter.id)}
              className="relative"
            >
              {filter.label}
              {activeFilter === filter.id && (
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-full -z-10"
                  layoutId="activeFilter"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                  <Link to={project.href} className="block">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {/* Loading state */}
                      {!loadedImages.has(project.id) && (
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <motion.div
                            className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                        </div>
                      )}
                      
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onLoad={() => handleImageLoad(project.id)}
                        loading="lazy"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Action buttons */}
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button 
                          size="icon" 
                          variant="glass" 
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.preventDefault()
                            window.location.href = project.href
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {project.href !== "/coming-soon" && (
                          <Button 
                            size="icon" 
                            variant="glass" 
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.preventDefault()
                              window.open(project.href, '_blank')
                            }}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </Link>
                  
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted">
                          {project.description}
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault()
                          window.location.href = project.href
                        }}
                      >
                        Detalii
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
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
              Îți place direcția?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="glass">
                Cere o ofertă
              </Button>
              <Button size="lg" variant="outline">
                Vezi pachetele
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

