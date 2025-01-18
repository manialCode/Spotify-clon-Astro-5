import { type Song } from "@/lib/data";
import { usePlayerStore } from "@/store/playerStore";

import { MusicsTablePlayButton } from "../MusicsTable/MusicTablePlayButton";

const MobileCard = () => {
  const { song, playlist } = usePlayerStore((state) => state.currentMusic);
  const bg = playlist?.color.dark;

  return (
    <a
      className={`flex items-center gap-5 overflow-hidden justify-between rounded-lg h-[4.2rem]`}
      style={{ backgroundColor: bg ? bg : "#27272a" }}
    >
      <div className="flex items-center gap-5">
        <picture className="w-16 h-16 p-1 aspect-square overflow-hidden">
          <img
            src={song?.image}
            className="rounded"
            alt={`Cover of ${song?.title}`}
          />
        </picture>
        <div className="flex  flex-col text-left">
          <h3 className="font-semibold text-sm block">{song?.title}</h3>
          <span className="opacity-80 text-xs">
            {song?.artists ? song?.artists?.join(" • ") : "No album or artist?"}
          </span>
        </div>
      </div>
      <div className="mr-5">
        {song && <MusicsTablePlayButton song={song} />}
      </div>
    </a>
  );
};

export { MobileCard };
