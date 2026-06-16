import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

interface FormSubmitProps {
  onSubmit: (data: FormData) => Promise<void>
  children: React.ReactNode
  submitText?: string
  successText?: string
  errorText?: string
  className?: string
  disabled?: boolean
}

export function FormSubmit({
  onSubmit,
  children,
  submitText,
  successText,
  errorText,
  className = "",
  disabled = false
}: FormSubmitProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { translate } = useLanguage()

  const submitLabel = submitText ?? translate({ ro: "Trimite", en: "Send" })
  const successMessage = successText ?? translate({ ro: "Mesajul a fost trimis!", en: "Your message has been sent!" })
  const errorMessage = errorText ?? translate({ ro: "A apărut o eroare. Te rugăm să încerci din nou.", en: "Something went wrong. Please try again." })

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current)
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (disabled || isSubmitting) return

    const form = e.currentTarget
    setIsSubmitting(true)
    setError(null)

    try {
      const formData = new FormData(form)
      await onSubmit(formData)
      
      setIsSubmitted(true)
      
      // Reset form after 3 seconds
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current)
      }

      resetTimeoutRef.current = setTimeout(() => {
        setIsSubmitted(false)
        if (form.isConnected) {
          form.reset()
        }
        resetTimeoutRef.current = null
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
      
      <div className="mt-6">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-4"
          >
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-green-600 font-medium">{successMessage}</p>
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-4"
          >
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-red-600 font-medium">{error}</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setError(null)}
              className="mt-2"
            >
              {translate({ ro: "Încearcă din nou", en: "Try again" })}
            </Button>
          </motion.div>
        ) : (
          <Button
            type="submit"
            size="lg"
            variant="glass"
            disabled={disabled || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <motion.div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                {submitLabel}
              </>
            )}
          </Button>
        )}
      </div>
    </form>
  )
}
