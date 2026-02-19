import React from 'react'
import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'bg-primary-600 text-white hover:bg-primary-700': variant === 'primary',
          'bg-gray-600 text-white hover:bg-gray-700': variant === 'secondary',
          'border-2 border-primary-600 text-primary-600 hover:bg-primary-50': variant === 'outline',
          'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
          'w-full': fullWidth,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
