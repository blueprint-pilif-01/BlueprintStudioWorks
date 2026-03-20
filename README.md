# Blueprint Studio Works

A modern, responsive website built with the latest web technologies, featuring stunning glassmorphism effects and fluid animations.

## 🚀 Tech Stack

- **Vite** - Fast build tool and development server
- **React 18** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and micro-interactions
- **Lucide React** - Modern, beautiful icons
- **React Router** - Client-side routing

## ✨ Features

- 🎨 **Glassmorphism Design** - Beautiful glass-like UI components
- 🌊 **Fluid Animations** - Smooth transitions and micro-interactions
- 📱 **Responsive Design** - Perfect on all devices and screen sizes
- ⚡ **High Performance** - Optimized loading and rendering
- 🎯 **SEO Optimized** - Proper meta tags and structured data
- ♿ **Accessible** - WCAG compliant with proper ARIA labels
- 🛠 **Type Safe** - Full TypeScript coverage
- 🎭 **Motion Reduced** - Respects user accessibility preferences

## 🏗 Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   └── layout/       # Layout components (Header, Footer)
├── pages/            # Page components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
└── assets/           # Static assets
```

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#00d0ff)
- **Secondary**: Purple gradient (#7a5cff) 
- **Accent**: Pink gradient (#ff7ad9)
- **Background**: Light blue (#f4f7fb)
- **Foreground**: Dark blue (#0f1730)

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300, 400, 600, 700, 800

### Components
- **Glass Cards**: Translucent backgrounds with backdrop blur
- **Animated Blobs**: Floating background elements
- **Modern Buttons**: Glass effect with hover animations
- **Responsive Grid**: CSS Grid with Tailwind utilities

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-private-repo-url>
cd BlueprintWorking
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📄 Pages

- **Home** (`/`) - Hero section with animated blobs and highlights
- **Portfolio** (`/portfolio`) - Project showcase with filtering
- **Pricing** (`/pricing`) - Service packages and pricing
- **Contact** (`/contact`) - Contact form with validation
- **Tracker** (`/tracker`) - Project progress tracking

## 🎯 Key Components

### BackgroundEffects
Handles animated blob backgrounds with different variants:
- `hero` - Multiple floating blobs for homepage
- `edge` - Side blobs for content pages  
- `minimal` - Simple grid background

### Glass Components
- `Button` - Glass buttons with hover effects
- `Card` - Glass cards with blur effects
- `Input/Textarea` - Glass form controls
- `Progress` - Animated progress bars

### Layout Components
- `Header` - Responsive navigation with mobile menu
- `Footer` - Site footer with links
- `Layout` - Main layout wrapper with background effects

## 🛠 Development

### Code Style
- ESLint configuration for code quality
- TypeScript strict mode enabled
- Prettier for code formatting

### Performance Optimizations
- Lazy loading for images
- Intersection Observer for animations
- Reduced motion support
- Error boundaries for graceful failures

### Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- Mobile: 0-768px
- Tablet: 768-1024px  
- Desktop: 1024px+

All components adapt seamlessly across devices with mobile-first design principles.

## 🎨 Animations

Powered by Framer Motion with:
- Page transitions
- Scroll-triggered animations
- Hover micro-interactions
- Loading states
- Gesture support

Respects user's `prefers-reduced-motion` setting for accessibility.

## 🔧 Customization

### Colors
Edit the color palette in `tailwind.config.js`:

```js
colors: {
  primary: {
    500: '#00d0ff', // Your primary color
  },
  // ... other colors
}
```

### Fonts
Update font configuration in `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;600;700;800&display=swap');
```

### Components
All components are highly customizable through:
- Tailwind utility classes
- CSS custom properties
- Component props
- Variant configurations

## 📦 Building & Deployment

### Static Deployment
The built files can be deployed to any static hosting service:
- Vercel
- Netlify
- AWS S3
- Cloudflare Pages

### Environment Variables
No environment variables required for basic functionality.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary to Blueprint Studio Works.

## 🆘 Support

For support, email contact@blueprintstudioworks.ro.

---

Made with ❤️ by Blueprint Studio Works