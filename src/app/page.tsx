import Link from "next/link";
import OyeLogo from "@/components/logos/OyeLogo";
import Button from "@/components/ui/Button";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-oye-black flex flex-col">
      <nav className="flex items-center justify-between px-8 py-5">
        <OyeLogo size={40} />
        <div className="flex gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">Iniciar sesión</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" size="sm">Registrarse</Button>
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(237,28,36,0.15) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <OyeLogo variant="stacked" size={80} className="mx-auto mb-8" />
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
            La plataforma de<br />
            <span className="text-oye-red">artistas independientes</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Descubre, escucha y comparte música y videos de los mejores artistas independientes de Latinoamérica.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button variant="primary" size="lg" className="text-base px-10">
                Comenzar gratis
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="text-base px-10">
                Iniciar sesión
              </Button>
            </Link>
          </div>
          <p className="text-gray-600 text-sm mt-6">Sin tarjeta de crédito requerida</p>
        </div>
      </div>

      <section className="py-20 px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: "🎵", title: "Streaming HLS", desc: "Videos en alta calidad con streaming adaptativo" },
            { icon: "💰", title: "Monetización", desc: "Conecta Stripe, PayPal, Mercado Pago o cripto" },
            { icon: "📊", title: "Analíticas", desc: "Estadísticas en tiempo real de tu audiencia" },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-oye-card rounded-2xl p-6 border border-white/5">
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
              <p className="text-gray-400 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/5 py-6 px-8 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} Oye Studios. Todos los derechos reservados.
      </footer>
    </main>
  );
}
