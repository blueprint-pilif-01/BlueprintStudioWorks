import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface BackgroundEffectsProps {
  variant?: "hero" | "edge" | "minimal" | "portfolio" | "divine"
  className?: string
}

export function BackgroundEffects({ variant = "hero", className }: BackgroundEffectsProps) {
  const [blobsLoaded, setBlobsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setBlobsLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  if (variant === "edge") {
    return (
      <div className={cn("fixed inset-0 pointer-events-none -z-10", className)}>
        {blobsLoaded && <div className="grid-bg" />}
        {blobsLoaded && <div className="dots-field" aria-hidden="true" />}
        {blobsLoaded && (
          <div className="blob-stage-edge" aria-hidden="true">
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
        {blobsLoaded && <div className="grid-bg" />}
        {blobsLoaded && <div className="dots-field" aria-hidden="true" />}
      </div>
    )
  }

  if (variant === "portfolio") {
    return (
      <div className={cn("fixed inset-0 pointer-events-none -z-10", className)}>
        {blobsLoaded && <div className="grid-bg" />}
        {blobsLoaded && <div className="dots-field" aria-hidden="true" />}
        {blobsLoaded && (
          <div className="blob-stage-portfolio" aria-hidden="true">
            <div className="blob-portfolio-1" />
            <div className="blob-portfolio-2" />
            <div className="blob-portfolio-3" />
            <div className="blob-portfolio-4" />
            <div className="blob-portfolio-5" />
          </div>
        )}
      </div>
    )
  }

  if (variant === "divine") {
    return (
      <div className={cn("fixed inset-0 pointer-events-none -z-10", className)}>
        {blobsLoaded && <div className="grid-bg" />}
        {blobsLoaded && <div className="dots-field" aria-hidden="true" />}
        {blobsLoaded && (
          <div className="blob-stage-divine" aria-hidden="true">
            <div className="blob-divine-1" />
            <div className="blob-divine-2" />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn("fixed inset-0 pointer-events-none -z-10", className)}>
      {blobsLoaded && <div className="grid-bg" />}
      {blobsLoaded && <div className="dots-field" aria-hidden="true" />}
      {blobsLoaded && (
        <div className="blob-stage" id="blobStage" aria-hidden="true">
          <div className="blob b1" />
          <div className="blob b2" />
          <div className="blob b3" />
          <div className="blob b4" />
        </div>
      )}
    </div>
  )
}
