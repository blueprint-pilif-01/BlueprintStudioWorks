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
          "bg-white/16 backdrop-blur-md border border-white/55 text-foreground hover:bg-white/24 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl",
        primary: 
          "bg-primary-500 text-white hover:bg-primary-600 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl",
        secondary: 
          "bg-secondary-500 text-white hover:bg-secondary-600 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl",
        outline: 
          "border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white hover:scale-105 hover:-translate-y-1",
        ghost: 
          "text-foreground hover:bg-white/10 hover:text-foreground",
        link: 
          "text-primary-500 underline-offset-4 hover:underline",
        glass:
          "bg-white/70 backdrop-blur-xl border border-white/55 text-foreground hover:bg-white/80 hover:scale-105 hover:-translate-y-1 shadow-2xl hover:shadow-3xl",
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

