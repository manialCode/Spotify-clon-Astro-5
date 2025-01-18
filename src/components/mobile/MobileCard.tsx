import { usePlayerStore } from "@/store/playerStore";

import { MobilePlayButton } from "./MobilePlayButton";

const MobileCard = () => {
  const { currentMusic, setCurrentMusic, isPlaying, setIsPlaying } =
    usePlayerStore((state) => state);
  const { playlist, song } = currentMusic;
  const bg = playlist?.color.dark;

  return (
    <div
      style={{ backgroundColor: bg ? bg : "#27272a" }}
      className="flex items-center gap-5 relative overflow-hidden justify-between rounded-lg h-[4.2rem]"
    >
      <a
        href={`/playlist/${playlist?.albumId}/song/${song?.id}`}
        className="w-full"
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
              {song?.artists
                ? song?.artists?.join(" • ")
                : "No album or artist?"}
            </span>
          </div>
        </div>
      </a>
      <div className="mr-5 z-10 absolute right-2 bottom-[1.15rem]">
        {song && <MobilePlayButton />}
      </div>
    </div>
  );
};

export { MobileCard };
