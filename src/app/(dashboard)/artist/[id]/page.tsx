import { mockArtists, mockVideos } from "@/lib/mockData";
import CardVideo from "@/components/cards/CardVideo";
import { CheckBadgeIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { formatNumber } from "@/lib/utils";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ArtistProfilePage({ params }: Props) {
  const { id } = await params;
  const artist = mockArtists.find((a) => a.id === id) || mockArtists[0];
  const videos = mockVideos.filter((v) => v.artistId === artist.id);

  return (
    <div>
      {/* Cover */}
      <div className="relative h-56 bg-gradient-to-br from-oye-red/30 to-oye-black">
        {artist.coverImage && (
          <img src={artist.coverImage} alt="cover" className="w-full h-full object-cover opacity-40" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-oye-black/80 to-transparent" />
      </div>

      {/* Info */}
      <div className="px-6 pb-8 -mt-16 relative z-10">
        <div className="flex items-end gap-5 mb-6">
          <img
            src={artist.avatar || `https://picsum.photos/seed/${artist.id}/120/120`}
            alt={artist.name}
            className="w-28 h-28 rounded-full border-4 border-oye-black object-cover"
          />
          <div className="mb-2 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-black text-white">{artist.name}</h1>
              {artist.verified && <CheckBadgeIcon className="w-7 h-7 text-oye-red" />}
            </div>
            <p className="text-gray-400 text-sm">{formatNumber(artist.followers)} seguidores · {artist.genres.join(", ")}</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2 border border-white/30 text-white rounded-full text-sm font-semibold hover:border-white transition-colors">
            <UserPlusIcon className="w-4 h-4" />
            Seguir
          </button>
        </div>

        {artist.bio && <p className="text-gray-400 max-w-2xl mb-8">{artist.bio}</p>}

        <h2 className="text-xl font-bold text-white mb-4">Videos</h2>
        {videos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((v) => <CardVideo key={v.id} video={v} />)}
          </div>
        ) : (
          <p className="text-gray-500">Este artista no tiene videos publicados</p>
        )}
      </div>
    </div>
  );
}
