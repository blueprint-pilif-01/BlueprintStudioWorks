import { motion } from "framer-motion"
import { useMemo } from "react"

// Helper function to convert hex to rgba (memoized)
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

interface LogoBackgroundProps {
  color1: string
  color2?: string
  height?: string
  width?: string
  logoText?: string
  logoSubtext?: string
  logoImage?: string
  logoImageAlt?: string
  logoImageClassName?: string
  fontFamily?: string
  letterSpacing?: string
  fontWeight?: number
  className?: string
  bgMode?: 'dark' | 'light'
  customText?: { text: string; parts: Array<{ text: string; color: string }> }
  customBgColor?: string
}

export function LogoBackground({ 
  color1, 
  color2, 
  height = '300px',
  width = '100%',
  logoText = 'LOGO',
  logoSubtext = 'Logo aici',
  logoImage,
  logoImageAlt = 'Logo',
  logoImageClassName,
  fontFamily = 'inherit',
  letterSpacing = 'normal',
  fontWeight = 700,
  className = '',
  bgMode = 'dark',
  customText,
  customBgColor
}: LogoBackgroundProps) {
  const secondColor = color2 || color1
  
  // Memoize color calculations for performance
  const colors = useMemo(() => {
    const bgColor = customBgColor || (bgMode === 'light' ? '#ffffff' : '#0a0a0a')
    const blobOpacity1 = bgMode === 'light' ? 0.5 : 0.5
    const blobOpacity2 = bgMode === 'light' ? 0.45 : 0.4
    const blobOpacity3 = bgMode === 'light' ? 0.3 : 0.3
    
    return {
      bgColor,
      blob1: hexToRgba(color1, blobOpacity1),
      blob2: hexToRgba(secondColor, blobOpacity2),
      blob3: hexToRgba(color1, blobOpacity3)
    }
  }, [color1, secondColor, bgMode, customBgColor])
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ 
        height,
        width,
        background: colors.bgColor,
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center z-10">
              {logoImage ? (
                <motion.img
                  src={logoImage}
                  alt={logoImageAlt}
                  loading="lazy"
                  className={logoImageClassName || "max-w-[80%] max-h-[80%] object-contain"}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                />
        ) : customText ? (
          <div className="text-center">
            <motion.div 
              className="text-6xl font-bold mb-2 flex items-center justify-center" 
              style={{ 
                fontFamily,
                letterSpacing,
                fontWeight
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {customText.parts.map((part, idx) => (
                <span key={idx} style={{ color: part.color }}>{part.text}</span>
              ))}
            </motion.div>
            <p className="text-sm" style={{ color: bgMode === 'light' ? '#666666' : '#b7b7b7', fontFamily }}>{logoSubtext}</p>
          </div>
        ) : (
          <div className="text-center">
            <motion.div 
              className="text-6xl font-bold mb-2" 
              style={{ 
                color: color1, 
                textShadow: `0 0 40px ${color1}80`,
                fontFamily,
                letterSpacing,
                fontWeight
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {logoText}
            </motion.div>
            <p className="text-sm" style={{ color: bgMode === 'light' ? '#666666' : '#b7b7b7', fontFamily }}>{logoSubtext}</p>
          </div>
        )}
      </div>
      
      {/* Animated color blobs */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '65%',
          height: '65%',
          background: `radial-gradient(circle, ${colors.blob1} 0%, transparent 70%)`,
          filter: 'blur(40px)',
          top: '-15%',
          left: '-10%',
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
        animate={{
          x: [0, 12, 0],
          y: [0, 8, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '60%',
          height: '60%',
          background: `radial-gradient(circle, ${colors.blob2} 0%, transparent 70%)`,
          filter: 'blur(40px)',
          bottom: '-15%',
          right: '-10%',
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
        animate={{
          x: [0, -10, 0],
          y: [0, -12, 0],
          scale: [1, 1.08, 1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '50%',
          height: '50%',
          background: `radial-gradient(circle, ${colors.blob3} 0%, transparent 70%)`,
          filter: 'blur(35px)',
          top: '25%',
          left: '25%',
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}

