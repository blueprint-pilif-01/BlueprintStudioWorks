// MPA-Safe Transition System
// Intercepts internal links, runs wipe diagonal transition, then navigates

interface TransitionState {
  isTransitioning: boolean
  direction: 'leave' | 'enter'
  targetUrl: string | null
}

class MPATransitionManager {
  private state: TransitionState = {
    isTransitioning: false,
    direction: 'leave',
    targetUrl: null
  }
  
  private overlay: HTMLElement | null = null
  private callbacks: {
    onTransitionStart?: () => void
    onTransitionEnd?: () => void
  } = {}

  constructor() {
    console.log('🚀 MPATransitionManager constructor called')
    this.init()
  }

  private init() {
    console.log('🔧 MPATransitionManager init called')
    // Check if animations are disabled
    this.checkAnimationPreference()
    
    // Create overlay
    this.createOverlay()
    
    // Bind events
    this.bindEvents()
    
    // Run enter animation on page load
    this.runEnterAnimation()
  }

  private checkAnimationPreference() {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isDisabled = localStorage.getItem('bsw.animations') === 'off'
    
    if (isReducedMotion || isDisabled) {
      document.documentElement.classList.add('reduce-motion')
    }
  }

  private createOverlay() {
    console.log('🎨 Creating transition overlay')
    this.overlay = document.createElement('div')
    this.overlay.className = 'transition-overlay'
    this.overlay.setAttribute('aria-hidden', 'true')
    this.overlay.innerHTML = `
      <div class="transition-overlay__blob transition-overlay__blob--top-left"></div>
      <div class="transition-overlay__blob transition-overlay__blob--top-right"></div>
      <div class="transition-overlay__blob transition-overlay__blob--bottom-left"></div>
      <div class="transition-overlay__blob transition-overlay__blob--bottom-right"></div>
      <div class="transition-overlay__gradient"></div>
    `
    document.body.appendChild(this.overlay)
    console.log('✅ Transition overlay created and added to DOM')
  }

  private bindEvents() {
    // Intercept link clicks
    document.addEventListener('click', this.handleLinkClick.bind(this))
    
    // Handle back/forward navigation
    window.addEventListener('pageshow', this.handlePageShow.bind(this))
    
    // Handle page load
    document.addEventListener('DOMContentLoaded', this.runEnterAnimation.bind(this))
  }

  private handleLinkClick(event: MouseEvent) {
    const target = event.target as HTMLElement
    const link = target.closest('a[href]') as HTMLAnchorElement
    
    if (!link) return
    
    // Skip if animations are disabled
    if (document.documentElement.classList.contains('reduce-motion')) {
      return
    }
    
    // Skip excluded links
    if (this.shouldSkipLink(link)) {
      return
    }
    
    // Check if it's an internal link
    const href = link.getAttribute('href')
    if (!href || this.isExternalLink(href)) {
      return
    }
    
    event.preventDefault()
    this.runLeaveTransition(href)
  }

  private shouldSkipLink(link: HTMLAnchorElement): boolean {
    const href = link.getAttribute('href')
    return !!(
      (link.hasAttribute('target') && link.getAttribute('target') === '_blank') ||
      link.hasAttribute('download') ||
      link.hasAttribute('data-no-transition') ||
      href?.startsWith('#') ||
      href?.startsWith('mailto:') ||
      href?.startsWith('tel:')
    )
  }

  private isExternalLink(href: string): boolean {
    try {
      const url = new URL(href, window.location.origin)
      return url.origin !== window.location.origin
    } catch {
      return false
    }
  }

  private runLeaveTransition(targetUrl: string) {
    if (this.state.isTransitioning) return
    
    this.state = {
      isTransitioning: true,
      direction: 'leave',
      targetUrl
    }
    
    this.updateOverlay()
    this.callbacks.onTransitionStart?.()
    
    // Navigate after transition
    setTimeout(() => {
      window.location.href = targetUrl
    }, 700)
  }

  private runEnterAnimation() {
    if (this.state.isTransitioning) return
    
    this.state = {
      isTransitioning: true,
      direction: 'enter',
      targetUrl: null
    }
    
    this.updateOverlay()
    
    // Hide overlay after animation
    setTimeout(() => {
      this.state.isTransitioning = false
      this.updateOverlay()
      this.callbacks.onTransitionEnd?.()
    }, 700)
  }

  private handlePageShow(event: PageTransitionEvent) {
    if (event.persisted) {
      // Page was restored from BFCache
      this.runEnterAnimation()
    }
  }

  private updateOverlay() {
    if (!this.overlay) return
    
    if (this.state.isTransitioning) {
      this.overlay.classList.add(`is-${this.state.direction}`)
    } else {
      this.overlay.classList.remove('is-leaving', 'is-entering')
    }
  }

  // Public API
  public setCallbacks(callbacks: typeof this.callbacks) {
    this.callbacks = { ...this.callbacks, ...callbacks }
  }

  public toggleAnimations() {
    const isDisabled = localStorage.getItem('bsw.animations') === 'off'
    const newState = isDisabled ? 'on' : 'off'
    
    localStorage.setItem('bsw.animations', newState)
    
    if (newState === 'off') {
      document.documentElement.classList.add('reduce-motion')
    } else {
      document.documentElement.classList.remove('reduce-motion')
    }
  }

  public isAnimationsEnabled(): boolean {
    return !document.documentElement.classList.contains('reduce-motion')
  }
}

// Export singleton instance
export const mpaTransitions = new MPATransitionManager()

// Export utilities
export function applyStagger(container: HTMLElement, selector: string, baseDelay = 80) {
  const elements = container.querySelectorAll(selector)
  
  elements.forEach((element, index) => {
    const delay = index * baseDelay
    ;(element as HTMLElement).style.setProperty('--stagger-delay', `${delay}ms`)
  })
}

// Initialize immediately
if (typeof window !== 'undefined') {
  console.log('🌍 Window object available, initializing MPA transitions')
  // Initialize immediately
  mpaTransitions
}
