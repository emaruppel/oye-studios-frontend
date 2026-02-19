"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BookmarkIcon,
  ChartBarIcon,
  VideoCameraIcon,
  ArrowUpTrayIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  MagnifyingGlassIcon as SearchIconSolid,
  BookmarkIcon as BookmarkIconSolid,
} from "@heroicons/react/24/solid";
import OyeLogo from "@/components/logos/OyeLogo";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const listenerNav = [
  { href: "/home", label: "Inicio", icon: HomeIcon, activeIcon: HomeIconSolid },
  { href: "/search", label: "Buscar", icon: MagnifyingGlassIcon, activeIcon: SearchIconSolid },
  { href: "/library", label: "Tu biblioteca", icon: BookmarkIcon, activeIcon: BookmarkIconSolid },
];

const artistNav = [
  { href: "/artist/overview", label: "Resumen", icon: Squares2X2Icon },
  { href: "/artist/videos", label: "Videos", icon: VideoCameraIcon },
  { href: "/artist/upload", label: "Subir video", icon: ArrowUpTrayIcon },
  { href: "/artist/stats", label: "Estadísticas", icon: ChartBarIcon },
  { href: "/artist/monetization", label: "Monetización", icon: CurrencyDollarIcon },
  { href: "/artist/payments", label: "Pagos", icon: CreditCardIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const isArtist = user?.role === "artist";

  return (
    <aside className="w-60 bg-oye-black flex-shrink-0 h-screen fixed left-0 top-0 flex flex-col border-r border-white/5 z-40">
      <div className="p-6">
        <OyeLogo size={36} />
      </div>

      <nav className="flex-1 px-3 overflow-y-auto">
        <ul className="space-y-1">
          {listenerNav.map(({ href, label, icon: Icon, activeIcon: ActiveIcon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            const IconComp = active ? ActiveIcon : Icon;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    active
                      ? "text-white bg-oye-hover"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <IconComp className="w-5 h-5 flex-shrink-0" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {isArtist && (
          <>
            <div className="mt-6 mb-2 px-3">
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                Panel Artista
              </span>
            </div>
            <ul className="space-y-1">
              {artistNav.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        active
                          ? "text-oye-red bg-oye-red/10"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </nav>

      <div className="p-4 border-t border-white/10">
        {user ? (
          <div className="flex items-center gap-3">
            <img
              src={user.avatar || `https://picsum.photos/seed/${user.id}/40/40`}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user.name}</p>
              <p className="text-gray-500 text-xs capitalize">{user.role === "artist" ? "Artista" : "Oyente"}</p>
            </div>
          </div>
        ) : (
          <Link href="/login" className="text-gray-400 hover:text-white text-sm">
            Iniciar sesión
          </Link>
        )}
      </div>
    </aside>
  );
}
