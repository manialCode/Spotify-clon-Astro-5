import { TitleCard } from "@/components/utils/TitleCard";
import { usePlayerStore } from "@/store/playerStore";
import type { Playlist } from "@/lib/data";
import { VolumeFull } from "@/icons/VolumeIcons";
import { CardPlayButton } from "../utils/CardPlayButton";

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
  const isCurrent = currentSong?.albumId == albumId;

  return (
    <article className="relative group transition ease-in-out hover:bg-zinc-800 rounded-md">
      {/* Botón para reproducir música */}

      <div
        className="absolute inset-2 opacity-0 transition 
       translate-y-1 group-hover:translate-y-0 duration-500
      group-hover:opacity-100 z-10  w-1 h-1"
      >
        <CardPlayButton bg="non" id={id} />
      </div>
      <a
        href={`/playlist/${id}`}
        className="playlist-item flex  p-2 overflow-hidden items-center gap-2 "
      >
        <picture className="h-12 w-12 flex-none after-img">
          <img
            src={cover}
            alt={`Cover of ${title} by ${artistsString}`}
            className="object-cover w-full h-full rounded-md"
            loading="lazy"
          />
        </picture>
        <div className="flex flex-auto flex-col truncate">
          {/* Componente TitleCard con client:load */}
          <TitleCard albumId={albumId} title={title} />
          <span className="text-xs text-gray-400">{artistsString}</span>
        </div>
        <span
          className={`text-green-500 ${
            isCurrent ? "opacity-100" : "opacity-0"
          }`}
        >
          <VolumeFull />
        </span>
      </a>
    </article>
  );
};
