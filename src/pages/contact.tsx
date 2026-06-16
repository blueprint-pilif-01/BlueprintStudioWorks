import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { FormSubmit } from "@/components/ui/form-submit"
import { Star, Calculator, Euro, Sparkles } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001"

type PackageOption = {
  value: string
  label: { ro: string; en: string }
  price: number
  description?: { ro: string; en: string }
  popular?: boolean
}

type ExtraService = {
  value: string
  label: { ro: string; en: string }
  price: number
  period: { ro: string; en: string }
  originalPrice?: number
  note?: { ro: string; en: string }
}

const packageOptions: PackageOption[] = [
  { value: "", label: { ro: "Nu sunt sigur încă", en: "Not sure yet" }, price: 0 },
  { value: "simple", label: { ro: "Site Simplu", en: "Simple Website" }, price: 400, description: { ro: "Pentru freelanceri, artiști, firme mici", en: "For freelancers, artists, and small businesses" } },
  { value: "complex", label: { ro: "Site Complex", en: "Complex Website" }, price: 750, description: { ro: "Pentru firme medii, organizații, proiecte serioase", en: "For mid-sized companies, organizations, and serious projects" } },
  { value: "complex-backend", label: { ro: "Site Complex + Backend", en: "Complex Website + Backend" }, price: 1200, description: { ro: "Pentru proiecte care necesită funcționalități avansate", en: "For projects that need advanced functionality" }, popular: true },
  { value: "ecommerce", label: { ro: "E-commerce", en: "E-commerce" }, price: 1600, description: { ro: "Pentru magazine online și vânzări directe", en: "For online stores and direct sales" } },
  { value: "custom", label: { ro: "Personalizat", en: "Custom" }, price: 0, description: { ro: "Preț negociabil în funcție de complexitate", en: "Price negotiated based on complexity" } },
] as const

const additionalServices: ExtraService[] = [
  { value: "hosting", label: { ro: "Hosting", en: "Hosting" }, price: 30, period: { ro: "lună", en: "month" } },
  { value: "support", label: { ro: "Suport Premium", en: "Premium Support" }, price: 100, period: { ro: "lună", en: "month" }, note: { ro: "Prima lună GRATUITĂ", en: "First month FREE" } },
  { value: "combo", label: { ro: "Hosting + Suport Premium", en: "Hosting + Premium Support" }, price: 120, period: { ro: "lună", en: "month" }, originalPrice: 130, note: { ro: "Reducere €10/lună", en: "€10/month discount" } },
] as const

export function ContactPage() {
  const [selectedPackage, setSelectedPackage] = useState("")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const { language, translate } = useLanguage()

  const calculateTotal = () => {
    const packagePrice = packageOptions.find(p => p.value === selectedPackage)?.price || 0
    const servicesPrice = selectedServices.reduce((total, service) => {
      const serviceData = additionalServices.find(s => s.value === service)
      return total + (serviceData?.price || 0)
    }, 0)
    return packagePrice + servicesPrice
  }

  const handleFormSubmit = async (formData: FormData) => {
    const genericError = translate({
      ro: "Nu am putut trimite formularul. Te rugăm să încerci din nou.",
      en: "We couldn't send the form. Please try again.",
    })

    try {
      const formDataObj = Object.fromEntries(formData.entries())
      const selectedPackageData = packageOptions.find(p => p.value === selectedPackage)
      const selectedServicesData = selectedServices
        .map(service => additionalServices.find(s => s.value === service))
        .filter((service): service is (typeof additionalServices)[number] => Boolean(service))

      const fullName = `${formDataObj.nume ?? ""} ${formDataObj.prenume ?? ""}`.trim()
      const packageLabel = selectedPackageData
        ? selectedPackageData.label[language]
        : translate({ ro: "Nu a fost selectat", en: "Not selected" })
      const packagePrice = selectedPackageData?.price ? formatCurrency(selectedPackageData.price) : "€0"

      const formatService = (service: (typeof additionalServices)[number]) =>
        `${service.label[language]} - ${formatCurrency(service.price)}/${service.period[language]}`

      const servicesSummary =
        selectedServicesData.length > 0
          ? selectedServicesData.map(formatService).join(", ")
          : translate({ ro: "Niciun serviciu suplimentar", en: "No add-on services" })
      const totalEstimate = formatCurrency(calculateTotal())

      const response = await fetch(`${API_BASE}/api/public/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          fullName,
          email: formDataObj.email,
          phone: formDataObj.telefon,
          siteName: formDataObj.siteName,
          domain: formDataObj.domain,
          packageLabel,
          packagePrice,
          servicesSummary,
          totalEstimate,
          description: formDataObj.descriere,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.error || genericError)
      }

      setTimeout(() => {
        setSelectedPackage("")
        setSelectedServices([])
      }, 3000)
    } catch (error) {
      console.error("Contact form error:", error)
      throw new Error(error instanceof Error ? error.message : genericError)
    }
  }

  return (
    <div className="relative">
      <div className="container-custom py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {translate({ ro: "Ai un proiect?", en: "Got a project?" })}
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-muted max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {translate({ ro: "Spune-mi ce ai nevoie. Răspund de obicei în 1-2 zile.", en: "Tell me what you need. I usually reply within a couple of days." })}
          </motion.p>
        </motion.div>

        {/* Contact Form, visible directly */}
        <div className="max-w-2xl mx-auto relative">
              <motion.div
                key="form"
                initial={{
                  opacity: 0,
                  y: 32,
                  scale: 0.97
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1
                }}
                transition={{
                  delay: 0.45,
                  duration: 0.8,
                  ease: [0.22, 0.61, 0.36, 1]
                }}
              >
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-center">
                      {translate({ ro: "Să discutăm despre proiectul tău", en: "Let's talk about your project" })}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormSubmit
                      onSubmit={handleFormSubmit}
                      submitText={translate({ ro: "Trimite brief", en: "Send brief" })}
                      successText={translate({ ro: "Mesajul a fost trimis! Îți voi răspunde în cel mai scurt timp posibil.", en: "Message sent! I'll reply as soon as possible." })}
                      className="space-y-6"
                    >
                      {/* Name fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nume">
                            {translate({ ro: "Nume", en: "Last name" })}
                          </Label>
                          <Input
                            id="nume"
                            name="nume"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="prenume">
                            {translate({ ro: "Prenume", en: "First name" })}
                          </Label>
                          <Input
                            id="prenume"
                            name="prenume"
                            required
                          />
                        </div>
                      </div>

                      {/* Contact fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="telefon">
                            {translate({ ro: "Număr de telefon", en: "Phone number" })}
                          </Label>
                          <Input
                            id="telefon"
                            name="telefon"
                            type="tel"
                            placeholder="+40 ..."
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                          />
                        </div>
                      </div>

                      {/* Project fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="siteName">
                            {translate({ ro: "Numele site-ului", en: "Website name" })}
                          </Label>
                          <Input
                            id="siteName"
                            name="siteName"
                            placeholder={translate({ ro: "ex: Blueprint Studio Works", en: "e.g. Blueprint Studio Works" })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="domain">
                            {translate({ ro: "Domeniul preferat", en: "Preferred domain" })}
                          </Label>
                          <Input
                            id="domain"
                            name="domain"
                            placeholder={translate({ ro: "ex: exemplu.ro", en: "e.g. example.com" })}
                          />
                        </div>
                      </div>

                      {/* Package selection with pricing */}
                      <div className="space-y-4">
                        <Label className="text-lg font-semibold">
                          {translate({ ro: "Alege pachetul", en: "Choose a package" })}
                        </Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {packageOptions.map((option) => (
                            <motion.div
                              key={option.value}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${
                                selectedPackage === option.value
                                  ? 'border-primary-500 bg-primary-500/10'
                                  : 'border-white/20 bg-white/5 hover:border-white/40'
                              }`}
                              onClick={() => setSelectedPackage(option.value)}
                            >
                              <input
                                type="radio"
                                name="package"
                                value={option.value}
                                checked={selectedPackage === option.value}
                                onChange={() => setSelectedPackage(option.value)}
                                className="sr-only"
                              />
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-foreground">
                                  {option.label[language]}
                                </h3>
                                {option.popular && (
                                  <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                    <Star className="w-3 h-3" />
                                    {translate({ ro: "Popular", en: "Popular" })}
                                  </span>
                                )}
                              </div>
                              {option.description && (
                                <p className="text-sm text-muted mb-2">
                                  {option.description[language]}
                                </p>
                              )}
                              <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-primary-500">
                                  {option.price > 0 ? formatCurrency(option.price) : translate({ ro: "Negociabil", en: "Negotiable" })}
                                </span>
                                {option.price > 0 && (
                                  <span className="text-sm text-muted">
                                    {translate({ ro: "de la", en: "starting at" })}
                                  </span>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Additional services */}
                      <div className="space-y-4">
                        <Label className="text-lg font-semibold flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-primary-500" />
                          {translate({ ro: "Servicii suplimentare", en: "Additional services" })}
                        </Label>
                        <div className="space-y-3">
                          {additionalServices.map((service, index) => (
                            <motion.div
                              key={service.value}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1, duration: 0.5 }}
                              whileHover={{ scale: 1.02, x: 4 }}
                              whileTap={{ scale: 0.98 }}
                              className={`relative flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                                selectedServices.includes(service.value)
                                  ? 'border-primary-500 bg-gradient-to-r from-primary-500/20 to-secondary-500/10 shadow-lg'
                                  : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
                              }`}
                              onClick={() => {
                                if (selectedServices.includes(service.value)) {
                                  setSelectedServices(selectedServices.filter(s => s !== service.value))
                                } else {
                                  setSelectedServices([...selectedServices, service.value])
                                }
                              }}
                            >
                              {service.originalPrice && (
                                <motion.div
                                  className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg"
                                  initial={{ scale: 0, rotate: -45 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  transition={{ delay: 0.3 + index * 0.1, type: "spring", bounce: 0.5 }}
                                >
                                  -€10
                                </motion.div>
                              )}
                              <div className="flex items-center gap-3">
                                <motion.div
                                  animate={selectedServices.includes(service.value) ? { scale: [1, 1.2, 1] } : {}}
                                  transition={{ duration: 0.3 }}
                                >
                                  <input
                                    type="checkbox"
                                    id={service.value}
                                    name="services"
                                    value={service.value}
                                    checked={selectedServices.includes(service.value)}
                                    onChange={(e) => {
                                      e.stopPropagation()
                                      if (e.target.checked) {
                                        setSelectedServices([...selectedServices, service.value])
                                      } else {
                                        setSelectedServices(selectedServices.filter(s => s !== service.value))
                                      }
                                    }}
                                    className="w-5 h-5 text-primary-500 rounded-md cursor-pointer"
                                  />
                                </motion.div>
                                <div>
                                  <Label htmlFor={service.value} className="font-semibold cursor-pointer text-base">
                                    {service.label[language]}
                                  </Label>
                                  {service.note && (
                                    <p className="text-xs text-primary-500 font-medium mt-1">
                                      {service.note[language]}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                {service.originalPrice && (
                                  <div className="text-sm text-muted line-through">
                                    {formatCurrency(service.originalPrice)}
                                  </div>
                                )}
                                <div className="text-xl font-bold text-primary-500">
                                  {formatCurrency(service.price)}
                                </div>
                                <div className="text-xs text-muted">/{service.period[language]}</div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Price calculator */}
                      {selectedPackage && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-gradient-to-r from-primary-500/20 to-primary-600/20 rounded-xl p-6 border border-primary-500/30"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <Calculator className="w-5 h-5 text-primary-500" />
                            <h3 className="text-lg font-semibold">
                              {translate({ ro: "Estimare preț", en: "Price estimate" })}
                            </h3>
                          </div>
                          <div className="space-y-2">
                            {selectedPackage && (
                              <div className="flex justify-between">
                                <span>{packageOptions.find(p => p.value === selectedPackage)?.label?.[language]}</span>
                                <span className="font-semibold">
                                  {formatCurrency(packageOptions.find(p => p.value === selectedPackage)?.price || 0)}
                                </span>
                              </div>
                            )}
                            {selectedServices.map(service => {
                              const serviceData = additionalServices.find(s => s.value === service)
                              return (
                                <div key={service} className="flex justify-between text-sm text-muted">
                                  <span>+ {serviceData ? serviceData.label[language] : ""}</span>
                                  <span>{formatCurrency(serviceData?.price || 0)}</span>
                                </div>
                              )
                            })}
                            <div className="border-t border-white/20 pt-2 mt-4">
                              <div className="flex justify-between text-xl font-bold">
                                <span>{translate({ ro: "Total estimat", en: "Estimated total" })}</span>
                                <span className="text-primary-500 flex items-center gap-1">
                                  <Euro className="w-5 h-5" />
                                  {formatCurrency(calculateTotal())}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Project description */}
                      <div className="space-y-2">
                        <Label htmlFor="descriere">
                          {translate({ ro: "Descrierea proiectului", en: "Project description" })}
                        </Label>
                        <Textarea
                          id="descriere"
                          name="descriere"
                          placeholder={translate({
                            ro: "Spune-mi ce ai în minte: obiectiv, public țintă, funcționalități, referințe...",
                            en: "Tell me what you have in mind: goal, target audience, features, references...",
                          })}
                          rows={4}
                        />
                      </div>

                      {/* Terms checkbox */}
                      <div className="flex items-start gap-3 p-4 bg-white/20 rounded-2xl">
                        <input
                          type="checkbox"
                          id="terms"
                          name="terms"
                          value="true"
                          required
                          className="mt-1"
                        />
                        <div>
                          <Label htmlFor="terms" className="font-semibold">
                            {translate({ ro: "Sunt de acord cu ", en: "I agree to the " })}
                            <a href="/terms" className="text-primary-500 hover:underline" target="_blank" rel="noopener noreferrer">
                              {translate({ ro: "Termenii și Condițiile", en: "Terms & Conditions" })}
                            </a>
                          </Label>
                          <p className="text-sm text-muted">
                            {translate({ ro: "Trebuie să bifezi această căsuță pentru a trimite formularul.", en: "You need to check this box before submitting the form." })}
                          </p>
                        </div>
                      </div>
                    </FormSubmit>
                  </CardContent>
                </Card>
              </motion.div>
        </div>
      </div>
    </div>
  )
}






