import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import BottomPlayer from "@/components/layout/BottomPlayer";

export default function ArtistLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-oye-black overflow-hidden">
      <Sidebar />
      <div className="flex-1 ml-60 flex flex-col overflow-hidden">
        <Header title="Panel del Artista" />
        <main className="flex-1 overflow-y-auto pb-24">
          {children}
        </main>
      </div>
      <BottomPlayer />
    </div>
  );
}
