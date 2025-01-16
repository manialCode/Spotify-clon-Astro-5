import { TitleCard } from "@/components/utils/TitleCard";
import { usePlayerStore } from "@/store/playerStore";
import type { Playlist } from "@/lib/data";
import { VolumeFull } from "@/icons/VolumeIcons";
import { SidePlayButton } from "@/components/SideMenu/SidePlayButton";

interface Props {
  playlist: Playlist;
}

export const PlaylistItemCard = ({ playlist }: Props) => {
  const { id, artists, cover, title, albumId } = playlist;

  // Hook para obtener el estado actual
  const { song: currentSong } =
    usePlayerStore((state) => state.currentMusic) || {};

  // Comparar si la canción actual es parte de este álbum

  const artistsString = artists.join(" • ");
  const isCurrent = currentSong?.albumId === albumId;

  return (
    <article className="relative group">
      {/* Botón para reproducir música */}
      {currentSong && (
        <div className="absolute top-[1.5rem] left-6 opacity-0 transition-all group-hover:opacity-100 z-10">
          <SidePlayButton id={id} />
        </div>
      )}
      <a
        href={`/playlist/${id}`}
        className="playlist-item flex  p-2 overflow-hidden items-center gap-2 rounded-md hover:bg-zinc-800"
      >
        <picture className="h-12 w-12 flex-none after-img">
          <img
            src={cover}
            alt={`Cover of ${title} by ${artistsString}`}
            className="object-cover w-full h-full rounded-md"
          />
        </picture>
        <div className="flex flex-auto flex-col truncate">
          {/* Componente TitleCard con client:load */}
          <TitleCard albumId={albumId} title={title} />
          <span className="text-xs text-gray-400">{artistsString}</span>
        </div>
        {isCurrent && (
          <span className="text-green-500">
            {" "}
            <VolumeFull />{" "}
          </span>
        )}
      </a>
    </article>
  );
};
