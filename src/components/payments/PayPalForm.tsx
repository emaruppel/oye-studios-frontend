"use client";

import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import { useToastContext } from "@/contexts/ToastContext";

interface PayPalFormData {
  businessEmail: string;
  clientId: string;
}

export default function PayPalForm() {
  const { showToast } = useToastContext();
  const { register, handleSubmit, formState: { errors } } = useForm<PayPalFormData>();

  const onSubmit = async (data: PayPalFormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    console.log("PayPal config:", data);
    showToast("PayPal conectado exitosamente", "success");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-[#003087] rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">PP</span>
        </div>
        <div>
          <h3 className="text-white font-semibold">PayPal</h3>
          <p className="text-gray-400 text-xs">Acepta pagos con PayPal y tarjetas</p>
        </div>
      </div>

      <button
        type="button"
        className="w-full py-3 bg-[#0070BA] hover:bg-[#003087] text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
        onClick={() => showToast("Redirigiendo a PayPal OAuth...", "info")}
      >
        <span>Conectar con PayPal OAuth</span>
      </button>

      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs text-gray-500">
          <span className="bg-oye-card px-3">o ingresa manualmente</span>
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Email de negocio PayPal</label>
        <input
          {...register("businessEmail", { required: "Requerido" })}
          type="email"
          placeholder="negocio@paypal.com"
          className="w-full bg-oye-dark border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-oye-red"
        />
        {errors.businessEmail && <p className="text-oye-red text-xs mt-1">{errors.businessEmail.message}</p>}
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Client ID</label>
        <input
          {...register("clientId", { required: "Requerido" })}
          type="text"
          placeholder="AXxxxxxx..."
          className="w-full bg-oye-dark border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-oye-red font-mono text-sm"
        />
        {errors.clientId && <p className="text-oye-red text-xs mt-1">{errors.clientId.message}</p>}
      </div>

      <Button type="submit" variant="primary">Guardar configuración</Button>
    </form>
  );
}
