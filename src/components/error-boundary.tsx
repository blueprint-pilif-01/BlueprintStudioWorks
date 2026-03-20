import React from "react"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />
      }

      return <DefaultErrorFallback error={this.state.error} resetError={this.resetError} />
    }

    return this.props.children
  }
}

interface ErrorFallbackProps {
  error?: Error
  resetError: () => void
}

function DefaultErrorFallback({ error, resetError }: ErrorFallbackProps) {
  const { translate } = useLanguage()

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mb-4 overflow-hidden">
            <img
              src="/error.png"
              alt={translate({ ro: "Ilustrație This is fine", en: "\"This is fine\" illustration" })}
              className="w-full h-full object-cover"
            />
          </div>
          <CardTitle className="text-xl">
            {translate({
              ro: "Oops... this is fine! Rezolvăm în curând.",
              en: "Oops... this is fine! We are gonna fix it soon.",
            })}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted">
            {translate({
              ro: "Se pare că a apărut o eroare neașteptată. Te rugăm să încerci din nou.",
              en: "An unexpected error occurred. Please try again.",
            })}
          </p>
          
          {error && process.env.NODE_ENV === "development" && (
            <details className="text-left">
              <summary className="cursor-pointer text-sm font-medium mb-2">
                {translate({ ro: "Detalii despre eroare", en: "Error details" })}
              </summary>
              <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">
                {error.message}
              </pre>
            </details>
          )}
          
          <Button onClick={resetError} variant="glass" className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            {translate({ ro: "Încearcă din nou", en: "Try again" })}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}










