import { Next, Play, Prev, Pause } from "@/icons/PlayerIcons";
import { usePlayerStore } from "@/store/playerStore";
import { useCurrentMusic } from "../hooks/UseCurrentMusic";

interface Props {
  xl: boolean;
}

export function PlayerControl({ xl }: Props) {
  const { currentMusic, isPlaying, setCurrentMusic, setIsPlaying } =
    usePlayerStore((state) => state);
  const { getNextSong, getPreviousSong } = useCurrentMusic(currentMusic);

  const onPlayPause = () => {
    if (currentMusic.song === null) return;
    setIsPlaying(!isPlaying);
  };

  const onNextSong = () => {
    const nextSong = getNextSong();
    if (nextSong) {
      setCurrentMusic({ ...currentMusic, song: nextSong });
      setIsPlaying(true);
    }
  };

  const onPrevSong = () => {
    const prevSong = getPreviousSong();
    if (prevSong) {
      setCurrentMusic({ ...currentMusic, song: prevSong });
      setIsPlaying(true);
    }
  };

  const classPlay = xl ? "w-10 h-auto p-2" : "w-4 h-auto";
  const classNextPrev = xl ? "w-11 h-auto p-2" : "w-4 h-auto";

  return (
    <div className="flex gap-5 items-center justify-center">
      <button
        className=" hover:opacity-85 hover:scale-110"
        onClick={onPrevSong}
      >
        <Prev className={classNextPrev} />
      </button>
      <button
        className="bg-white text-black rounded-full p-2 hover:scale-110 hover:opacity-85"
        onClick={onPlayPause}
      >
        {isPlaying ? (
          <Pause className={classPlay} />
        ) : (
          <Play className={classPlay} />
        )}
      </button>
      <button
        className=" hover:opacity-85 hover:scale-110"
        onClick={onNextSong}
      >
        <Next className={classNextPrev} />
      </button>
    </div>
  );
}
