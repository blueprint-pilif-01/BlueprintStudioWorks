import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { useLanguage } from '@/contexts/language-context'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const { translate } = useLanguage()

  useEffect(() => {
    // Check if user has already made a choice
    const consentGiven = localStorage.getItem('cookie-consent')
    if (!consentGiven) {
      // Show consent banner after 2 seconds
      const timer = setTimeout(() => setShowConsent(true), 2000)
      return () => clearTimeout(timer)
    } else if (consentGiven === 'accepted') {
      // Initialize Google Analytics if consent was given
      initializeGoogleAnalytics()
    }
  }, [])

  const initializeGoogleAnalytics = () => {
    // Load Google Analytics script
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-6D0CRGHMND'
    document.head.appendChild(script1)

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || []
    window.gtag = function() {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', 'G-6D0CRGHMND', {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    })
  }

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    initializeGoogleAnalytics()
    setShowConsent(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setShowConsent(false)
  }

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:max-w-md z-[9999]"
          style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)' }}
        >
          <Card className="glass border-2 border-white/20 shadow-2xl">
            <div className="p-4 sm:p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-xl bg-primary/20 flex-shrink-0">
                  <Cookie className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-2 text-base">
                    {translate({ ro: "Cookie-uri și Analytics", en: "Cookies & Analytics" })}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {translate({
                      ro: "Folosim Google Analytics pentru a înțelege cum vizitatorii interacționează cu site-ul. Datele sunt anonimizate și ne ajută să îmbunătățim experiența.",
                      en: "We use Google Analytics to understand how visitors interact with the site. The data is anonymized and helps us improve the experience.",
                    })}
                  </p>
                </div>
                <button
                  onClick={handleDecline}
                  className="p-1 hover:bg-foreground/10 rounded-lg transition-colors flex-shrink-0"
                  aria-label={translate({ ro: "Închide", en: "Close" })}
                >
                  <X className="h-4 w-4 text-foreground/60" />
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={handleAccept}
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg"
                >
                  {translate({ ro: "Accept", en: "Accept" })}
                </Button>
                <Button
                  onClick={handleDecline}
                  size="sm"
                  variant="outline"
                  className="flex-1"
                >
                  {translate({ ro: "Refuz", en: "Decline" })}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
