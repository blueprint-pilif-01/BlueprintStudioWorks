import { useNavigate, To, LinkProps as RouterLinkProps } from "react-router-dom"
import { usePageTransition } from "./use-page-transitions"
import { AnchorHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface LinkProps extends Omit<RouterLinkProps, 'to'> {
  to: To
  className?: string
  children: React.ReactNode
}

export const TransitionLink = forwardRef<HTMLAnchorElement, LinkProps>(({ to, className, children, ...props }, ref) => {
  const { startTransition } = usePageTransition()
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    startTransition(() => {
      navigate(to)
    })
  }

  return (
    <a href={typeof to === 'string' ? to : to.pathname} onClick={handleClick} className={className} ref={ref} {...props}>
      {children}
    </a>
  )
})
TransitionLink.displayName = 'TransitionLink'

export const useTransitionNavigate = () => {
  const { startTransition } = usePageTransition()
  const navigate = useNavigate()

  return (to: To) => {
    startTransition(() => {
      navigate(to)
    })
  }
}




