import { useEffect, useState } from 'react'

interface TransitionOverlayProps {
  isVisible: boolean
  direction: 'leave' | 'enter'
  onTransitionEnd: () => void
}

export function TransitionOverlay({ isVisible, direction, onTransitionEnd }: TransitionOverlayProps) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true)
    } else {
      const timer = setTimeout(() => setShouldRender(false), 700)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onTransitionEnd()
      }, 700)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onTransitionEnd])

  if (!shouldRender) return null

  return (
    <div
      className={`transition-overlay ${direction === 'leave' ? 'is-leaving' : 'is-entering'}`}
      aria-hidden="true"
    >
      <div className="transition-overlay__blob transition-overlay__blob--top-left" />
      <div className="transition-overlay__blob transition-overlay__blob--top-right" />
      <div className="transition-overlay__blob transition-overlay__blob--bottom-left" />
      <div className="transition-overlay__blob transition-overlay__blob--bottom-right" />
      <div className="transition-overlay__gradient" />
    </div>
  )
}
