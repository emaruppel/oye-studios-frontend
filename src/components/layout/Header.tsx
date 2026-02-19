"use client";

import { BellIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/ui/Button";
import Link from "next/link";

interface HeaderProps {
  title?: string;
}

export default function Header({ title }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-oye-black/80 backdrop-blur-md border-b border-white/5 px-6 py-3 flex items-center justify-between">
      <h1 className="text-white font-bold text-xl">{title}</h1>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          {theme === "dark" ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
        </button>
        {user && (
          <button className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors relative">
            <BellIcon className="w-5 h-5" />
          </button>
        )}
        {user ? (
          <div className="flex items-center gap-2">
            <img
              src={user.avatar || `https://picsum.photos/seed/${user.id}/32/32`}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover cursor-pointer"
            />
            <button
              onClick={logout}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Salir
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">Iniciar sesión</Button>
            </Link>
            <Link href="/register">
              <Button variant="primary" size="sm">Registrarse</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
