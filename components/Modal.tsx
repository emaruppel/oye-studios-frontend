'use client'

import React from 'react'
import { X } from 'lucide-react'
import clsx from 'clsx'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div
        className={clsx(
          'relative bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto',
          {
            'max-w-sm': size === 'sm',
            'max-w-md': size === 'md',
            'max-w-2xl': size === 'lg',
            'max-w-4xl': size === 'xl',
          }
        )}
      >
        {title && (
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-xl font-semibold">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
