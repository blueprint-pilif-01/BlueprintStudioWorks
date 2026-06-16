import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Instagram } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const navigation = [
  { label: { ro: "Portofoliu", en: "Portfolio" }, href: "/portfolio" },
  { label: { ro: "Pachete", en: "Packages" }, href: "/pricing" },
  { label: { ro: "Site Tracker", en: "Site Tracker" }, href: "/tracker" },
  { label: { ro: "Contact", en: "Contact" }, href: "/contact" },
] as const

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/blueprint_studio_works/", icon: Instagram },
]

const contactInfo = [
  { icon: Mail, text: "blueprintstudioworks@gmail.com", href: "mailto:blueprintstudioworks@gmail.com" },
  { icon: Phone, text: "+40 749 084 150", href: "tel:+40749084150" },
  { icon: MapPin, text: { ro: "Timișoara, România", en: "Timișoara, Romania" }, href: "https://maps.google.com/?q=Timi%C8%99oara%2C%20Rom%C3%A2nia" },
] as const

export function Footer() {
  const { language, translate } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto px-6 sm:px-8 lg:px-10 pb-10">
      <div className="container-custom glass flex flex-col gap-10 rounded-[32px] px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 group mb-4">
              <img 
                src="/logofooter.png" 
                alt="Blueprint Studio Works" 
                className="h-20 sm:h-24 md:h-28 w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="text-foreground/70 text-sm leading-relaxed mb-6 max-w-md">
              {translate({
                ro: "Creăm experiențe digitale excepționale prin design modern și dezvoltare web de calitate. Transformăm ideile tale în realitate digitală.",
                en: "We craft exceptional digital experiences through modern design and high-quality web development. Your ideas become immersive digital realities.",
              })}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="p-2 rounded-2xl bg-white/20 hover:bg-white/30 transition-colors group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4 text-foreground/70 group-hover:text-foreground transition-colors" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {translate({ ro: "Navigare", en: "Navigation" })}
            </h3>
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-foreground/70 hover:text-foreground transition-colors text-sm"
                >
                  {item.label[language]}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {translate({ ro: "Contact", en: "Contact" })}
            </h3>
            <div className="flex flex-col gap-3">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon
                return (
                  <motion.a
                    key={index}
                    href={contact.href}
                    className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors text-sm group"
                    whileHover={{ x: 4 }}
                  >
                    <Icon className="h-4 w-4 text-foreground/50 group-hover:text-foreground/70 transition-colors" />
                    <span>{typeof contact.text === "string" ? contact.text : contact.text[language]}</span>
                  </motion.a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-foreground/50 text-sm">
            {translate({
              ro: `© ${currentYear} Blueprint Studio Works. Toate drepturile rezervate.`,
              en: `© ${currentYear} Blueprint Studio Works. All rights reserved.`,
            })}
          </p>
          <div className="flex gap-6 text-sm">
            <Link 
              to="/privacy" 
              className="text-foreground/50 hover:text-foreground/70 transition-colors"
            >
              {translate({ ro: "Politica de confidențialitate", en: "Privacy Policy" })}
            </Link>
            <Link 
              to="/terms" 
              className="text-foreground/50 hover:text-foreground/70 transition-colors"
            >
              {translate({ ro: "Termeni și condiții", en: "Terms & Conditions" })}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
