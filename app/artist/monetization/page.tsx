'use client'

import React from 'react'
import Card from '@/components/Card'
import Button from '@/components/Button'
import { DollarSign, CheckCircle, XCircle, TrendingUp, Calendar } from 'lucide-react'

export default function MonetizationPage() {
  const isMonetizationEnabled = true // Mock status
  const meetsRequirements = {
    subscribers: true,
    videos: true,
    watchTime: false,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Monetización</h1>
        <p className="text-gray-600">Gestiona tus ingresos y pagos</p>
      </div>

      {/* Monetization Status */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Estado de Monetización</h2>
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              isMonetizationEnabled
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {isMonetizationEnabled ? 'Activo' : 'Pendiente'}
          </span>
        </div>

        {isMonetizationEnabled ? (
          <p className="text-gray-600">
            ¡Felicitaciones! Tu canal está monetizado y puede generar ingresos.
          </p>
        ) : (
          <div>
            <p className="text-gray-600 mb-4">
              Para activar la monetización, cumple con los siguientes requisitos:
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {meetsRequirements.subscribers ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600" />
                )}
                <span>1,000 seguidores mínimo (Cumplido: 1,234)</span>
              </div>
              <div className="flex items-center gap-3">
                {meetsRequirements.videos ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600" />
                )}
                <span>10 videos publicados mínimo (Cumplido: 18)</span>
              </div>
              <div className="flex items-center gap-3">
                {meetsRequirements.watchTime ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600" />
                )}
                <span>4,000 horas de visualización (Progreso: 3,200/4,000)</span>
              </div>
            </div>
            {!Object.values(meetsRequirements).every(Boolean) && (
              <div className="mt-4">
                <Button disabled>Solicitar Monetización</Button>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Earnings Overview */}
      {isMonetizationEnabled && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Este Mes</p>
                  <p className="text-2xl font-bold">$2,800</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Último Mes</p>
                  <p className="text-2xl font-bold">$2,400</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Calendar className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold">$15,200</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Payment History */}
          <Card className="mb-6">
            <h2 className="text-xl font-bold mb-4">Historial de Pagos</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Fecha</th>
                    <th className="text-left py-3 px-4">Período</th>
                    <th className="text-left py-3 px-4">Monto</th>
                    <th className="text-left py-3 px-4">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { date: '2024-06-15', period: 'Mayo 2024', amount: 2400, status: 'Pagado' },
                    { date: '2024-05-15', period: 'Abril 2024', amount: 2100, status: 'Pagado' },
                    { date: '2024-04-15', period: 'Marzo 2024', amount: 1500, status: 'Pagado' },
                    { date: '2024-03-15', period: 'Febrero 2024', amount: 1900, status: 'Pagado' },
                    { date: '2024-02-15', period: 'Enero 2024', amount: 1200, status: 'Pagado' },
                  ].map((payment, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{payment.date}</td>
                      <td className="py-3 px-4">{payment.period}</td>
                      <td className="py-3 px-4 font-semibold">${payment.amount.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Payment Information */}
          <Card>
            <h2 className="text-xl font-bold mb-4">Información de Pago</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Método de Pago</p>
                <p className="font-semibold">Transferencia Bancaria</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Frecuencia</p>
                <p className="font-semibold">Mensual (15 de cada mes)</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Próximo Pago</p>
                <p className="font-semibold">15 de Julio, 2024</p>
              </div>
              <Button variant="outline">Actualizar Información</Button>
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
