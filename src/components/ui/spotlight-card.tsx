import React from "react"
import { cn } from "@/lib/utils"

type SpotlightCardProps = React.HTMLAttributes<HTMLDivElement> & {
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`
}

type Position = {
  x: number
  y: number
}

export const SpotlightCard = React.forwardRef<HTMLDivElement, SpotlightCardProps>(
  ({ children, className = "", spotlightColor = "rgba(120, 90, 255, 0.65)", ...props }, forwardedRef) => {
    const divRef = React.useRef<HTMLDivElement>(null)
    const [isFocused, setIsFocused] = React.useState(false)
    const [position, setPosition] = React.useState<Position>({ x: 0, y: 0 })
    const [opacity, setOpacity] = React.useState(0.25)

    React.useImperativeHandle(forwardedRef, () => divRef.current as HTMLDivElement)

    const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
      if (!divRef.current || isFocused) return
      const rect = divRef.current.getBoundingClientRect()
      setPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top })
    }

    const handleFocus = () => {
      setIsFocused(true)
      setOpacity(0.95)
    }

    const handleBlur = () => {
      setIsFocused(false)
      setOpacity(0)
    }

    const handleMouseEnter = () => setOpacity(1)
    const handleMouseLeave = () => !isFocused && setOpacity(0.2)

    return (
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "spotlight-card relative overflow-hidden rounded-[32px] border border-white/30 bg-white/20 text-slate-900",
          "backdrop-blur-[26px] shadow-[0_12px_30px_rgba(15,23,42,0.08)]",
          "transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.05]",
          "hover:shadow-[0_50px_120px_rgba(79,70,229,0.4)] hover:border-white/70 hover:bg-white/35",
          className
        )}
        {...props}
      >
        <div
          aria-hidden="true"
          className="spotlight-layer pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-400 ease-out"
          style={{
            opacity,
            background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 60%)`
          }}
        />
        {children}
      </div>
    )
  }
)
SpotlightCard.displayName = "SpotlightCard"

export default SpotlightCard
