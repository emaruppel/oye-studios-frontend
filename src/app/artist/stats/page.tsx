"use client";

import { motion } from "framer-motion";
import LineChart from "@/components/charts/LineChart";
import BarChart from "@/components/charts/BarChart";
import { mockViewsData, mockRevenueData, mockVideos } from "@/lib/mockData";
import { formatViews } from "@/lib/utils";

export default function StatsPage() {
  const topVideos = [...mockVideos].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">Estadísticas</h1>
      <p className="text-gray-400 mb-8">Análisis detallado de tu contenido</p>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-oye-card rounded-xl p-5 border border-white/5"
        >
          <h3 className="text-white font-semibold mb-1">Vistas diarias</h3>
          <p className="text-gray-400 text-xs mb-4">Últimos 30 días</p>
          <LineChart data={mockViewsData} dataKey="views" height={200} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-oye-card rounded-xl p-5 border border-white/5"
        >
          <h3 className="text-white font-semibold mb-1">Ingresos mensuales</h3>
          <p className="text-gray-400 text-xs mb-4">Últimos 6 meses</p>
          <BarChart data={mockRevenueData} dataKey="revenue" height={200} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-oye-card rounded-xl p-5 border border-white/5"
      >
        <h3 className="text-white font-semibold mb-4">Top 5 videos por vistas</h3>
        <div className="space-y-3">
          {topVideos.map((video, i) => (
            <div key={video.id} className="flex items-center gap-4">
              <span className="text-gray-500 text-sm w-5 text-right font-mono">{i + 1}</span>
              <img src={video.thumbnail} alt={video.title} className="w-12 h-8 object-cover rounded" />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{video.title}</p>
                <p className="text-gray-400 text-xs">{video.artistName}</p>
              </div>
              <div className="text-right">
                <p className="text-white text-sm font-semibold">{formatViews(video.views)}</p>
                <p className="text-gray-500 text-xs">vistas</p>
              </div>
              <div className="w-24 h-1.5 bg-oye-dark rounded-full overflow-hidden">
                <div
                  className="h-full bg-oye-red rounded-full"
                  style={{ width: `${(video.views / topVideos[0].views) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
