import { MusicsTablePlayButton } from "@/components/MusicsTable/MusicTablePlayButton";
import { TitleCard } from "@/components/utils/TitleCard";
import { usePlayerStore } from "@/store/playerStore";
import type { Playlist } from "@/lib/data";
import { VolumeFull } from "@/icons/VolumeIcons";

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
    <a
      href={`/playlist/${id}`}
      className="group playlist-item flex relative p-2 overflow-hidden items-center gap-2 rounded-md hover:bg-zinc-800"
    >
      {/* Botón para reproducir música */}
      {currentSong && (
        <div className="absolute top-[1.5rem] left-6 opacity-0 transition-all group-hover:opacity-100 z-10">
          <MusicsTablePlayButton song={currentSong} isCurrentSong={isCurrent} />
        </div>
      )}
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
  );
};
