"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import StripeForm from "@/components/payments/StripeForm";
import PayPalForm from "@/components/payments/PayPalForm";
import MercadoPagoForm from "@/components/payments/MercadoPagoForm";
import CryptoWallet from "@/components/payments/CryptoWallet";
import DataTable, { Column } from "@/components/ui/DataTable";
import { mockTransactions } from "@/lib/mockData";
import { formatDate } from "@/lib/utils";
import { Transaction } from "@/types";
import { cn } from "@/lib/utils";

const paymentTabs = [
  { id: "stripe", label: "Stripe" },
  { id: "paypal", label: "PayPal" },
  { id: "mercadopago", label: "Mercado Pago" },
  { id: "crypto", label: "Crypto" },
];

const txColumns: Column[] = [
  {
    key: "date",
    label: "Fecha",
    render: (row: Transaction) => <span>{formatDate(row.date)}</span>,
    sortable: true,
  },
  {
    key: "amount",
    label: "Monto",
    render: (row: Transaction) => <span className="font-mono">{row.amount} {row.currency}</span>,
    sortable: true,
  },
  {
    key: "method",
    label: "Método",
    render: (row: Transaction) => (
      <span className="capitalize">{row.method === "mercadopago" ? "Mercado Pago" : row.method}</span>
    ),
  },
  {
    key: "status",
    label: "Estado",
    render: (row: Transaction) => (
      <span className={cn(
        "px-2 py-0.5 rounded-full text-xs font-medium",
        row.status === "completed" ? "bg-green-500/20 text-green-400" :
        row.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
        "bg-red-500/20 text-red-400"
      )}>
        {row.status === "completed" ? "Completado" : row.status === "pending" ? "Pendiente" : "Fallido"}
      </span>
    ),
  },
  { key: "description", label: "Descripción" },
];

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState("stripe");

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">Métodos de pago</h1>
      <p className="text-gray-400 mb-8">Configura cómo quieres recibir tus ingresos</p>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {paymentTabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
              activeTab === id
                ? "bg-oye-red text-white"
                : "bg-oye-card text-gray-400 hover:text-white border border-white/10"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-oye-card rounded-2xl p-6 border border-white/10 mb-8"
      >
        {activeTab === "stripe" && <StripeForm />}
        {activeTab === "paypal" && <PayPalForm />}
        {activeTab === "mercadopago" && <MercadoPagoForm />}
        {activeTab === "crypto" && <CryptoWallet />}
      </motion.div>

      <h2 className="text-lg font-bold text-white mb-4">Historial de transacciones</h2>
      <DataTable columns={txColumns} data={mockTransactions} emptyMessage="Sin transacciones" />
    </div>
  );
}
