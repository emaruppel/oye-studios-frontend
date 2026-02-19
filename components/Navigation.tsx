'use client'

import React from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Music, User, LogOut, Menu, X } from 'lucide-react'
import Button from './Button'

export default function Navigation() {
  const { isAuthenticated, user, logout, isArtist } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-primary-600 font-bold text-xl">
            <Music className="w-8 h-8" />
            <span>Oye Studios</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-primary-600 transition">
                  Dashboard
                </Link>
                {isArtist && (
                  <Link href="/artist" className="text-gray-700 hover:text-primary-600 transition">
                    Panel Artista
                  </Link>
                )}
                <div className="flex items-center gap-2 pl-4 border-l">
                  <span className="text-gray-700">{user?.name}</span>
                  <Button variant="outline" size="sm" onClick={logout}>
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm">Iniciar Sesión</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Registrarse</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {isAuthenticated ? (
              <div className="flex flex-col gap-3">
                <Link 
                  href="/dashboard" 
                  className="block py-2 text-gray-700 hover:text-primary-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                {isArtist && (
                  <Link 
                    href="/artist" 
                    className="block py-2 text-gray-700 hover:text-primary-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Panel Artista
                  </Link>
                )}
                <div className="pt-3 border-t">
                  <p className="text-sm text-gray-600 mb-2">{user?.name}</p>
                  <Button variant="outline" size="sm" onClick={logout} fullWidth>
                    Cerrar Sesión
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" fullWidth>Iniciar Sesión</Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" fullWidth>Registrarse</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
