import { Next, Play, Prev, Pause } from "@/icons/PlayerIcons";
import { usePlayerStore } from "@/store/playerStore";
import { useCurrentMusic } from "../hooks/UseCurrentMusic";

export function PlayerControl() {
  const { currentMusic, isPlaying, setCurrentMusic, setIsPlaying } =
    usePlayerStore((state) => state);
  const { getNextSong, getPreviousSong } = useCurrentMusic(currentMusic);

  const onPlayPause = () => {
    if (currentMusic.song === null) return;
    setIsPlaying(!isPlaying);
  };

  const onNextSong = () => {
    const nextSong = getNextSong();
    if (nextSong) setCurrentMusic({ ...currentMusic, song: nextSong });
  };

  const onPrevSong = () => {
    const prevSong = getPreviousSong();
    if (prevSong) setCurrentMusic({ ...currentMusic, song: prevSong });
  };

  return (
    <div className="flex gap-5 items-center justify-center">
      <button
        className=" hover:opacity-85 hover:scale-110"
        onClick={onPrevSong}
      >
        <Prev />
      </button>
      <button
        className="bg-white text-black rounded-full p-2 hover:scale-110 hover:opacity-85"
        onClick={onPlayPause}
      >
        {isPlaying ? <Pause className="sm" /> : <Play className="sm" />}
      </button>
      <button
        className=" hover:opacity-85 hover:scale-110"
        onClick={onNextSong}
      >
        <Next />
      </button>
    </div>
  );
}
