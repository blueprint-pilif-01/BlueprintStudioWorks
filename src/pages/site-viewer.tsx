import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, MessageSquare, X, Send, ClipboardList, CheckSquare, Square, ChevronUp, ChevronDown } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/contexts/language-context"
import { SITE_METADATA, SITE_PATHS, TRACKER_STORAGE_KEYS, type SiteIdentifier, type TrackerTodo } from "@/lib/site-tracker"
import { cn } from "@/lib/utils"

type SiteViewerLocationState = {
  siteName?: SiteIdentifier
}

const isSiteIdentifier = (value: string | null): value is SiteIdentifier => {
  return !!value && Object.prototype.hasOwnProperty.call(SITE_PATHS, value)
}

const resolveSiteUrl = (relativePath: string) => {
  const sanitizedPath = relativePath.replace(/^\//, "")
  const baseFromEnv = import.meta.env.BASE_URL ?? "/"

  if (typeof window === "undefined") {
    return `${baseFromEnv}${sanitizedPath}`
  }

  const baseUrl = new URL(baseFromEnv, window.location.origin)
  return new URL(sanitizedPath, baseUrl).toString()
}

const TRACKER_MESSAGE_SOURCE = "bsw-site-tracker"

const priorityStyles: Record<TrackerTodo["priority"], string> = {
  high: "text-red-500 bg-red-500/10 border-red-500/20",
  medium: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  low: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
}

const statusStyles: Record<TrackerTodo["status"], string> = {
  "in-progress": "text-primary-500 bg-primary-500/10 border-primary-500/20",
  todo: "text-muted-foreground bg-muted/40 border-border",
  done: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
}

const PRIORITY_LABELS: Record<TrackerTodo["priority"], string> = {
  high: "Prioritate mare",
  medium: "Prioritate medie",
  low: "Prioritate scăzută",
}

const STATUS_LABELS: Record<TrackerTodo["status"], string> = {
  "in-progress": "În derulare",
  todo: "De făcut",
  done: "Finalizat",
}

const getPersistedSiteName = (): SiteIdentifier | "" => {
  if (typeof window === "undefined") return ""

  try {
    const stored = sessionStorage.getItem(TRACKER_STORAGE_KEYS.activeSite)
    return isSiteIdentifier(stored) ? stored : ""
  } catch {
    return ""
  }
}

export function SiteViewerPage() {
  const { translate } = useLanguage()
  const location = useLocation()
  const locationState = (location.state as SiteViewerLocationState) || null
  const incomingSiteName = locationState?.siteName

  const [siteName, setSiteName] = useState<SiteIdentifier | "">(() => {
    if (incomingSiteName) return incomingSiteName
    return getPersistedSiteName()
  })

  useEffect(() => {
    if (incomingSiteName && incomingSiteName !== siteName) {
      setSiteName(incomingSiteName)
    }

    if (incomingSiteName) {
      try {
        sessionStorage.setItem(TRACKER_STORAGE_KEYS.activeSite, incomingSiteName)
      } catch {
        // Non-blocking if storage is unavailable
      }
    }
  }, [incomingSiteName, siteName])

  const [showFeedback, setShowFeedback] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [clientPagePath, setClientPagePath] = useState("/")
  const [showTodos, setShowTodos] = useState(false)
  const [todoState, setTodoState] = useState<Record<string, boolean>>({})
  const [headerVisible, setHeaderVisible] = useState(true)

  const siteMeta = siteName ? SITE_METADATA[siteName] : undefined
  const sitePath = siteMeta?.path
  const siteUrl = useMemo(() => (sitePath ? resolveSiteUrl(sitePath) : ""), [sitePath])

  const todos = siteMeta?.todos ?? []
  const completedTodos = todos.filter((todo) => todoState[todo.id]).length
  const todoProgress = todos.length ? Math.round((completedTodos / todos.length) * 100) : 0

  useEffect(() => {
    setClientPagePath("/")
    setShowTodos(false)
  }, [siteName])

  useEffect(() => {
    if (!siteMeta?.slug || typeof window === "undefined") {
      setTodoState({})
      return
    }

    try {
      const raw = localStorage.getItem(TRACKER_STORAGE_KEYS.todoState)
      const parsed = raw ? JSON.parse(raw) : {}
      setTodoState(parsed[siteMeta.slug] || {})
    } catch {
      setTodoState({})
    }
  }, [siteMeta?.slug])

  useEffect(() => {
    if (!siteMeta?.slug || typeof window === "undefined") return

    try {
      const raw = sessionStorage.getItem(TRACKER_STORAGE_KEYS.feedbackDrafts)
      const parsed = raw ? JSON.parse(raw) : {}
      const storedDraft = parsed[siteMeta.slug]
      setFeedback(typeof storedDraft === "string" ? storedDraft : "")
    } catch {
      setFeedback("")
    }
  }, [siteMeta?.slug])

  useEffect(() => {
    if (!siteMeta?.slug || typeof window === "undefined") return

    try {
      const raw = sessionStorage.getItem(TRACKER_STORAGE_KEYS.feedbackDrafts)
      const parsed = raw ? JSON.parse(raw) : {}

      if (feedback.trim()) {
        parsed[siteMeta.slug] = feedback
      } else {
        delete parsed[siteMeta.slug]
      }

      sessionStorage.setItem(TRACKER_STORAGE_KEYS.feedbackDrafts, JSON.stringify(parsed))
    } catch (error) {
      console.warn("Nu am putut salva draftul de feedback:", error)
    }
  }, [feedback, siteMeta?.slug])

  useEffect(() => {
    if (!siteMeta) return

    type TrackerMessage = {
      source: typeof TRACKER_MESSAGE_SOURCE
      slug: string
      siteName: string
      path: string
    }

    const handleMessage = (event: MessageEvent<TrackerMessage>) => {
      if (event.origin !== window.location.origin) return
      const data = event.data
      if (!data || data.source !== TRACKER_MESSAGE_SOURCE) return
      if (siteMeta.slug && data.slug !== siteMeta.slug) return

      const normalizedPath = typeof data.path === "string" && data.path.trim() ? data.path : "/"
      setClientPagePath(normalizedPath)
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [siteMeta, siteName])

  const persistTodoState = (slug: string, state: Record<string, boolean>) => {
    if (typeof window === "undefined") return

    try {
      const raw = localStorage.getItem(TRACKER_STORAGE_KEYS.todoState)
      const parsed = raw ? JSON.parse(raw) : {}
      parsed[slug] = state
      localStorage.setItem(TRACKER_STORAGE_KEYS.todoState, JSON.stringify(parsed))
    } catch (error) {
      console.warn("Nu am putut salva statusul to-do:", error)
    }
  }

  const handleToggleTodo = (todoId: string) => {
    if (!siteMeta?.slug) return

    setTodoState((prev) => {
      const next = { ...prev }
      const nextValue = !prev[todoId]
      if (nextValue) {
        next[todoId] = true
      } else {
        delete next[todoId]
      }
      persistTodoState(siteMeta.slug, next)
      return next
    })
  }

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:3001"
      const response = await fetch(`${apiBase}/api/public/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          siteName,
          pageName: clientPagePath,
          feedback,
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setFeedback("")
        setTimeout(() => {
          setSubmitted(false)
          setShowFeedback(false)
        }, 3000)
      }
    } catch (error) {
      console.error("Error submitting feedback:", error)
    } finally {
      setSubmitting(false)
    }
  }

  if (!siteName || !sitePath || !siteUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {translate({ ro: "Acces invalid", en: "Invalid access" })}
          </h1>
          <Link to="/tracker">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {translate({ ro: "Înapoi", en: "Go back" })}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const headerHeight = 56

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Header with back button */}
      <motion.div
        initial={false}
        animate={{ y: headerVisible ? 0 : -headerHeight }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="absolute top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border"
      >
        <div className="container-custom py-3 flex flex-wrap items-center gap-3 justify-between">
          <Link to="/tracker" className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {translate({ ro: "Înapoi la tracker", en: "Back to tracker" })}
          </Link>
          <div className="text-sm font-medium">
            {siteName}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setHeaderVisible(!headerVisible)}
            className="ml-auto"
            title={headerVisible ? translate({ ro: "Ascunde header-ul", en: "Hide header" }) : translate({ ro: "Afișează header-ul", en: "Show header" })}
          >
            {headerVisible ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
      </motion.div>

      {/* Floating toggle button when header is hidden */}
      <AnimatePresence>
        {!headerVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-50"
          >
            <Button
              variant="default"
              size="sm"
              onClick={() => setHeaderVisible(true)}
              className="shadow-lg"
            >
              <ChevronDown className="w-4 h-4 mr-2" />
              {translate({ ro: "Afișează header", en: "Show header" })}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {todos.length > 0 && (
        <>
          <AnimatePresence>
            {showTodos && (
              <motion.div
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 200, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className="fixed left-4 z-40 w-full max-w-sm rounded-[28px] border border-white/15 bg-gradient-to-br from-white/12 via-white/6 to-white/4 backdrop-blur-2xl shadow-[0_25px_65px_rgba(15,23,42,0.35)] overflow-hidden"
                style={{ top: headerVisible ? "96px" : "16px" }}
              >
                <div className="p-5 border-b border-white/5 bg-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">Status proiect</p>
                    <h3 className="font-semibold text-white text-lg">Lista To-Do</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-white/60">Progres</p>
                    <p className="text-base font-semibold text-white">{todoProgress}%</p>
                  </div>
                </div>
                <div className="px-5 pt-4">
                  <div className="flex items-center justify-between text-xs text-white/70 mb-3">
                    <span>{completedTodos} din {todos.length} finalizate</span>
                    <span>Prioritizează</span>
                  </div>
                  <div className="h-2 bg-white/15 rounded-full overflow-hidden mb-5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-pink-500"
                      style={{ width: `${todoProgress}%` }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto custom-scroll">
                  {todos.map((todo) => {
                    const done = !!todoState[todo.id]
                    const priorityClass = priorityStyles[todo.priority]
                    const statusClass = statusStyles[todo.status]
                    return (
                      <button
                        key={todo.id}
                        type="button"
                        onClick={() => handleToggleTodo(todo.id)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all backdrop-blur ${
                          done
                            ? "border-emerald-400/40 bg-emerald-400/10 shadow-inner shadow-emerald-400/10"
                            : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30"
                        }`}
                      >
                        <div className="flex items-start gap-3 text-white/90">
                          <span
                            className={`mt-1 rounded-md border ${done ? "border-green-500 text-green-500" : "border-white/25 text-white/70"}`}
                          >
                            {done ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                          </span>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className={`font-medium ${done ? "line-through text-white/60" : ""}`}>{todo.title}</p>
                              <span className={`text-[11px] px-2 py-0.5 rounded-full border ${priorityClass}`}>
                                {PRIORITY_LABELS[todo.priority]}
                              </span>
                            </div>
                            <p className="text-sm text-white/75 mt-1">{todo.description}</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <span className={`text-[11px] px-2 py-0.5 rounded-full border ${statusClass}`}>
                                {STATUS_LABELS[todo.status]}
                              </span>
                              {todo.tags?.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[11px] uppercase tracking-wide bg-white/10 text-white/60 px-2 py-0.5 rounded-full border border-white/10"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Site iframe */}
      <motion.iframe
        key={siteUrl}
        src={siteUrl}
        className="w-full h-full"
        initial={false}
        animate={{ marginTop: headerVisible ? `${headerHeight}px` : "0px" }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        title={siteName}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-downloads allow-modals allow-top-navigation-by-user-activation"
      />

      {/* Floating controls */}
      <div className="fixed left-4 bottom-4 z-50 flex gap-3">
        {todos.length > 0 && (
          <motion.button
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            onClick={() => setShowTodos((prev) => !prev)}
            aria-pressed={showTodos}
            className={cn(
              "bg-white/90 text-slate-900 border border-white/80 rounded-full px-4 py-3 text-sm font-medium shadow-lg flex items-center gap-2 transition-colors",
              showTodos ? "border-primary-500/60 text-primary-600" : "hover:border-primary-500/50"
            )}
          >
            <ClipboardList className="w-4 h-4" />
            Lista To-Do
          </motion.button>
        )}
        <AnimatePresence>
          {!showFeedback && (
            <motion.button
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              onClick={() => setShowFeedback(true)}
              className="bg-primary-500 hover:bg-primary-600 text-white rounded-full p-4 shadow-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageSquare className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Feedback panel */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed left-4 bottom-4 z-50 w-96 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary-500" />
                <h3 className="font-semibold">
                  {translate({ ro: "Trimite Feedback", en: "Send Feedback" })}
                </h3>
              </div>
              <button
                onClick={() => setShowFeedback(false)}
                className="text-muted hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Send className="w-8 h-8 text-green-500" />
                  </div>
                  <p className="text-green-500 font-medium">
                    {translate({ ro: "Feedback trimis cu succes!", en: "Feedback sent successfully!" })}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmitFeedback} className="space-y-4">
                  <div>
                    <label className="text-sm text-muted mb-2 block">
                      {translate({ ro: "Site", en: "Site" })}
                    </label>
                    <div className="px-3 py-2 bg-muted/30 rounded-lg text-sm font-medium">
                      {siteName}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-muted mb-2 block">
                      {translate({ ro: "Pagina din site", en: "Client page" })}
                    </label>
                    <div className="px-3 py-2 bg-muted/30 rounded-lg text-sm font-medium font-mono">
                      {clientPagePath}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="feedback" className="text-sm text-muted mb-2 block">
                      {translate({ ro: "Ce vrei să adaugi/modifici?", en: "What do you want to add/modify?" })}
                    </label>
                    <Textarea
                      id="feedback"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder={translate({ 
                        ro: "Descrie ce modificări vrei să faci pe această pagină...",
                        en: "Describe what changes you want to make on this page..."
                      })}
                      rows={6}
                      className="resize-none"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={submitting || !feedback.trim()}
                  >
                    {submitting ? (
                      translate({ ro: "Se trimite...", en: "Sending..." })
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {translate({ ro: "Trimite Feedback", en: "Send Feedback" })}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
