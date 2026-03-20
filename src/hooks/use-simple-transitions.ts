import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export function useSimpleTransitions() {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const navigate = useNavigate()

  const navigateWithTransition = useCallback((path: string) => {
    if (isTransitioning) return

    setIsTransitioning(true)

    // Navigate after a short delay to show transition
    setTimeout(() => {
      navigate(path)
      
      // Hide transition after navigation
      setTimeout(() => {
        setIsTransitioning(false)
      }, 300)
    }, 200)
  }, [isTransitioning, navigate])

  return {
    isTransitioning,
    navigateWithTransition
  }
}
