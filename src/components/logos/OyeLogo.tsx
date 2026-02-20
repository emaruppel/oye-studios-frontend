"use client";

import { cn } from "@/lib/utils";

interface OyeLogoProps {
  variant?: "full" | "icon" | "stacked";
  className?: string;
  size?: number;
}

export default function OyeLogo({ variant = "full", className, size = 32 }: OyeLogoProps) {
  if (variant === "icon") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(className)}
      >
        <circle cx="20" cy="20" r="20" fill="#ED1C24" />
        <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="18" fontWeight="900" fontFamily="system-ui,sans-serif">O</text>
      </svg>
    );
  }

  if (variant === "stacked") {
    return (
      <div className={cn("flex flex-col items-center", className)}>
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="20" fill="#ED1C24" />
          <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="18" fontWeight="900" fontFamily="system-ui,sans-serif">O</text>
        </svg>
        <div className="mt-1 text-center">
          <span className="block text-white font-black text-sm tracking-wider">OYE</span>
          <span className="block text-gray-400 text-xs font-light tracking-widest">STUDIOS</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="20" fill="#ED1C24" />
        <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="18" fontWeight="900" fontFamily="system-ui,sans-serif">O</text>
      </svg>
      <div className="flex flex-col leading-tight">
        <span className="text-white font-black tracking-wider" style={{ fontSize: size * 0.45 }}>OYE</span>
        <span className="text-gray-400 font-light tracking-widest uppercase" style={{ fontSize: size * 0.28 }}>Studios</span>
      </div>
    </div>
  );
}
