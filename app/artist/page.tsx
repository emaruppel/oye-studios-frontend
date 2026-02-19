'use client'

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Card from '@/components/Card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Upload, TrendingUp, DollarSign, Users, Video, Bell } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/Button'

// Mock data
const statsData = [
  { name: 'Lun', reproducciones: 400 },
  { name: 'Mar', reproducciones: 300 },
  { name: 'Mié', reproducciones: 600 },
  { name: 'Jue', reproducciones: 800 },
  { name: 'Vie', reproducciones: 700 },
  { name: 'Sáb', reproducciones: 900 },
  { name: 'Dom', reproducciones: 500 },
]

const revenueData = [
  { name: 'Ene', ingresos: 1200 },
  { name: 'Feb', ingresos: 1900 },
  { name: 'Mar', ingresos: 1500 },
  { name: 'Abr', ingresos: 2100 },
  { name: 'May', ingresos: 2400 },
  { name: 'Jun', ingresos: 2800 },
]

export default function ArtistDashboard() {
  const { user } = useAuth()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Panel de Artista</h1>
        <p className="text-gray-600">Gestiona tu contenido y analiza tu rendimiento</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Link href="/artist/upload">
          <Card className="hover:shadow-lg transition cursor-pointer">
            <div className="flex flex-col items-center text-center gap-2">
              <Upload className="w-10 h-10 text-primary-600" />
              <span className="font-semibold">Subir Video</span>
            </div>
          </Card>
        </Link>
        
        <Link href="/artist/videos">
          <Card className="hover:shadow-lg transition cursor-pointer">
            <div className="flex flex-col items-center text-center gap-2">
              <Video className="w-10 h-10 text-blue-600" />
              <span className="font-semibold">Mis Videos</span>
            </div>
          </Card>
        </Link>

        <Link href="/artist/monetization">
          <Card className="hover:shadow-lg transition cursor-pointer">
            <div className="flex flex-col items-center text-center gap-2">
              <DollarSign className="w-10 h-10 text-green-600" />
              <span className="font-semibold">Monetización</span>
            </div>
          </Card>
        </Link>

        <Link href="/artist/notifications">
          <Card className="hover:shadow-lg transition cursor-pointer">
            <div className="flex flex-col items-center text-center gap-2">
              <Bell className="w-10 h-10 text-orange-600" />
              <span className="font-semibold">Notificaciones</span>
            </div>
          </Card>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-100 rounded-lg">
              <TrendingUp className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Reproducciones</p>
              <p className="text-2xl font-bold">24.5K</p>
              <p className="text-sm text-green-600">+12% esta semana</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Seguidores</p>
              <p className="text-2xl font-bold">1,234</p>
              <p className="text-sm text-green-600">+45 nuevos</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Ingresos (mes)</p>
              <p className="text-2xl font-bold">$2,800</p>
              <p className="text-sm text-green-600">+16.7%</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Video className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Videos Totales</p>
              <p className="text-2xl font-bold">18</p>
              <p className="text-sm text-gray-500">8 publicados</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <h2 className="text-xl font-bold mb-4">Reproducciones (Última Semana)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="reproducciones" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4">Evolución de Ingresos</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="ingresos" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Videos */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Videos Recientes</h2>
          <Link href="/artist/upload">
            <Button size="sm">Subir Nuevo</Button>
          </Link>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition">
              <div className="w-32 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded flex items-center justify-center flex-shrink-0">
                <Video className="w-8 h-8 text-white opacity-75" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Mi Video {item}</h3>
                <p className="text-sm text-gray-600">Publicado hace {item} días</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{(item * 1000).toLocaleString()}</p>
                <p className="text-sm text-gray-600">reproducciones</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
