"use client";

import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import { useToastContext } from "@/contexts/ToastContext";

interface MercadoPagoFormData {
  country: string;
  clientId: string;
  clientSecret: string;
}

const countries = [
  { code: "AR", name: "Argentina" },
  { code: "MX", name: "México" },
  { code: "BR", name: "Brasil" },
  { code: "CO", name: "Colombia" },
  { code: "CL", name: "Chile" },
  { code: "PE", name: "Perú" },
  { code: "UY", name: "Uruguay" },
];

export default function MercadoPagoForm() {
  const { showToast } = useToastContext();
  const { register, handleSubmit, formState: { errors } } = useForm<MercadoPagoFormData>({
    defaultValues: { country: "MX" },
  });

  const onSubmit = async (data: MercadoPagoFormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    console.log("MercadoPago config:", data);
    showToast("Mercado Pago conectado exitosamente", "success");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-[#00BCFF] rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xs">MP</span>
        </div>
        <div>
          <h3 className="text-white font-semibold">Mercado Pago</h3>
          <p className="text-gray-400 text-xs">Pagos en Latinoamérica</p>
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">País</label>
        <select
          {...register("country", { required: "Selecciona un país" })}
          className="w-full bg-oye-dark border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-oye-red appearance-none cursor-pointer"
        >
          {countries.map(({ code, name }) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
        {errors.country && <p className="text-oye-red text-xs mt-1">{errors.country.message}</p>}
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Client ID (APP_ID)</label>
        <input
          {...register("clientId", { required: "Requerido" })}
          type="text"
          placeholder="123456789"
          className="w-full bg-oye-dark border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-oye-red font-mono text-sm"
        />
        {errors.clientId && <p className="text-oye-red text-xs mt-1">{errors.clientId.message}</p>}
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Client Secret</label>
        <input
          {...register("clientSecret", { required: "Requerido" })}
          type="password"
          placeholder="••••••••••••••••"
          className="w-full bg-oye-dark border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-oye-red font-mono text-sm"
        />
        {errors.clientSecret && <p className="text-oye-red text-xs mt-1">{errors.clientSecret.message}</p>}
      </div>

      <Button type="submit" variant="primary">Conectar Mercado Pago</Button>
    </form>
  );
}
