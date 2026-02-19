'use client'

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Card from '@/components/Card'
import { Music, Play, Heart, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">¡Hola, {user?.name}!</h1>
        <p className="text-gray-600">Bienvenido a tu dashboard de Oye Studios</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-100 rounded-lg">
              <Play className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Videos Vistos</p>
              <p className="text-2xl font-bold">42</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <Heart className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Favoritos</p>
              <p className="text-2xl font-bold">18</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Music className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Artistas Seguidos</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recommended Content */}
      <Card className="mb-8">
        <h2 className="text-xl font-bold mb-4">Recomendado para ti</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <Play className="w-16 h-16 text-white opacity-75" />
              </div>
              <div className="p-3">
                <h3 className="font-semibold mb-1">Video de Ejemplo {item}</h3>
                <p className="text-sm text-gray-600">Artista Demo</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* CTA for Artists */}
      {!user?.isArtist && (
        <Card className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">¿Eres artista?</h2>
              <p className="opacity-90">Empieza a subir tu contenido y monetiza tu talento</p>
            </div>
            <Link 
              href="/register?type=artist"
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition whitespace-nowrap"
            >
              Convertirme en Artista
            </Link>
          </div>
        </Card>
      )}
    </div>
  )
}
