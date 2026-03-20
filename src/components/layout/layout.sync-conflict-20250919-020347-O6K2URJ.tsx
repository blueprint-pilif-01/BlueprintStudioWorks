import { Outlet } from "react-router-dom"
import { Header } from "./header"
import { Footer } from "./footer"
import { BackgroundEffects } from "@/components/ui/background-effects"

interface LayoutProps {
  backgroundVariant?: "hero" | "edge" | "minimal"
}

export function Layout({ backgroundVariant = "minimal" }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundEffects variant={backgroundVariant} />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}


