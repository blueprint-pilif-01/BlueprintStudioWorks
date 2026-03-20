import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export function useMPATransitions() {
  console.log('🎯 useMPATransitions hook called')
  const [isTransitioning, setIsTransitioning] = useState(true) // Force true for testing
  const [transitionDirection, setTransitionDirection] = useState<'leave' | 'enter'>('enter') // Force enter for testing
  const navigate = useNavigate()

  // Check if animations are disabled
  const isAnimationsDisabled = () => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isDisabled = localStorage.getItem('bsw.animations') === 'off'
    return isReducedMotion || isDisabled
  }

  // Navigate with transition
  const navigateWithTransition = useCallback((path: string) => {
    if (isTransitioning || isAnimationsDisabled()) {
      navigate(path)
      return
    }

    console.log('🚀 Starting MPA transition to:', path)
    setTransitionDirection('leave')
    setIsTransitioning(true)

    // Navigate after transition
    setTimeout(() => {
      console.log('📍 Navigating to:', path)
      navigate(path)
    }, 300)
  }, [isTransitioning, navigate])

  // Run enter animation on page load
  useEffect(() => {
    console.log('🔄 useEffect for enter animation called')
    if (isAnimationsDisabled()) {
      console.log('⚠️ Animations disabled, skipping enter animation')
      return
    }

    // Force enter animation for testing
    console.log('✨ Running enter animation IMMEDIATELY')
    setTransitionDirection('enter')
    setIsTransitioning(true)

    const timer = setTimeout(() => {
      console.log('🏁 Enter animation completed')
      setIsTransitioning(false)
    }, 2000) // Longer for testing

    return () => clearTimeout(timer)
  }, [])

  // Handle transition end
  const handleTransitionEnd = useCallback(() => {
    console.log('🏁 Transition completed')
    setIsTransitioning(false)
  }, [])

  return {
    isTransitioning,
    transitionDirection,
    navigateWithTransition,
    handleTransitionEnd
  }
}
