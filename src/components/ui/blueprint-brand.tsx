import { cn } from "@/lib/utils"

type BlueprintBrandProps = {
  className?: string
  textClassName?: string
  logoClassName?: string
  as?: "span" | "div" | "h1" | "h2"
}

export function BlueprintBrand({
  className,
  textClassName,
  logoClassName,
  as: Tag = "span",
}: BlueprintBrandProps) {
  return (
    <Tag className={cn("inline-flex items-center gap-1.5 sm:gap-2", className)}>
      <span className={cn("font-bold leading-none", textClassName)}>The</span>
      <img
        src="/logoblueprint.png"
        alt="Blueprint"
        className={cn("h-6 w-auto object-contain", logoClassName)}
        loading="lazy"
        decoding="async"
      />
    </Tag>
  )
}
