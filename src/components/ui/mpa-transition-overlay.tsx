import { useEffect, useState } from 'react'

interface MPATransitionOverlayProps {
  isVisible: boolean
  direction: 'leave' | 'enter'
  onTransitionEnd: () => void
}

export function MPATransitionOverlay({ isVisible, direction, onTransitionEnd }: MPATransitionOverlayProps) {
  console.log('🎨 MPATransitionOverlay render:', { isVisible, direction })
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

  if (!shouldRender) {
    console.log('🚫 MPATransitionOverlay not rendering (shouldRender=false)')
    return null
  }

  console.log('✅ MPATransitionOverlay rendering with classes:', `transition-overlay ${direction === 'leave' ? 'is-leaving' : 'is-entering'}`)

  return (
    <div
      className={`transition-overlay ${direction === 'leave' ? 'is-leaving' : 'is-entering'}`}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        background: 'red',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '24px',
        fontWeight: 'bold'
      }}
    >
      <div>TEST OVERLAY - {direction.toUpperCase()}</div>
    </div>
  )
}
