import React from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { cn } from 'ui'

interface BioBaseLogoProps {
  className?: string
  type?: 'icon' | 'wordmark' | 'full'
  size?: 'sm' | 'md' | 'lg'
}

export const BioBaseLogo: React.FC<BioBaseLogoProps> = ({ 
  className,
  type = 'full',
  size = 'md'
}) => {
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === 'dark'
  
  // Size mappings for the icon
  const sizeMap = {
    sm: { icon: 24, text: 20 },
    md: { icon: 32, text: 24 },
    lg: { icon: 40, text: 30 }
  }
  
  // For full logo, we need both icon and text
  if (type === 'full') {
    return (
      <div className={cn('flex items-center', className)}>
        {/* Icon part */}
        <Image 
          src="/images/biobase-logo-icon.svg"
          alt="BioBase Logo"
          width={sizeMap[size].icon}
          height={sizeMap[size].icon}
        />
        
        {/* Text part */}
        <div className={cn('ml-2 font-medium text-foreground', `text-${sizeMap[size].text}px`)}>
          <span className="text-brand-default">Bio</span>
          <span>Base</span>
        </div>
      </div>
    )
  }
  
  // Just the icon
  if (type === 'icon') {
    return (
      <Image 
        src="/images/biobase-logo-icon.svg"
        alt="BioBase Logo"
        width={sizeMap[size].icon}
        height={sizeMap[size].icon}
        className={className}
      />
    )
  }
  
  // Just the wordmark
  return (
    <div className={cn('font-medium text-foreground', `text-${sizeMap[size].text}px`, className)}>
      <span className="text-brand-default">Bio</span>
      <span>Base</span>
    </div>
  )
}

export default BioBaseLogo 