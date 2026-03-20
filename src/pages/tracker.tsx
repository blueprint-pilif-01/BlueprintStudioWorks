import { motion } from "framer-motion"
import { ArrowLeft, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { useLanguage } from "@/contexts/language-context"
import { useState } from "react"
import { ACCESS_CODES, TRACKER_STORAGE_KEYS } from "@/lib/site-tracker"

export function TrackerPage() {
  const { translate } = useLanguage()
  const navigate = useNavigate()
  const [code, setCode] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const normalizedCode = code.trim().toLowerCase()
    const accessData = ACCESS_CODES[normalizedCode]

    if (accessData) {
      const accessLog = JSON.parse(localStorage.getItem(TRACKER_STORAGE_KEYS.accessLog) || "[]")
      accessLog.push({
        code: normalizedCode,
        siteName: accessData.site,
        timestamp: new Date().toISOString()
      })
      localStorage.setItem(TRACKER_STORAGE_KEYS.accessLog, JSON.stringify(accessLog))

      sessionStorage.setItem(TRACKER_STORAGE_KEYS.activeSite, accessData.site)
      setCode("")

      // Navigate to site viewer
      navigate("/site-viewer", { state: { siteName: accessData.site } })
    } else {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  return (
    <div className="relative">
      <div className="container-custom py-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {translate({ ro: "Înapoi la pagina principală", en: "Back to the main page" })}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-primary-500/10 flex items-center justify-center mb-6">
              <Lock className="w-12 h-12 text-primary-500" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-4"
          >
            {translate({ ro: "Acces Proiect", en: "Project Access" })}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg text-muted mb-8"
          >
            {translate({
              ro: "Introduceți codul de acces pentru a vizualiza proiectul",
              en: "Enter your access code to view the project"
            })}
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <Input
                type="text"
                placeholder={translate({ ro: "Cod de acces", en: "Access code" })}
                value={code}
                onChange={(e) => {
                  if (error) setError(false)
                  setCode(e.target.value)
                }}
                className={`text-center text-lg py-6 ${error ? 'border-red-500 shake' : ''}`}
                autoFocus
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-2"
                >
                  {translate({ ro: "Cod invalid. Vă rugăm încercați din nou.", en: "Invalid code. Please try again." })}
                </motion.p>
              )}
            </div>

            <Button type="submit" size="lg" className="w-full">
              {translate({ ro: "Accesează proiectul", en: "Access project" })}
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 pt-8 border-t border-border"
          >
            <p className="text-sm text-muted">
              {translate({
                ro: "Nu aveți cod de acces? Contactați-ne pentru a primi unul.",
                en: "Don't have an access code? Contact us to receive one."
              })}
            </p>
            <Link to="/contact" className="mt-4 inline-block">
              <Button variant="ghost" size="sm">
                {translate({ ro: "Contactează-ne", en: "Contact us" })}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}






