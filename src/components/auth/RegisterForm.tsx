"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { useToastContext } from "@/contexts/ToastContext";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "listener" | "artist";
}

export default function RegisterForm() {
  const { register: registerUser, isLoading } = useAuth();
  const { showToast } = useToastContext();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<"listener" | "artist">("listener");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({ defaultValues: { role: "listener" } });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({ ...data, role: selectedRole });
      showToast("¡Cuenta creada exitosamente!", "success");
      router.push("/home");
    } catch {
      showToast("Error al crear la cuenta", "error");
    }
  };

  const password = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Role selection */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { value: "listener", label: "🎧 Oyente", desc: "Descubre música y videos" },
          { value: "artist", label: "🎤 Artista", desc: "Sube y monetiza tu música" },
        ].map(({ value, label, desc }) => (
          <button
            key={value}
            type="button"
            onClick={() => setSelectedRole(value as "listener" | "artist")}
            className={cn(
              "p-3 border rounded-xl text-left transition-all",
              selectedRole === value
                ? "border-oye-red bg-oye-red/10 text-white"
                : "border-white/20 text-gray-400 hover:border-white/40"
            )}
          >
            <div className="font-semibold text-sm">{label}</div>
            <div className="text-xs mt-0.5 opacity-70">{desc}</div>
          </button>
        ))}
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Nombre</label>
        <input
          {...register("name", { required: "El nombre es requerido" })}
          type="text"
          placeholder="Tu nombre"
          className="w-full bg-oye-dark border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-oye-red transition-colors"
        />
        {errors.name && <p className="text-oye-red text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Correo electrónico</label>
        <input
          {...register("email", {
            required: "El correo es requerido",
            pattern: { value: /\S+@\S+\.\S+/, message: "Correo inválido" },
          })}
          type="email"
          placeholder="tu@email.com"
          className="w-full bg-oye-dark border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-oye-red transition-colors"
        />
        {errors.email && <p className="text-oye-red text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Contraseña</label>
        <input
          {...register("password", {
            required: "La contraseña es requerida",
            minLength: { value: 6, message: "Mínimo 6 caracteres" },
          })}
          type="password"
          placeholder="••••••••"
          className="w-full bg-oye-dark border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-oye-red transition-colors"
        />
        {errors.password && <p className="text-oye-red text-xs mt-1">{errors.password.message}</p>}
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Confirmar contraseña</label>
        <input
          {...register("confirmPassword", {
            required: "Confirma tu contraseña",
            validate: (v) => v === password || "Las contraseñas no coinciden",
          })}
          type="password"
          placeholder="••••••••"
          className="w-full bg-oye-dark border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-oye-red transition-colors"
        />
        {errors.confirmPassword && <p className="text-oye-red text-xs mt-1">{errors.confirmPassword.message}</p>}
      </div>

      <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
        Crear cuenta
      </Button>

      <p className="text-center text-gray-400 text-sm">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="text-oye-red hover:underline">
          Iniciar sesión
        </Link>
      </p>
    </form>
  );
}
