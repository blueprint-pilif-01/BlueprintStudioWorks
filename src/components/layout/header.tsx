import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import type { Language } from "@/contexts/language-context"

const navigation = [
  { label: { ro: "Despre", en: "About" }, href: "/about" },
  { label: { ro: "Portofoliu", en: "Portfolio" }, href: "/portfolio" },
  { label: { ro: "Pachete", en: "Packages" }, href: "/pricing" },
  { label: { ro: "The Blueprint", en: "The Blueprint" }, href: "/login" },
] as const

const languageOptions: { code: Language, label: string }[] = [
  { code: "ro", label: "RO" },
  { code: "en", label: "EN" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const { language, setLanguage, translate } = useLanguage()
  
  // Închide meniul când se schimbă pagina
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerUi = (
    <div 
      className="fixed left-0 right-0 z-[2147483647] w-full pointer-events-auto"
      style={{ 
        top: 'max(0.75rem, env(safe-area-inset-top, 0px))',
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      <div className="w-full flex justify-center px-4 sm:px-6">
        <div
          className={cn(
            "liquid-glass-navbar w-full max-w-7xl overflow-hidden transition-all duration-300 ease-in-out",
            isScrolled ? "rounded-3xl" : "rounded-3xl"
          )}
          style={{
            background: isScrolled ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.6)',
            backdropFilter: isScrolled ? 'blur(24px)' : 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: isScrolled 
              ? '0 8px 32px -12px rgba(30, 41, 59, 0.35)' 
              : '0 18px 40px -20px rgba(30, 41, 59, 0.45)',
            paddingLeft: isScrolled ? "1.25rem" : "1.75rem",
            paddingRight: isScrolled ? "1.25rem" : "1.75rem",
            paddingTop: isScrolled ? "0.75rem" : "1rem",
            paddingBottom: isScrolled ? "0.75rem" : "1rem",
          }}
        >
        <div className="flex items-center justify-between">
          {/* Brand (left) */}
          <Link
            to="/"
            className="flex items-center gap-2 group flex-shrink-0 ml-0 sm:ml-3"
            onClick={() => setIsOpen(false)}
          >
            <img
              src="/logoheader.png"
              alt="Blueprint Studio Works"
              className="h-9 sm:h-12 md:h-14 w-auto object-contain"
              loading="eager"
              decoding="async"
            />
          </Link>

          {/* Right side: navigation + hamburger */}
          <div className="ml-4 sm:ml-8 md:ml-16 lg:ml-24 flex items-center">
            <nav 
              className="hidden md:flex items-center transition-all duration-300 ease-in-out"
              style={{ gap: isScrolled ? "0.35rem" : "0.6rem" }}
            >
              {navigation.map((item, index) => {
                const isActive = location.pathname === item.href
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "relative text-foreground/90 hover:text-foreground hover:bg-white/20 transition-all duration-300 ease-in-out px-4 py-2 text-base md:text-lg font-semibold inline-block rounded-2xl group",
                        isActive && "text-foreground bg-white/30"
                      )}
                    >
                      <motion.span
                        className="relative z-10"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.label[language]}
                      </motion.span>
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-white/20 rounded-2xl -z-10"
                          layoutId="activeTab"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-2xl opacity-0 group-hover:opacity-100 -z-20"
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.div>
                )
              })}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navigation.length * 0.1, duration: 0.4 }}
                className="flex items-center"
              >
                <Link 
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "relative text-foreground/90 hover:text-foreground hover:bg-white/20 transition-all duration-300 ease-in-out px-4 py-2 text-base md:text-lg font-semibold inline-block rounded-2xl group"
                  )}
                >
                  <motion.span 
                    className="relative z-10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {translate({ ro: "Contact", en: "Contact" })}
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-2xl opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0, rotate: 180 }}
                    whileHover={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navigation.length * 0.1 + 0.05, duration: 0.4 }}
                className="flex items-center ml-3"
              >
                <div
                  className="flex items-center rounded-2xl bg-white/20 p-1 border border-white/30"
                  role="group"
                  aria-label={translate({ ro: "Selector limbă", en: "Language selector" })}
                >
                  {languageOptions.map(option => (
                    <button
                      key={option.code}
                      type="button"
                      onClick={() => setLanguage(option.code)}
                      className={cn(
                        "px-3 py-1 text-sm font-semibold rounded-2xl transition-all duration-200",
                        language === option.code
                          ? "bg-white text-foreground shadow-sm"
                          : "text-foreground/70 hover:text-foreground"
                      )}
                      aria-pressed={language === option.code}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </nav>
            {/* Mobile menu button */}
            <div className="transition-all duration-300 ease-in-out -mr-2 md:hidden ml-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={translate({ ro: "Comută meniul", en: "Toggle menu" })}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Inline expanding mobile navigation */}
        <AnimatePresence initial={false}>
          <motion.div
            className="md:hidden"
            initial={false}
            animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <nav className="px-4 pt-2 pb-4 flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2 px-4 py-3 mb-2 rounded-2xl bg-white/20 border border-white/30">
                {languageOptions.map(option => (
                  <button
                    key={option.code}
                    type="button"
                    onClick={() => setLanguage(option.code)}
                    className={cn(
                      "flex-1 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
                      language === option.code
                        ? "bg-white text-foreground shadow"
                        : "text-foreground/70 bg-transparent border border-transparent"
                    )}
                    aria-pressed={language === option.code}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {navigation.map((item, index) => {
                const isActive = location.pathname === item.href
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.05, type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "w-full justify-start block px-4 py-3 rounded-xl font-semibold transition-all duration-200",
                        isActive
                          ? "text-foreground bg-primary/10 shadow-sm"
                          : "text-foreground/70 hover:text-foreground hover:bg-foreground/5 active:scale-[0.98]"
                      )}
                    >
                      {item.label[language]}
                    </Link>
                  </motion.div>
                )
              })}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + navigation.length * 0.05, type: "spring", stiffness: 300, damping: 20 }}
                className="pt-3 mt-2 border-t border-foreground/10"
              >
                <Link 
                  to="/contact" 
                  onClick={() => setIsOpen(false)}
                  className="w-full block px-4 py-3 rounded-xl font-semibold text-center transition-all duration-200 active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #00d0ff, #7a5cff)',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0, 208, 255, 0.2)'
                  }}
                >
                  {translate({ ro: "Contact", en: "Contact" })}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </div>
  )

  if (typeof window === "undefined") {
    return null
  }

  return createPortal(headerUi, document.body)
}
