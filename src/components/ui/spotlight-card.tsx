import React from "react"
import { cn } from "@/lib/utils"

type SpotlightCardProps = React.HTMLAttributes<HTMLDivElement> & {
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`
}

/**
 * Glass card with a cursor-following light. The spotlight position is
 * written straight to CSS variables (no React re-renders), and the
 * effect only activates on hover-capable devices.
 */
export const SpotlightCard = React.forwardRef<HTMLDivElement, SpotlightCardProps>(
  ({ children, className = "", spotlightColor = "rgba(120, 90, 255, 0.45)", ...props }, forwardedRef) => {
    const divRef = React.useRef<HTMLDivElement>(null)

    React.useImperativeHandle(forwardedRef, () => divRef.current as HTMLDivElement)

    const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
      const el = divRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`)
      el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`)
    }

    return (
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        className={cn(
          "spotlight-card group/spot relative overflow-hidden rounded-[32px] text-slate-900",
          "transition-[box-shadow,border-color] duration-500 ease-out",
          className
        )}
        {...props}
      >
        <div
          aria-hidden="true"
          className="spotlight-layer pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 ease-out group-hover/spot:opacity-100 max-md:hidden"
          style={{
            background: `radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${spotlightColor}, transparent 65%)`,
          }}
        />
        {children}
      </div>
    )
  }
)
SpotlightCard.displayName = "SpotlightCard"

export default SpotlightCard
