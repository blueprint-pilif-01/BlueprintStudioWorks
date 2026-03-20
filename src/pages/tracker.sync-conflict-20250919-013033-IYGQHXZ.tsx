import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Clipboard, CheckCircle, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { BackgroundEffects } from "@/components/ui/background-effects"
import { hashToPercent } from "@/lib/utils"

const stages = [
  "Briefing",
  "Wireframe", 
  "Design",
  "Content",
  "Dezvoltare",
  "QA",
  "Lansare",
]

const todoItems = [
  {
    title: "Kickoff & obiective",
    description: "Call de aliniere, definim conversiile și KPI.",
  },
  {
    title: "Sitemap & wireframe",
    description: "Flow pagini, structură secțiuni, CTA-uri.",
  },
  {
    title: "Design vizual",
    description: "Hero, tipografie, culori, sticlă & motion.",
  },
  {
    title: "Content & asset-uri",
    description: "Texte, imagini, logo-uri, iconografie.",
  },
  {
    title: "Implementare",
    description: "HTML/CSS/JS, animații, optimizare performanță.",
  },
  {
    title: "QA & fixuri",
    description: "Cross-browser, mobil, accesibilitate, SEO de bază.",
  },
  {
    title: "Lansare",
    description: "Deploy, tracking GA4, handover & training.",
  },
]

export function TrackerPage() {
  const [code, setCode] = useState("")
  const [progress, setProgress] = useState<number | null>(null)
  const [showResults, setShowResults] = useState(false)

  const handleCheck = async () => {
    if (!code.trim()) return

    // Calculate progress based on code
    const percentage = hashToPercent(code.trim())
    
    // Animate progress
    setProgress(0)
    setShowResults(true)
    
    // Gradually increase progress
    setTimeout(() => setProgress(percentage), 100)
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) {
        setCode(text.trim())
        handleCheck()
      }
    } catch (err) {
      console.error('Failed to paste:', err)
    }
  }

  const getCurrentStage = (percentage: number) => {
    return Math.floor((percentage / 100) * (stages.length - 1))
  }

  const getCompletedTodos = (percentage: number) => {
    return Math.floor((percentage / 100) * (todoItems.length - 1))
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
            Site Tracker
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto">
            Verifică progresul proiectului tău în timp real cu codul de tracking.
          </p>
        </motion.div>

        {/* Tracker Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-md mx-auto mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Introdu codul de tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    placeholder="ex: BSW-2024-ABC123"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                    className="pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePaste}
                    className="absolute right-1 top-1 h-10 w-10"
                    title="Lipește din clipboard"
                  >
                    <Clipboard className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleCheck} disabled={!code.trim()} className="flex-1">
                  <Search className="w-4 h-4 mr-2" />
                  Verifică progresul
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {showResults && progress !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Progress Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Progres proiect</CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress 
                    value={progress} 
                    max={100} 
                    label="Finalizare generală"
                    className="mb-6"
                  />
                  
                  {/* Stage Pills */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {stages.map((stage, index) => {
                      const currentStage = getCurrentStage(progress)
                      const status = index < currentStage ? 'done' : (index === currentStage ? 'current' : 'pending')
                      
                      return (
                        <motion.div
                          key={stage}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            status === 'done' 
                              ? 'bg-green-500/20 text-green-700 border border-green-500/30' 
                              : status === 'current'
                              ? 'bg-primary-500/20 text-primary-700 border border-primary-500/30'
                              : 'bg-white/20 text-muted border border-white/30'
                          }`}
                        >
                          {status === 'done' && <CheckCircle className="w-3 h-3 inline mr-1" />}
                          {status === 'current' && <Clock className="w-3 h-3 inline mr-1" />}
                          {stage}
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Todo List */}
              <Card>
                <CardHeader>
                  <CardTitle>Task-uri și progres detaliat</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {todoItems.map((todo, index) => {
                      const completedTodos = getCompletedTodos(progress)
                      const isCompleted = index < completedTodos
                      
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + (index * 0.1), duration: 0.5 }}
                          className={`flex items-start gap-3 p-3 rounded-2xl transition-colors ${
                            isCompleted ? 'bg-green-500/10' : 'bg-white/10'
                          }`}
                        >
                          <div className="mt-1">
                            {isCompleted ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <div className="w-4 h-4 border-2 border-white/30 rounded-sm" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-medium ${
                              isCompleted ? 'text-foreground' : 'text-muted'
                            }`}>
                              {todo.title}
                            </h4>
                            <p className="text-sm text-muted">
                              {todo.description}
                            </p>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="text-center"
              >
                <Card className="inline-block">
                  <CardContent className="p-6">
                    <p className="text-muted mb-4">
                      Ai întrebări despre progres sau vrei să discutăm următorii pași?
                    </p>
                    <Button variant="glass">
                      Contactează-mă
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

