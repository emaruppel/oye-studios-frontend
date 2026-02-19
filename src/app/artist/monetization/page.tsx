"use client";

import { motion } from "framer-motion";
import { CheckCircleIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";

const requirements = [
  { label: "1,000 seguidores", completed: true, current: "45,231" },
  { label: "10,000 vistas en los últimos 30 días", completed: true, current: "124,783" },
  { label: "Cuenta verificada", completed: false, current: "Pendiente" },
  { label: "Contenido original (sin Copyright)", completed: true, current: "Aprobado" },
];

const monetizationOptions = [
  {
    id: "ads",
    title: "Publicidad en videos",
    desc: "Gana ingresos por anuncios que se muestran en tus videos",
    status: "active",
    rate: "$2.50 CPM",
  },
  {
    id: "subscriptions",
    title: "Suscripciones de fans",
    desc: "Tus fans pueden suscribirse por contenido exclusivo",
    status: "active",
    rate: "$4.99/mes",
  },
  {
    id: "tips",
    title: "Propinas directas",
    desc: "Tus seguidores pueden enviarte propinas directas",
    status: "pending",
    rate: "Variable",
  },
  {
    id: "nft",
    title: "NFT de contenido",
    desc: "Vende momentos exclusivos como NFTs",
    status: "locked",
    rate: "Royalties 10%",
  },
];

export default function MonetizationPage() {
  const completedCount = requirements.filter((r) => r.completed).length;
  const progress = (completedCount / requirements.length) * 100;

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">Monetización</h1>
      <p className="text-gray-400 mb-8">Gestiona tus fuentes de ingresos</p>

      {/* Status card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-oye-red/20 to-oye-card rounded-2xl p-6 border border-oye-red/30 mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white font-bold text-lg">Estado de monetización</h2>
            <p className="text-gray-400 text-sm">Completa los requisitos para activar todos los ingresos</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black text-white">{completedCount}/{requirements.length}</p>
            <p className="text-gray-400 text-xs">requisitos</p>
          </div>
        </div>
        <div className="h-2 bg-oye-dark rounded-full overflow-hidden mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-oye-red rounded-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {requirements.map((req) => (
            <div key={req.label} className="flex items-center gap-2">
              <CheckCircleIcon className={cn("w-4 h-4 flex-shrink-0", req.completed ? "text-green-400" : "text-gray-600")} />
              <div>
                <p className={cn("text-xs", req.completed ? "text-white" : "text-gray-500")}>{req.label}</p>
                <p className={cn("text-xs", req.completed ? "text-green-400" : "text-yellow-400")}>{req.current}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Options */}
      <h2 className="text-lg font-bold text-white mb-4">Fuentes de ingresos</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {monetizationOptions.map(({ id, title, desc, status, rate }, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className={cn(
              "bg-oye-card rounded-xl p-5 border transition-colors",
              status === "active" ? "border-green-500/30" :
              status === "pending" ? "border-yellow-500/30" :
              "border-white/5 opacity-60"
            )}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-white font-semibold text-sm">{title}</h3>
              {status === "locked" ? (
                <LockClosedIcon className="w-4 h-4 text-gray-500" />
              ) : (
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full font-medium",
                  status === "active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                )}>
                  {status === "active" ? "Activo" : "Pendiente"}
                </span>
              )}
            </div>
            <p className="text-gray-400 text-xs mb-3">{desc}</p>
            <p className="text-oye-red text-sm font-bold">{rate}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
