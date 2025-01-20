import type { Song, Playlist } from "@/lib/data";

interface CardHeaderProps {
  song: Song | any;
  playlist: Playlist | any;
}

const CardHeader: React.FC<CardHeaderProps> = ({ song, playlist }) => {
  return (
    <a
      href={`/playlist/${playlist?.albumId}/song/${song?.id}`}
      className="w-full cursor-grab"
    >
      <div className="flex items-center gap-3 card-content">
        <picture className="w-14 h-14 p-1 aspect-square overflow-hidden">
          <img
            src={song?.image}
            className="rounded"
            alt={`Cover of ${song?.title}`}
          />
        </picture>
        <div className="flex flex-col text-left">
          <h3 className="font-semibold text-sm block">{song?.title}</h3>
          <span className="opacity-80 text-xs">
            {song?.artists ? song?.artists?.join(" • ") : "No album or artist?"}
          </span>
        </div>
      </div>
    </a>
  );
};

export default CardHeader;
