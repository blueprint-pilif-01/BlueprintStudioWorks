import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface BackgroundEffectsProps {
  variant?: "hero" | "edge" | "minimal" | "portfolio" | "divine"
  className?: string
}

export function BackgroundEffects({ variant = "hero", className }: BackgroundEffectsProps) {
  const [blobsLoaded, setBlobsLoaded] = useState(false)

  useEffect(() => {
    // Load blobs după 500ms (mai rapid pentru vizibilitate)
    const timer = setTimeout(() => {
      setBlobsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])
  if (variant === "edge") {
    return (
      <div className={cn("fixed inset-0 pointer-events-none -z-10", className)}>
        {/* Grid background - lazy loaded cu blobii */}
        {blobsLoaded && <div className="grid-bg" />}

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
        {blobsLoaded && <div className="grid-bg" />}
      </div>
    )
  }

  if (variant === "portfolio") {
    return (
      <div className={cn("fixed inset-0 pointer-events-none -z-10", className)}>
        {/* Grid background - lazy loaded cu blobii */}
        {blobsLoaded && <div className="grid-bg" />}

        {/* Portfolio blobs - balanced number for portfolio pages */}
        {blobsLoaded && (
          <div className="blob-stage-portfolio" aria-hidden="true">
            <div className="blob blob-portfolio-1" />
            <div className="blob blob-portfolio-2" />
            <div className="blob blob-portfolio-3" />
            <div className="blob blob-portfolio-4" />
            <div className="blob blob-portfolio-5" />
          </div>
        )}
      </div>
    )
  }

  if (variant === "divine") {
    return (
      <div className={cn("fixed inset-0 pointer-events-none -z-10", className)}>
        {/* Grid background - lazy loaded cu blobii */}
        {blobsLoaded && <div className="grid-bg" />}

        {/* Divine Skin blobs - only 2 blobs with Gold & Emerald colors */}
        {blobsLoaded && (
          <div className="blob-stage-divine" aria-hidden="true">
            <div className="blob blob-divine-1" />
            <div className="blob blob-divine-2" />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn("fixed inset-0 pointer-events-none -z-10", className)}>
      {/* Grid background - lazy loaded cu blobii */}
      {blobsLoaded && <div className="grid-bg" />}

      {/* Hero blobs - lazy loaded for better initial performance */}
      {blobsLoaded && (
        <div className="blob-stage" id="blobStage" aria-hidden="true">
          <div className="blob b1" />
          <div className="blob b2" />
          <div className="blob b3" />
          <div className="blob b4" />

          {/* Dotted design elements */}
          <div className="dots dots-tl" aria-hidden="true" />
          <div className="dots dots-br" aria-hidden="true" />
        </div>
      )}
    </div>
  )
}