import { motion } from "framer-motion"
import { Check, Star, Zap } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { BackgroundEffects } from "@/components/ui/background-effects"
import { formatCurrency } from "@/lib/utils"

const plans = [
  {
    id: "simple",
    name: "Site Simplu",
    badge: "Site Simplu",
    price: 299,
    description: "Perfect pentru prezentări simple și landing pages",
    features: [
      "Landing page, frumos la cererea clientului (Max 3 secțiuni)",
      "Optimizare mobil",
      "Animații simple",
      "1 Redesign gratuit (€50/redesign/secțiune)",
    ],
    popular: false,
  },
  {
    id: "complex",
    name: "Site Complex",
    badge: "Site Complex",
    price: 399,
    description: "Pentru prezentări complete cu funcționalități avansate",
    features: [
      "Landing page, frumos la cererea clientului (Max 8 secțiuni)",
      "Optimizare mobil",
      "Animații avansate & micro-interacțiuni",
      "SEO",
      "3 Redesign-uri gratuite (€50/redesign/secțiune)",
    ],
    popular: true,
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    badge: "Full",
    price: 799,
    description: "Soluție completă pentru magazin online",
    features: [
      "Landing page, frumos la cererea clientului",
      "Catalog, coș, checkout",
      "Integrare plăți",
      "Animații avansate & micro-interacțiuni",
      "Optimizare mobil",
      "SEO",
      "5 Redesign-uri gratuite (€50/redesign/secțiune)",
    ],
    popular: false,
  },
]

const additionalServices = [
  {
    id: "custom",
    name: "Pachet personalizat",
    badge: "Personalizat",
    price: "La cerere",
    description: "Soluții personalizate pentru nevoi specifice",
    features: [
      "Analiză obiective & recomandări",
      "Roadmap, milestones, KPI",
      "Orice integrare ai nevoie",
    ],
    cta: "Hai să definim pachetul",
  },
  {
    id: "hosting",
    name: "Hosting",
    badge: "Hosting",
    price: 20,
    priceUnit: "/ lună",
    description: "Doar hosting rapid și securizat",
    features: [
      "Hosting rapid & securizat",
      "Certificat SSL inclus",
      "Backup automat zilnic",
      "Suport tehnic 24/7",
      "Domeniu inclus primul an",
    ],
    cta: "Activează Hosting",
    highlighted: false,
  },
  {
    id: "hosting-plus",
    name: "Hosting + Mentenanță",
    badge: "Recomandat",
    price: 50,
    priceUnit: "/ lună",
    description: "Hosting cu mentenanță completă și suport",
    features: [
      "Hosting rapid & securizat",
      "Certificat SSL inclus",
      "Backup automat zilnic",
      "Mentenanță completă",
      "Actualizări de securitate",
      "Suport tehnic prioritar",
      "Domeniu inclus primul an",
    ],
    cta: "Activează Hosting Plus",
    highlighted: true,
  },
]

export function PricingPage() {
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
            Pachete
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto">
            Alege pachetul potrivit pentru obiectivul tău. Toate includ design modern, performanță și implementare curată.
          </p>
        </motion.div>

        {/* Main Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Popular
                  </div>
                </div>
              )}
              
              <Card className={`h-full flex flex-col ${plan.popular ? 'ring-2 ring-primary-500 ring-opacity-50' : ''}`}>
                <CardHeader className="text-center pb-2">
                  <div className="inline-block px-3 py-1 bg-white/50 backdrop-blur-sm rounded-full text-xs font-semibold text-foreground mb-3">
                    {plan.badge}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-3xl font-bold text-foreground">
                    {formatCurrency(plan.price)}
                    <span className="text-sm text-muted font-normal ml-1">proiect</span>
                  </div>
                  <p className="text-sm text-muted mt-2">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="pt-4 flex flex-col flex-1">
                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.2) + (featureIndex * 0.1), duration: 0.5 }}
                        className="flex items-start gap-3 text-sm"
                      >
                        <Check className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <Link to="/contact" className="block mt-auto">
                    <Button 
                      variant={plan.popular ? "primary" : "glass"} 
                      className="w-full"
                    >
                      Alege pachetul
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {additionalServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + (index * 0.2), duration: 0.8 }}
              className="relative"
            >
              <Card 
                className={`h-full flex flex-col ${
                  service.highlighted 
                    ? 'ring-2 ring-primary-500 ring-opacity-50 bg-gradient-to-br from-primary-50/50 to-secondary-50/50' 
                    : ''
                }`}
              >
                <CardHeader className="text-center pb-2">
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                    service.highlighted 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-white/50 backdrop-blur-sm text-foreground'
                  }`}>
                    {service.highlighted && <Zap className="w-3 h-3 inline mr-1" />}
                    {service.badge}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {service.name}
                  </h3>
                  <div className="text-3xl font-bold text-foreground">
                    {typeof service.price === 'number' ? formatCurrency(service.price) : service.price}
                    {service.priceUnit && (
                      <span className="text-sm text-muted font-normal ml-1">{service.priceUnit}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted mt-2">{service.description}</p>
                </CardHeader>
                
                <CardContent className="pt-4 flex flex-col flex-1">
                  <ul className="space-y-3 mb-6 flex-1">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to="/contact" className="block mt-auto">
                    <Button 
                      variant={service.highlighted ? "primary" : "glass"} 
                      className="w-full"
                      size="lg"
                    >
                      {service.cta || "Alege pachetul"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center"
        >
          <p className="text-muted text-sm max-w-3xl mx-auto">
            Toate pachetele includ: implementare responsive, SEO de bază, optimizare viteză, tracking (GA4) și handover clar.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

