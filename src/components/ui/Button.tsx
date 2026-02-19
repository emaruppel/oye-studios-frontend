"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-oye-red/50 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "bg-oye-red text-white hover:bg-red-600 active:scale-95",
      secondary: "bg-white text-black hover:bg-gray-200 active:scale-95",
      ghost: "bg-transparent text-white hover:bg-oye-hover active:scale-95",
      danger: "bg-red-700 text-white hover:bg-red-800 active:scale-95",
      outline: "border border-white/30 text-white hover:border-white hover:bg-white/10 active:scale-95",
    };

    const sizes = {
      sm: "px-4 py-1.5 text-sm",
      md: "px-6 py-2.5 text-sm",
      lg: "px-8 py-3.5 text-base",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled ? 1 : 0.96 }}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Cargando...
          </span>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;
