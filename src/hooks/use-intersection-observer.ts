import { useState, useEffect, useRef } from "react"

interface UseIntersectionObserverProps {
  threshold?: number
  root?: Element | null
  rootMargin?: string
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = "0%",
  freezeOnceVisible = false,
}: UseIntersectionObserverProps = {}): [React.RefObject<Element>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<Element>(null)

  useEffect(() => {
    const element = elementRef.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const { isIntersecting } = entry
        setIsIntersecting(isIntersecting)

        if (isIntersecting) {
          setIsVisible(true)
          if (freezeOnceVisible) {
            observer.unobserve(element)
          }
        } else if (!freezeOnceVisible) {
          setIsVisible(false)
        }
      },
      { threshold, root, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, root, rootMargin, freezeOnceVisible])

  return [elementRef as React.RefObject<Element>, freezeOnceVisible ? isVisible : isIntersecting]
}
