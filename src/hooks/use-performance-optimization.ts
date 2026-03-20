import { useEffect } from 'react'

export function usePerformanceOptimization() {
  useEffect(() => {
    // Doar pausăm animațiile când tab-ul pierde focus (pentru baterie)
    const togglePause = () => {
      if (document.hidden) {
        document.body.classList.add('is-paused')
      } else {
        document.body.classList.remove('is-paused')
      }
    }

    document.addEventListener('visibilitychange', togglePause, { passive: true })

    return () => {
      document.removeEventListener('visibilitychange', togglePause)
    }
  }, [])
}
