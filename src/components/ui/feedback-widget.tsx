import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/contexts/language-context"
import { useLocation } from "react-router-dom"

export function FeedbackWidget() {
  const { translate } = useLanguage()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const getCurrentPageName = () => {
    const pathMap: Record<string, { ro: string; en: string }> = {
      "/": { ro: "Acasă", en: "Home" },
      "/about": { ro: "Despre noi", en: "About" },
      "/portfolio": { ro: "Portofoliu", en: "Portfolio" },
      "/pricing": { ro: "Prețuri", en: "Pricing" },
      "/contact": { ro: "Contact", en: "Contact" },
      "/tracker": { ro: "Tracker", en: "Tracker" },
      "/xmet": { ro: "XMET", en: "XMET" },
      "/biserica": { ro: "Biserica Vertical", en: "Biserica Vertical" },
      "/carmina": { ro: "Carmina Estela", en: "Carmina Estela" },
      "/selectrik": { ro: "Selectrik", en: "Selectrik" },
      "/divine": { ro: "Divine", en: "Divine" },
      "/ruethis": { ro: "RueThis", en: "RueThis" },
      "/privacy": { ro: "Confidențialitate", en: "Privacy" },
      "/terms": { ro: "Termeni și condiții", en: "Terms & Conditions" }
    }

    return translate(pathMap[location.pathname] || { ro: "Pagină necunoscută", en: "Unknown page" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!feedback.trim()) return

    setIsSubmitting(true)

    const apiBase = import.meta.env.VITE_API_URL || "http://localhost:3001"

    try {
      const response = await fetch(`${apiBase}/api/public/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          siteName: "Blueprint Studio Works",
          pageName: getCurrentPageName(),
          feedback,
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
        setFeedback("")
        setTimeout(() => {
          setIsSuccess(false)
          setIsOpen(false)
        }, 2000)
      }
    } catch (error) {
      console.error("Failed to submit feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 left-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </Button>
      </motion.div>

      {/* Feedback Form */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-6 z-50 w-80 bg-background border border-border rounded-lg shadow-xl p-4"
          >
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                  <Send className="w-8 h-8 text-green-500" />
                </div>
                <p className="font-semibold text-foreground">
                  {translate({ ro: "Mulțumim pentru feedback!", en: "Thank you for your feedback!" })}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {translate({ ro: "Trimite-ne feedback", en: "Send us feedback" })}
                  </h3>
                  <p className="text-sm text-muted">
                    {translate({
                      ro: "Spune-ne ce îți place sau ce am putea îmbunătăți",
                      en: "Tell us what you like or what we could improve"
                    })}
                  </p>
                </div>

                <div className="text-xs text-muted space-y-1">
                  <p>
                    <span className="font-semibold">
                      {translate({ ro: "Pagină:", en: "Page:" })}
                    </span>{" "}
                    {getCurrentPageName()}
                  </p>
                </div>

                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder={translate({
                    ro: "Scrie feedback-ul tău aici...",
                    en: "Write your feedback here..."
                  })}
                  className="resize-none h-32"
                  disabled={isSubmitting}
                />

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {translate({ ro: "Anulează", en: "Cancel" })}
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isSubmitting || !feedback.trim()}>
                    {isSubmitting
                      ? translate({ ro: "Se trimite...", en: "Sending..." })
                      : translate({ ro: "Trimite", en: "Send" })}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
