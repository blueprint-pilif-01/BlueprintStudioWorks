import type { MouseEvent } from "react"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

function siteHostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

type ProjectLiveSiteLinkProps = {
  url: string
  variant?: "hero" | "card"
  className?: string
  buttonClassName?: string
  onClick?: (event: MouseEvent) => void
}

export function ProjectLiveSiteLink({
  url,
  variant = "hero",
  className,
  buttonClassName,
  onClick,
}: ProjectLiveSiteLinkProps) {
  const { translate } = useLanguage()
  const host = siteHostname(url)
  const label = translate({ ro: `Vizită ${host}`, en: `Visit ${host}` })

  if (variant === "card") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline mb-2",
          className
        )}
        onClick={onClick}
      >
        <ExternalLink className="h-3 w-3 shrink-0" />
        {host}
      </a>
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("inline-flex", className)}
      onClick={onClick}
    >
      <Button size="lg" className={cn("gap-2 px-8 py-6 text-lg", buttonClassName)}>
        <ExternalLink className="h-5 w-5" />
        {label}
      </Button>
    </a>
  )
}
