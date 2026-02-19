import Link from 'next/link'
import { Music, Play, TrendingUp, Users } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Bienvenido a Oye Studios
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Tu plataforma para descubrir, compartir y monetizar música y podcasts
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link 
                  href="/register" 
                  className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Comenzar Ahora
                </Link>
                <Link 
                  href="/login" 
                  className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
                >
                  Iniciar Sesión
                </Link>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <Music className="w-48 h-48 md:w-64 md:h-64 opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            ¿Por qué Oye Studios?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Play className="w-16 h-16 mx-auto mb-4 text-primary-600" />
              <h3 className="text-xl font-semibold mb-2">Streaming Adaptativo</h3>
              <p className="text-gray-600">
                Disfruta de la mejor calidad de video con tecnología HLS adaptativa
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <TrendingUp className="w-16 h-16 mx-auto mb-4 text-primary-600" />
              <h3 className="text-xl font-semibold mb-2">Monetización</h3>
              <p className="text-gray-600">
                Los artistas pueden monetizar su contenido y recibir pagos directos
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-primary-600" />
              <h3 className="text-xl font-semibold mb-2">Comunidad</h3>
              <p className="text-gray-600">
                Conecta con artistas y fans de todo el mundo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Eres artista?
          </h2>
          <p className="text-xl mb-8">
            Sube tu contenido, construye tu audiencia y monetiza tu talento
          </p>
          <Link 
            href="/register?type=artist" 
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Registrarse como Artista
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <p>&copy; 2024 Oye Studios. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
