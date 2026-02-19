"use client";

import { motion } from "framer-motion";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";
import LineChart from "@/components/charts/LineChart";
import BarChart from "@/components/charts/BarChart";
import { mockKPIData, mockViewsData, mockRevenueData } from "@/lib/mockData";
import { formatNumber, formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const kpis = [
  { label: "Vistas totales", value: formatNumber(mockKPIData.totalViews), change: mockKPIData.viewsChange, icon: "👁️" },
  { label: "Seguidores", value: formatNumber(mockKPIData.followers), change: mockKPIData.followersChange, icon: "👥" },
  { label: "Ingresos", value: formatCurrency(mockKPIData.revenue), change: mockKPIData.revenueChange, icon: "💰" },
  { label: "Videos", value: String(mockKPIData.totalVideos), change: mockKPIData.videosChange, icon: "🎬", isCount: true },
];

export default function OverviewPage() {
  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">Resumen</h1>
      <p className="text-gray-400 mb-8">Últimos 30 días</p>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {kpis.map(({ label, value, change, icon }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-oye-card rounded-xl p-5 border border-white/5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{icon}</span>
              <span className={cn(
                "flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full",
                change >= 0 ? "text-green-400 bg-green-400/10" : "text-red-400 bg-red-400/10"
              )}>
                {change >= 0 ? <ArrowUpIcon className="w-3 h-3" /> : <ArrowDownIcon className="w-3 h-3" />}
                {Math.abs(change)}%
              </span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">{value}</p>
            <p className="text-gray-400 text-xs">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-oye-card rounded-xl p-5 border border-white/5"
        >
          <h3 className="text-white font-semibold mb-4">Vistas — últimos 30 días</h3>
          <LineChart data={mockViewsData} dataKey="views" height={220} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-oye-card rounded-xl p-5 border border-white/5"
        >
          <h3 className="text-white font-semibold mb-4">Ingresos por mes</h3>
          <BarChart data={mockRevenueData} dataKey="revenue" height={220} />
        </motion.div>
      </div>
    </div>
  );
}
