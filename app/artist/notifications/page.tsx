'use client'

import React from 'react'
import Card from '@/components/Card'
import { Bell, Info, AlertTriangle, CheckCircle } from 'lucide-react'

interface Notification {
  id: string
  type: 'info' | 'warning' | 'success'
  title: string
  message: string
  date: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Nuevo hito alcanzado',
    message: '¡Felicitaciones! Has alcanzado 1,000 seguidores',
    date: '2024-06-15',
    read: false,
  },
  {
    id: '2',
    type: 'info',
    title: 'Actualización de Políticas',
    message: 'Hemos actualizado nuestras políticas de monetización. Por favor revisa los nuevos términos.',
    date: '2024-06-14',
    read: false,
  },
  {
    id: '3',
    type: 'warning',
    title: 'Video en revisión',
    message: 'Tu video "Mi Video 3" está siendo revisado por posible violación de derechos de autor.',
    date: '2024-06-13',
    read: true,
  },
  {
    id: '4',
    type: 'success',
    title: 'Pago procesado',
    message: 'Tu pago de $2,400 ha sido procesado exitosamente.',
    date: '2024-06-10',
    read: true,
  },
  {
    id: '5',
    type: 'info',
    title: 'Nuevas funciones disponibles',
    message: 'Ya puedes usar nuestro nuevo editor de videos integrado.',
    date: '2024-06-08',
    read: true,
  },
]

export default function NotificationsPage() {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-600" />
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-600" />
      case 'info':
      default:
        return <Info className="w-6 h-6 text-blue-600" />
    }
  }

  const getBgColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50'
      case 'warning':
        return 'bg-yellow-50'
      case 'info':
      default:
        return 'bg-blue-50'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Notificaciones</h1>
          <p className="text-gray-600">Mantente al día con las últimas actualizaciones</p>
        </div>
        <Bell className="w-8 h-8 text-primary-600" />
      </div>

      <div className="space-y-4">
        {mockNotifications.map((notification) => (
          <Card
            key={notification.id}
            className={`${getBgColor(notification.type)} ${
              !notification.read ? 'border-l-4 border-primary-600' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{notification.title}</h3>
                    <p className="text-gray-700 mb-2">{notification.message}</p>
                    <p className="text-sm text-gray-500">{notification.date}</p>
                  </div>
                  {!notification.read && (
                    <span className="ml-4 px-2 py-1 bg-primary-600 text-white text-xs rounded-full">
                      Nuevo
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {mockNotifications.length === 0 && (
        <Card className="text-center py-12">
          <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No tienes notificaciones</h3>
          <p className="text-gray-600">Te avisaremos cuando haya novedades</p>
        </Card>
      )}
    </div>
  )
}
