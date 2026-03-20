import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export function usePageTransitions() {
  const location = useLocation()
  const navigate = useNavigate()
  const isNavigating = useRef(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    // Creează overlay-ul dacă nu există
    let fx = document.querySelector('.page-xfade') as HTMLElement
    if (!fx) {
      fx = document.createElement('div')
      fx.className = 'page-xfade hide'
      fx.setAttribute('aria-hidden', 'true')
      document.body.appendChild(fx)
    }

    // ENTRANCE: după navigare, ascunde overlay-ul
    if (isNavigating.current) {
      fx.classList.remove('hide')
      // Forțăm un reflow pentru a asigura că tranziția pornește
      void fx.offsetHeight
      requestAnimationFrame(() => {
        fx.classList.add('hide')
        isNavigating.current = false
      })
    } else {
      // Prima încărcare
      requestAnimationFrame(() => fx.classList.add('hide'))
    }

    const DURATION = 600 // sync cu --xfade-dur (600ms)

    // Helper: e link intern?
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

    // Rulează OUTRO și apoi navighează cu React Router
    const go = (href: string) => {
      if (isNavigating.current) return
      isNavigating.current = true
      
      fx.classList.remove('hide') // arată overlay-ul (fade-out pagina)
      
      setTimeout(() => {
        const url = new URL(href)
        navigate(url.pathname + url.search + url.hash)
      }, DURATION - 100)
    }

    // Interceptăm clickurile pe linkuri
    const handleClick = (e: Event) => {
      const a = (e.target as Element).closest('a[href]') as HTMLAnchorElement
      if (!a) return
      // lasă Ctrl/Meta pentru "deschide în tab nou"
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










