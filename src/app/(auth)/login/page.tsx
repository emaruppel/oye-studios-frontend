import OyeLogo from "@/components/logos/OyeLogo";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-oye-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <OyeLogo variant="stacked" size={48} className="mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white">Iniciar sesión</h1>
          <p className="text-gray-400 text-sm mt-1">Bienvenido de vuelta</p>
        </div>
        <div className="bg-oye-card rounded-2xl p-6 border border-white/10">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
