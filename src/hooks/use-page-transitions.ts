import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const OUT_MS = 160 // how long we show the veil before navigating

export function usePageTransitions() {
  const location = useLocation()
  const navigate = useNavigate()
  const isNavigating = useRef(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // On touch devices we navigate instantly — perceived speed beats ceremony.
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches
    if (prefersReduced || isTouch) return

    let fx = document.querySelector('.page-xfade') as HTMLElement
    if (!fx) {
      fx = document.createElement('div')
      fx.className = 'page-xfade hide'
      fx.setAttribute('aria-hidden', 'true')
      document.body.appendChild(fx)
    }

    // ENTRANCE: after navigation, fade the veil out
    if (isNavigating.current) {
      fx.classList.remove('hide')
      void fx.offsetHeight
      requestAnimationFrame(() => {
        fx.classList.add('hide')
        isNavigating.current = false
      })
    } else {
      requestAnimationFrame(() => fx.classList.add('hide'))
    }

    const isInternal = (a: HTMLAnchorElement) => {
      try {
        const url = new URL(a.href)
        const sameOrigin = url.origin === window.location.origin
        const hashOnly = url.pathname === location.pathname && url.hash && !url.search
        const newTab = a.target === '_blank' || a.hasAttribute('download')
        return sameOrigin && !hashOnly && !newTab
      } catch {
        return false
      }
    }

    const go = (href: string) => {
      if (isNavigating.current) return
      isNavigating.current = true

      fx.classList.remove('hide')

      setTimeout(() => {
        const url = new URL(href)
        navigate(url.pathname + url.search + url.hash)
      }, OUT_MS)
    }

    const handleClick = (e: Event) => {
      const a = (e.target as Element).closest('a[href]') as HTMLAnchorElement
      if (!a) return
      if ((e as MouseEvent).metaKey || (e as MouseEvent).ctrlKey || (e as MouseEvent).shiftKey || (e as MouseEvent).altKey) return
      if (!isInternal(a)) return

      e.preventDefault()
      e.stopPropagation()
      go(a.href)
    }

    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [location, navigate])
}
