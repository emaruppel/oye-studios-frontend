"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { CloudArrowUpIcon, FilmIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";
import { useToastContext } from "@/contexts/ToastContext";
import { cn } from "@/lib/utils";

interface UploadFormData {
  title: string;
  description: string;
  genre: string;
  status: string;
}

const genres = ["Urban", "Pop", "Hip-Hop", "Regional Mexicano", "Banda", "Soul", "Rock", "Electronic", "Jazz", "Otro"];

export default function UploadPage() {
  const { showToast } = useToastContext();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { register, handleSubmit, formState: { errors } } = useForm<UploadFormData>({
    defaultValues: { status: "draft" },
  });

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type.startsWith("video/")) {
      setFile(dropped);
    } else {
      showToast("Solo se aceptan archivos de video", "error");
    }
  }, [showToast]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const onSubmit = async (data: UploadFormData) => {
    if (!file) { showToast("Selecciona un video primero", "error"); return; }
    setIsUploading(true);
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((r) => setTimeout(r, 200));
      setUploadProgress(i);
    }
    console.log("Upload data:", data);
    setIsUploading(false);
    showToast("Video subido exitosamente", "success");
    setFile(null);
    setUploadProgress(0);
  };

  return (
    <div className="px-6 py-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">Subir video</h1>
      <p className="text-gray-400 mb-8">Comparte tu contenido con el mundo</p>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-200 mb-8",
          isDragging ? "border-oye-red bg-oye-red/5" : "border-white/20 hover:border-white/40"
        )}
      >
        <AnimatePresence mode="wait">
          {file ? (
            <motion.div key="file" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
              <FilmIcon className="w-12 h-12 text-oye-red mb-3" />
              <p className="text-white font-medium">{file.name}</p>
              <p className="text-gray-400 text-sm">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
              <button onClick={() => setFile(null)} className="mt-3 text-gray-400 hover:text-white">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <CloudArrowUpIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-white font-semibold mb-1">Arrastra tu video aquí</p>
              <p className="text-gray-400 text-sm mb-4">o</p>
              <label className="cursor-pointer px-5 py-2 bg-oye-card border border-white/20 rounded-full text-white text-sm hover:bg-oye-hover transition-colors">
                Seleccionar archivo
                <input type="file" accept="video/*" className="hidden" onChange={handleFileInput} />
              </label>
              <p className="text-gray-600 text-xs mt-3">MP4, MOV, AVI · Máximo 2GB</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isUploading && (
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Subiendo...</span>
            <span className="text-white">{uploadProgress}%</span>
          </div>
          <div className="h-2 bg-oye-dark rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-oye-red rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Título *</label>
          <input
            {...register("title", { required: "El título es requerido" })}
            placeholder="Nombre de tu video"
            className="w-full bg-oye-dark border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-oye-red"
          />
          {errors.title && <p className="text-oye-red text-xs mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Descripción</label>
          <textarea
            {...register("description")}
            rows={3}
            placeholder="Describe tu video..."
            className="w-full bg-oye-dark border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-oye-red resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Género</label>
            <select
              {...register("genre")}
              className="w-full bg-oye-dark border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-oye-red appearance-none"
            >
              {genres.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Estado</label>
            <select
              {...register("status")}
              className="w-full bg-oye-dark border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-oye-red appearance-none"
            >
              <option value="draft">Borrador</option>
              <option value="published">Publicar ahora</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" variant="primary" isLoading={isUploading} disabled={!file}>
            Subir video
          </Button>
          <Button type="button" variant="ghost" onClick={() => setFile(null)}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
