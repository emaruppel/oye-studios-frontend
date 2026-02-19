import React from 'react'
import clsx from 'clsx'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Loader({ size = 'md', className }: LoaderProps) {
  return (
    <div
      className={clsx(
        'animate-spin rounded-full border-4 border-gray-200 border-t-primary-600',
        {
          'w-6 h-6': size === 'sm',
          'w-10 h-10': size === 'md',
          'w-16 h-16': size === 'lg',
        },
        className
      )}
    />
  )
}
