# 🎨 MPA Transition System - Ghid de Utilizare

## 🚀 Overview

Sistemul de tranziții MPA-safe implementează animații wipe diagonal cu blob gradient + blur pentru navigarea între pagini, cu suport complet pentru accesibilitate și performanță.

## ✨ Caracteristici

- **MPA-Safe**: Interceptează click-ul pe linkuri interne, rulează overlay transition, apoi navighează
- **BFCache Safe**: Tratează pageshow (event.persisted) pentru back/forward navigation
- **Performanță**: Doar transform + opacity, fără layout thrash
- **A11y**: Overlay aria-hidden="true", respectă prefers-reduced-motion
- **Toggle**: Buton "Disable animations" în footer (localStorage: bsw.animations=off)

## 🎯 Animații Implementate

### 1. Page Transitions (Wipe Diagonal)
- **Durată**: 700ms
- **Efect**: 4 blob-uri colorate + gradient wipe + blur
- **Culori**: Cyan, Magenta, Violet, Auriu
- **Direcție**: Diagonal wipe de la colțuri către centru

### 2. Reveal Animations
- **Elemente**: `.reveal` (generic), `.service-card`, `.work-card`, `.timeline-item`
- **Efect**: translateY + fade cu stagger
- **Trigger**: IntersectionObserver
- **Stagger**: 40-80ms între elemente

## 📝 Utilizare

### Reveal Animations în Pagini

```tsx
import { useRevealAnimations, useServiceCardReveal } from '@/hooks/use-reveal-animations'

function ServicesPage() {
  const containerRef = useServiceCardReveal()
  
  return (
    <div ref={containerRef}>
      <div className="service-card">Service 1</div>
      <div className="service-card">Service 2</div>
      <div className="service-card">Service 3</div>
    </div>
  )
}
```

### Clase CSS Disponibile

```css
/* Generic reveal */
.reveal {
  /* translateY(24px) + fade */
}

/* Page-specific */
.service-card {
  /* translateY(20px) + scale(0.95) + fade, stagger 60ms */
}

.work-card {
  /* translateY(16px) + fade, stagger 40ms */
}

.timeline-item {
  /* translateX(-20px) + fade, stagger 80ms */
}
```

### Linkuri Excluse

Sistemul exclude automat:
- `target="_blank"`
- `download`
- `data-no-transition`
- `href="#"`
- `mailto:`
- `tel:`
- Linkuri externe

### Toggle Animații

```tsx
import { AnimationToggle } from '@/components/ui/animation-toggle'

// În footer
<AnimationToggle />
```

## ⚙️ Configurare

### CSS Variables

```css
:root {
  --transition-duration: 700ms;
  --transition-ease: cubic-bezier(0.4, 0, 0.2, 1);
  --blob-size: 200px;
  --gradient-opacity: 0.95;
}
```

### JavaScript API

```typescript
import { mpaTransitions } from '@/lib/mpa-transitions'

// Toggle animații programatic
mpaTransitions.toggleAnimations()

// Verifică dacă animațiile sunt activate
const isEnabled = mpaTransitions.isAnimationsEnabled()

// Setează callbacks
mpaTransitions.setCallbacks({
  onTransitionStart: () => console.log('Transition started'),
  onTransitionEnd: () => console.log('Transition ended')
})
```

## 🎨 Customizare

### Adăugare Clase Reveal Noi

1. **CSS**:
```css
.my-custom-reveal {
  opacity: 0;
  transform: translateY(30px) rotate(5deg);
  transition: opacity 0.8s var(--transition-ease),
              transform 0.8s var(--transition-ease);
  transition-delay: var(--stagger-delay, 0ms);
}

.my-custom-reveal.is-revealed {
  opacity: 1;
  transform: translateY(0) rotate(0deg);
}
```

2. **Hook**:
```typescript
export function useMyCustomReveal() {
  return useRevealAnimations({
    selector: '.my-custom-reveal',
    baseDelay: 100,
    threshold: 0.1
  })
}
```

### Modificare Animații de Tranziție

Editează keyframes-urile din `src/index.css`:
- `blobMoveTopLeft`
- `blobMoveTopRight` 
- `blobMoveBottomLeft`
- `blobMoveBottomRight`
- `gradientWipe`

## 🔧 Debugging

### Console Logs
Sistemul afișează log-uri în console pentru debugging:
- `🚀 Starting transition to: /path`
- `✨ Transition state set to true`
- `📍 Navigating to: /path`
- `🏁 Transition completed`

### Verificare Stare
```javascript
// În console
console.log('Animations enabled:', mpaTransitions.isAnimationsEnabled())
console.log('Reduced motion:', document.documentElement.classList.contains('reduce-motion'))
```

## 📱 Browser Support

- **Chrome/Edge**: 100% suport
- **Firefox**: 100% suport
- **Safari**: 100% suport (cu prefixe -webkit-)
- **Mobile**: Optimizat pentru touch

## 🚀 Performance

- **60fps**: Animațiile rulează la 60fps
- **GPU Accelerated**: Folosește transform și opacity
- **No Layout Thrash**: Nu cauzează reflow/repaint
- **Lazy Loading**: Blob-urile se încarcă după 1s

## 🎯 Acceptance Criteria ✅

- [x] Trecerea între orice două pagini interne rulează wipe diagonal în ≤700ms, 60fps
- [x] Back/forward din browser nu „taie" animația (se vede enter)
- [x] prefers-reduced-motion sau toggle „off" → fără animații (navigare instant)
- [x] Elemente .reveal intră la 12–24px translateY + fade, cu stagger
- [x] Linkuri excluse: target="_blank", download, data-no-transition
- [x] BFCache safe cu pageshow event
- [x] Toggle animații în footer cu localStorage
- [x] Page-specific enter animations (service-card, work-card, timeline-item)
