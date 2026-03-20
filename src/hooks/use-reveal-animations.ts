import { useEffect, useRef } from 'react'
import { applyStagger } from '@/lib/mpa-transitions'

interface UseRevealAnimationsOptions {
  selector?: string
  baseDelay?: number
  threshold?: number
  rootMargin?: string
}

export function useRevealAnimations({
  selector = '.reveal',
  baseDelay = 80,
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px'
}: UseRevealAnimationsOptions = {}) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Skip if animations are disabled
    if (document.documentElement.classList.contains('reduce-motion')) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold,
        rootMargin
      }
    )

    // Observe all reveal elements
    const revealElements = container.querySelectorAll(selector)
    revealElements.forEach((element) => {
      observer.observe(element)
    })

    // Apply stagger delays
    applyStagger(container, selector, baseDelay)

    return () => {
      observer.disconnect()
    }
  }, [selector, baseDelay, threshold, rootMargin])

  return containerRef
}

// Page-specific reveal animations
export function useServiceCardReveal() {
  return useRevealAnimations({
    selector: '.service-card',
    baseDelay: 60,
    threshold: 0.1
  })
}

export function useWorkCardReveal() {
  return useRevealAnimations({
    selector: '.work-card',
    baseDelay: 40,
    threshold: 0.1
  })
}

export function useTimelineReveal() {
  return useRevealAnimations({
    selector: '.timeline-item',
    baseDelay: 80,
    threshold: 0.1
  })
}
