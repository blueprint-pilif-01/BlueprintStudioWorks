import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface BackgroundEffectsProps {
  variant?: "hero" | "edge" | "minimal"
  className?: string
}

export function BackgroundEffects({ variant = "hero", className }: BackgroundEffectsProps) {
  const [blobsLoaded, setBlobsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLowPerformance, setIsLowPerformance] = useState(false)
  const blobStageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Detect low performance devices
    const detectPerformance = () => {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      const isLowEnd = !gl || navigator.hardwareConcurrency <= 2
      setIsLowPerformance(isLowEnd)
    }

    detectPerformance()
  }, [])

  useEffect(() => {
    // Delay blob loading to improve initial page performance
    const timer = setTimeout(() => {
      setBlobsLoaded(true)
    }, isLowPerformance ? 2000 : 1000) // Longer delay for low performance devices

    return () => clearTimeout(timer)
  }, [isLowPerformance])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (blobStageRef.current && !isLowPerformance) {
        const rect = blobStageRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setMousePosition({ x, y })
      }
    }

    if (variant === "hero" && !isLowPerformance) {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [variant, isLowPerformance])
  if (variant === "edge") {
    return (
      <div className={cn("fixed inset-0 pointer-events-none -z-10", className)}>
        {/* Grid background */}
        <div className="grid-bg" />
        
        {/* Edge blobs - positioned on margins */}
        {blobsLoaded && (
          <div className="blob-stage-edge">
            <div className="blob blob-edge-left" />
            <div className="blob blob-edge-right" />
          </div>
        )}
      </div>
    )
  }

  if (variant === "minimal") {
    return (
      <div className={cn("fixed inset-0 pointer-events-none -z-10", className)}>
        <div className="grid-bg" />
      </div>
    )
  }

  return (
    <div className={cn("fixed inset-0 pointer-events-none -z-10", className)}>
      {/* Grid background */}
      <div className="grid-bg" />
      
      {/* Hero blobs - lazy loaded for better initial performance */}
      {blobsLoaded && (
        <div 
          ref={blobStageRef}
          className={cn("blob-stage", isLowPerformance && "low-performance")}
          id="blobStage" 
          aria-hidden="true"
          style={{
            '--mouse-x': `${mousePosition.x}%`,
            '--mouse-y': `${mousePosition.y}%`
          } as React.CSSProperties}
        >
          <div className={cn("blob b1", !isLowPerformance && "interactive-blob")} />
          <div className={cn("blob b2", !isLowPerformance && "interactive-blob")} />
          <div className={cn("blob b3", !isLowPerformance && "interactive-blob")} />
          <div className={cn("blob b4", !isLowPerformance && "interactive-blob")} />
          
          {/* Dotted design elements */}
          <div className="dots dots-tl" aria-hidden="true" />
          <div className="dots dots-br" aria-hidden="true" />
        </div>
      )}
    </div>
  )
}