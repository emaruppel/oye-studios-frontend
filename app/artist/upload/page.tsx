'use client'

import React, { useState } from 'react'
import Card from '@/components/Card'
import Button from '@/components/Button'
import { Upload, Video, CheckCircle, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function UploadVideoPage() {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [uploadComplete, setUploadComplete] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      
      // Validate file type
      const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo']
      if (!validTypes.includes(selectedFile.type)) {
        alert('Por favor selecciona un archivo de video válido (MP4, MOV, AVI)')
        return
      }

      // Validate file size (max 500MB for demo)
      const maxSize = 500 * 1024 * 1024 // 500MB
      if (selectedFile.size > maxSize) {
        alert('El archivo es demasiado grande. Máximo 500MB')
        return
      }

      setFile(selectedFile)
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!file || !title) {
      alert('Por favor completa todos los campos requeridos')
      return
    }

    setUploading(true)
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploadComplete(true)
          setUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 500)

    // In real implementation, upload to backend
    // const formData = new FormData()
    // formData.append('video', file)
    // formData.append('title', title)
    // formData.append('description', description)
    // await api.post('/videos/upload', formData)
  }

  if (uploadComplete) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto text-center">
          <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">¡Video Subido!</h1>
          <p className="text-gray-600 mb-6">
            Tu video se está procesando. Estará disponible en unos minutos.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => router.push('/artist')}>
              Volver al Dashboard
            </Button>
            <Button variant="outline" onClick={() => {
              setUploadComplete(false)
              setProgress(0)
              setFile(null)
              setTitle('')
              setDescription('')
            }}>
              Subir Otro
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Subir Video</h1>
        <p className="text-gray-600">Comparte tu contenido con tu audiencia</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <form onSubmit={handleUpload} className="space-y-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Archivo de Video *
                </label>
                {!file ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary-500 transition cursor-pointer">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="video-upload"
                    />
                    <label htmlFor="video-upload" className="cursor-pointer">
                      <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-semibold mb-2">
                        Haz clic para seleccionar un video
                      </p>
                      <p className="text-sm text-gray-500">
                        MP4, MOV o AVI hasta 500MB
                      </p>
                    </label>
                  </div>
                ) : (
                  <div className="border border-gray-300 rounded-lg p-4 flex items-center gap-4">
                    <Video className="w-12 h-12 text-primary-600" />
                    <div className="flex-1">
                      <p className="font-semibold">{file.name}</p>
                      <p className="text-sm text-gray-600">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setFile(null)}
                    >
                      Cambiar
                    </Button>
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Título *
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Título de tu video"
                  maxLength={100}
                />
                <p className="text-sm text-gray-500 mt-1">{title.length}/100</p>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Describe tu video..."
                  rows={4}
                  maxLength={500}
                />
                <p className="text-sm text-gray-500 mt-1">{description.length}/500</p>
              </div>

              {/* Upload Progress */}
              {uploading && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Subiendo...</span>
                    <span className="text-sm font-medium">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button type="submit" disabled={!file || !title || uploading} fullWidth>
                  {uploading ? 'Subiendo...' : 'Subir Video'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/artist')}
                  disabled={uploading}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          <Card>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary-600" />
              Requisitos
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Formato: MP4, MOV, AVI</li>
              <li>• Tamaño máximo: 500 MB</li>
              <li>• Resolución recomendada: 1080p</li>
              <li>• Duración máxima: 60 minutos</li>
            </ul>
          </Card>

          <Card>
            <h3 className="font-semibold mb-4">Consejos</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✓ Usa un título descriptivo</li>
              <li>✓ Añade una descripción detallada</li>
              <li>✓ Asegúrate de tener buena iluminación</li>
              <li>✓ Audio claro y sin ruido</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
