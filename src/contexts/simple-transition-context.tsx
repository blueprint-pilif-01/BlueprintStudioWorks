import { createContext, useContext, type ReactNode, useEffect } from 'react'
import { useSimpleTransitions } from '@/hooks/use-simple-transitions'

interface SimpleTransitionContextType {
  isTransitioning: boolean
  navigateWithTransition: (path: string) => void
}

const SimpleTransitionContext = createContext<SimpleTransitionContextType | undefined>(undefined)

interface SimpleTransitionProviderProps {
  children: ReactNode
}

export function SimpleTransitionProvider({ children }: SimpleTransitionProviderProps) {
  const transition = useSimpleTransitions()

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Ignore modified clicks or already handled
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const target = e.target as HTMLElement | null
      if (!target) return
      const link = target.closest('a') as HTMLAnchorElement | null
      if (!link) return
      if (link.hasAttribute('download')) return
      if (link.target && link.target !== '' && link.target !== '_self') return
      const href = link.getAttribute('href')
      if (!href) return
      if (href.startsWith('#')) return
      const url = new URL(href, window.location.href)
      if (url.origin !== window.location.origin) return
      const current = window.location.pathname + window.location.search + window.location.hash
      const next = url.pathname + url.search + url.hash
      if (current === next) return
      // Intercept navigation and run our transition
      e.preventDefault()
      transition.navigateWithTransition(next)
    }
    // Use capture phase so we intercept before React Router's Link stops propagation
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true } as any)
  }, [transition])

  return (
    <SimpleTransitionContext.Provider value={transition}>
      {children}
    </SimpleTransitionContext.Provider>
  )
}

export function useSimpleTransition() {
  const context = useContext(SimpleTransitionContext)
  if (context === undefined) {
    throw new Error('useSimpleTransition must be used within a SimpleTransitionProvider')
  }
  return context
}
