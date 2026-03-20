import * as React from "react"
import { cn } from "@/lib/utils"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  label?: string
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, label, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    
    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {label && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-foreground">{label}</span>
            <span className="text-sm text-muted">{percentage.toFixed(0)}%</span>
          </div>
        )}
        <div className="relative h-4 w-full rounded-full overflow-hidden bg-white/65 border border-white/55 shadow-inner">
          {/* Grid background pattern */}
          <div 
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(90deg, rgba(15,23,48,.06) 0 24px, rgba(15,23,48,0) 24px 48px)',
              mixBlendMode: 'multiply'
            }}
          />
          
          {/* Progress fill */}
          <div
            className="relative h-full rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${percentage}%`,
              background: `linear-gradient(180deg, 
                color-mix(in oklab, rgb(0 208 255) 92%, white) 0%,
                color-mix(in oklab, rgb(0 208 255) 78%, black) 100%)`,
              boxShadow: 'inset 0 0 14px rgba(255,255,255,.4)'
            }}
          >
            {/* Flowing bubbles animation */}
            <div 
              className="absolute inset-0 w-[200%] opacity-65"
              style={{
                background: `
                  radial-gradient(12px 12px at 10% 60%, rgba(255,255,255,.45), transparent 60%),
                  radial-gradient(8px 8px at 25% 40%, rgba(255,255,255,.35), transparent 60%),
                  radial-gradient(10px 10px at 40% 70%, rgba(255,255,255,.32), transparent 60%),
                  radial-gradient(6px 6px at 55% 35%, rgba(255,255,255,.38), transparent 60%),
                  radial-gradient(12px 12px at 70% 65%, rgba(255,255,255,.32), transparent 60%),
                  radial-gradient(8px 8px at 85% 45%, rgba(255,255,255,.35), transparent 60%)
                `,
                filter: 'blur(1px)',
                animation: 'bubbles 6s linear infinite'
              }}
            />
            
            {/* Glowing cap at the end */}
            {percentage > 0 && (
              <div 
                className="absolute right-[-10px] top-1/2 w-6 h-6 rounded-full transform -translate-y-1/2"
                style={{
                  background: `radial-gradient(circle at 30% 30%, #fff, rgba(255,255,255,.45) 35%,
                    color-mix(in oklab, rgb(0 208 255) 85%, transparent) 36%, transparent 70%)`,
                  boxShadow: `
                    0 0 24px color-mix(in oklab, rgb(0 208 255) 60%, transparent),
                    0 0 48px color-mix(in oklab, rgb(0 208 255) 35%, transparent)
                  `,
                  animation: 'pulse 1.8s ease-in-out infinite'
                }}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
)

Progress.displayName = "Progress"

export { Progress }

