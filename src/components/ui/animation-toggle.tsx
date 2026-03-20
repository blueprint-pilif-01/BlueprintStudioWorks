import { useState, useEffect } from 'react'
import { Button } from './button'
import { Play, Pause } from 'lucide-react'

export function AnimationToggle() {
  const [isEnabled, setIsEnabled] = useState(true)

  useEffect(() => {
    // Check initial state
    const isDisabled = localStorage.getItem('bsw.animations') === 'off'
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    setIsEnabled(!isDisabled && !isReducedMotion)
  }, [])

  const toggleAnimations = () => {
    const newState = !isEnabled
    setIsEnabled(newState)
    
    if (newState) {
      localStorage.setItem('bsw.animations', 'on')
      document.documentElement.classList.remove('reduce-motion')
    } else {
      localStorage.setItem('bsw.animations', 'off')
      document.documentElement.classList.add('reduce-motion')
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleAnimations}
      className="flex items-center gap-2 text-muted hover:text-foreground"
      title={isEnabled ? 'Disable animations' : 'Enable animations'}
    >
      {isEnabled ? (
        <>
          <Pause className="w-4 h-4" />
          <span className="hidden sm:inline">Disable animations</span>
        </>
      ) : (
        <>
          <Play className="w-4 h-4" />
          <span className="hidden sm:inline">Enable animations</span>
        </>
      )}
    </Button>
  )
}
