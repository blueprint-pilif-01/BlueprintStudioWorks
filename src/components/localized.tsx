import { type ReactNode } from "react"
import { useLanguage } from "@/contexts/language-context"

type LocalizedProps = {
  ro: ReactNode
  en: ReactNode
}

export function Localized({ ro, en }: LocalizedProps) {
  const { language } = useLanguage()
  return <>{language === "ro" ? ro : en}</>
}
