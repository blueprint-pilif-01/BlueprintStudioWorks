import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-white/40 border border-white/60 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_14px_-4px_rgba(15,23,48,0.18)] hover:bg-white/60 md:hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),0_8px_22px_-6px_rgba(15,23,48,0.24)]",
        primary:
          "bg-primary-500 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_18px_-6px_rgba(0,160,210,0.6)] hover:bg-primary-600 md:hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_26px_-8px_rgba(0,160,210,0.7)]",
        secondary:
          "bg-secondary-500 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_18px_-6px_rgba(100,70,230,0.6)] hover:bg-secondary-600 md:hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_26px_-8px_rgba(100,70,230,0.7)]",
        outline:
          "border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white md:hover:-translate-y-0.5",
        ghost:
          "text-foreground hover:bg-white/10 hover:text-foreground",
        link:
          "text-primary-500 underline-offset-4 hover:underline",
        glass:
          "bg-gradient-to-b from-white/80 to-white/55 border border-white/70 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(15,23,48,0.05),0_6px_18px_-6px_rgba(15,23,48,0.22)] hover:from-white/90 hover:to-white/70 md:hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(15,23,48,0.05),0_12px_28px_-8px_rgba(15,23,48,0.28)]",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2",
        lg: "h-14 px-8 py-4 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

