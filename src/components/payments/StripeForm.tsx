"use client";

import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import { useToastContext } from "@/contexts/ToastContext";

interface StripeFormData {
  accountEmail: string;
  publishableKey: string;
  secretKey: string;
}

export default function StripeForm() {
  const { showToast } = useToastContext();
  const { register, handleSubmit, formState: { errors } } = useForm<StripeFormData>();

  const onSubmit = async (data: StripeFormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Stripe config:", data);
    showToast("Stripe conectado exitosamente", "success");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-[#635BFF] rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">S</span>
        </div>
        <div>
          <h3 className="text-white font-semibold">Stripe</h3>
          <p className="text-gray-400 text-xs">Acepta pagos con tarjeta de crédito</p>
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Correo de la cuenta Stripe</label>
        <input
          {...register("accountEmail", { required: "Requerido", pattern: { value: /\S+@\S+\.\S+/, message: "Email inválido" } })}
          type="email"
          placeholder="tu@cuenta.com"
          className="w-full bg-oye-dark border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-oye-red"
        />
        {errors.accountEmail && <p className="text-oye-red text-xs mt-1">{errors.accountEmail.message}</p>}
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Publishable Key</label>
        <input
          {...register("publishableKey", { required: "Requerido" })}
          type="text"
          placeholder="pk_live_..."
          className="w-full bg-oye-dark border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-oye-red font-mono text-sm"
        />
        {errors.publishableKey && <p className="text-oye-red text-xs mt-1">{errors.publishableKey.message}</p>}
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Secret Key</label>
        <input
          {...register("secretKey", { required: "Requerido" })}
          type="password"
          placeholder="sk_live_..."
          className="w-full bg-oye-dark border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-oye-red font-mono text-sm"
        />
        {errors.secretKey && <p className="text-oye-red text-xs mt-1">{errors.secretKey.message}</p>}
      </div>

      <Button type="submit" variant="primary">Conectar Stripe</Button>
    </form>
  );
}
