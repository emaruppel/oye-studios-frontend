import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { PlayerProvider } from "@/contexts/PlayerContext";
import { ToastProvider } from "@/contexts/ToastContext";
import Toast from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "Oye Studios - La plataforma de artistas independientes",
  description: "Descubre, escucha y comparte música y videos de artistas independientes en Latinoamérica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className="antialiased bg-oye-black text-white">
        <ThemeProvider>
          <AuthProvider>
            <PlayerProvider>
              <ToastProvider>
                {children}
                <Toast />
              </ToastProvider>
            </PlayerProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
