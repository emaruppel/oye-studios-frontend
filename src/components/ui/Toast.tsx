"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useToastContext } from "@/contexts/ToastContext";
import { ToastMessage } from "@/types";
import { cn } from "@/lib/utils";

const icons = {
  success: <CheckCircleIcon className="w-5 h-5 text-green-400" />,
  error: <XCircleIcon className="w-5 h-5 text-red-400" />,
  warning: <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400" />,
  info: <InformationCircleIcon className="w-5 h-5 text-blue-400" />,
};

const colors: Record<ToastMessage["type"], string> = {
  success: "border-green-500/30 bg-green-500/10",
  error: "border-red-500/30 bg-red-500/10",
  warning: "border-yellow-500/30 bg-yellow-500/10",
  info: "border-blue-500/30 bg-blue-500/10",
};

export default function Toast() {
  const { toasts, removeToast } = useToastContext();

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className={cn(
              "flex items-center gap-3 p-3 rounded-xl border backdrop-blur-sm shadow-lg",
              colors[toast.type]
            )}
          >
            {icons[toast.type]}
            <p className="flex-1 text-sm text-white">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
