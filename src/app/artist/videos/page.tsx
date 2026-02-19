"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { mockVideos } from "@/lib/mockData";
import { formatViews, formatDuration, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Video } from "@/types";
import DataTable, { Column } from "@/components/ui/DataTable";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function VideosPage() {
  const [videos] = useState(mockVideos.filter((v) => v.artistId === "1"));

  const columns: Column[] = [
    {
      key: "title",
      label: "Video",
      render: (row: Video) => (
        <div className="flex items-center gap-3">
          <img src={row.thumbnail} alt={row.title} className="w-14 h-9 object-cover rounded" />
          <div>
            <p className="text-white font-medium text-sm">{row.title}</p>
            <p className="text-gray-500 text-xs">{formatDuration(row.duration)}</p>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      label: "Estado",
      render: (row: Video) => (
        <span className={cn(
          "px-2 py-0.5 rounded-full text-xs font-medium",
          row.status === "published" ? "bg-green-500/20 text-green-400" :
          row.status === "draft" ? "bg-yellow-500/20 text-yellow-400" :
          "bg-blue-500/20 text-blue-400"
        )}>
          {row.status === "published" ? "Publicado" : row.status === "draft" ? "Borrador" : "Procesando"}
        </span>
      ),
    },
    {
      key: "views",
      label: "Vistas",
      render: (row: Video) => <span>{formatViews(row.views)}</span>,
      sortable: true,
    },
    {
      key: "publishedAt",
      label: "Publicado",
      render: (row: Video) => <span>{formatDate(row.publishedAt)}</span>,
      sortable: true,
    },
    {
      key: "actions",
      label: "Acciones",
      render: () => (
        <div className="flex gap-2">
          <button className="p-1 text-gray-400 hover:text-white transition-colors" title="Ver">
            <EyeIcon className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-400 hover:text-white transition-colors" title="Editar">
            <PencilIcon className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-400 hover:text-red-400 transition-colors" title="Eliminar">
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Mis Videos</h1>
          <p className="text-gray-400 text-sm mt-1">{videos.length} videos</p>
        </div>
        <Link href="/artist/upload">
          <Button variant="primary">+ Subir video</Button>
        </Link>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <DataTable columns={columns} data={videos} emptyMessage="No tienes videos aún" />
      </motion.div>
    </div>
  );
}
