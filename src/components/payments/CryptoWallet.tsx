"use client";

import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import { useToastContext } from "@/contexts/ToastContext";

interface CryptoFormData {
  walletAddress: string;
  network: string;
}

const networks = [
  { value: "ethereum", label: "Ethereum (ETH)" },
  { value: "bitcoin", label: "Bitcoin (BTC)" },
  { value: "polygon", label: "Polygon (MATIC)" },
  { value: "solana", label: "Solana (SOL)" },
  { value: "usdc", label: "USDC (ERC-20)" },
];

export default function CryptoWallet() {
  const { showToast } = useToastContext();
  const { register, handleSubmit, formState: { errors } } = useForm<CryptoFormData>({
    defaultValues: { network: "ethereum" },
  });

  const onSubmit = async (data: CryptoFormData) => {
    await new Promise((r) => setTimeout(r, 800));
    console.log("Crypto wallet:", data);
    showToast("Wallet configurada exitosamente", "success");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">₿</span>
        </div>
        <div>
          <h3 className="text-white font-semibold">Crypto Wallet</h3>
          <p className="text-gray-400 text-xs">Recibe pagos en criptomonedas vía Coinbase Commerce</p>
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Red Blockchain</label>
        <select
          {...register("network", { required: "Selecciona una red" })}
          className="w-full bg-oye-dark border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-oye-red appearance-none cursor-pointer"
        >
          {networks.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {errors.network && <p className="text-oye-red text-xs mt-1">{errors.network.message}</p>}
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Dirección de Wallet</label>
        <input
          {...register("walletAddress", {
            required: "La dirección es requerida",
            minLength: { value: 20, message: "Dirección muy corta" },
          })}
          type="text"
          placeholder="0x..."
          className="w-full bg-oye-dark border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-oye-red font-mono text-sm"
        />
        {errors.walletAddress && <p className="text-oye-red text-xs mt-1">{errors.walletAddress.message}</p>}
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
        <p className="text-yellow-400 text-xs">
          ⚠️ Verifica tu dirección antes de guardar. Los pagos enviados a una dirección incorrecta no son recuperables.
        </p>
      </div>

      <Button type="submit" variant="primary">Guardar Wallet</Button>
    </form>
  );
}
