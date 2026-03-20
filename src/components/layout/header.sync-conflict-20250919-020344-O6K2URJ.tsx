import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Portofoliu", href: "/portfolio" },
  { name: "Pachete", href: "/pricing" },
  { name: "Site Tracker", href: "/tracker" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/75 border-b border-white/20">
      <div className="container-custom flex items-center justify-between py-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <svg 
              viewBox="0 0 180 40" 
              className="h-8 w-[72px]" 
              role="img" 
              aria-label="BSW"
            >
              <text 
                x="0" 
                y="28" 
                className="fill-none stroke-foreground stroke-[1.4] opacity-90 text-[24px] font-bold"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                BSW
              </text>
            </svg>
          </div>
          <span className="font-bold text-foreground/90 hidden sm:block group-hover:text-foreground transition-colors">
            Blueprint Studio Works
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-3">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link key={item.href} to={item.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "relative text-foreground/80 hover:text-foreground hover:bg-white/20",
                    isActive && "text-foreground bg-white/30"
                  )}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-full -z-10"
                      layoutId="activeTab"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Button>
              </Link>
            )
          })}
          <Link to="/contact">
            <Button variant="glass" size="sm" className="ml-2 group relative overflow-hidden">
              <span className="relative z-10">Contact</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 opacity-0 group-hover:opacity-100"
                initial={{ scale: 0, rotate: 180 }}
                whileHover={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </Link>
        </nav>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/90 backdrop-blur-lg border-b border-white/20"
          >
            <nav className="container-custom py-4 flex flex-col gap-2">
              {navigation.map((item, index) => {
                const isActive = location.pathname === item.href
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-foreground/80 hover:text-foreground hover:bg-white/20",
                          isActive && "text-foreground bg-white/30"
                        )}
                      >
                        {item.name}
                      </Button>
                    </Link>
                  </motion.div>
                )
              })}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navigation.length * 0.1 }}
                className="pt-2"
              >
                <Link 
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                >
                  <Button variant="glass" className="w-full group relative overflow-hidden">
                    <span className="relative z-10">Contact</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 opacity-0 group-hover:opacity-100"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.4 }}
                    />
                  </Button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
