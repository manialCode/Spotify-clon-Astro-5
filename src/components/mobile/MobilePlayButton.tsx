import { Play, Pause } from "@/icons/PlayerIcons";
import { usePlayerStore } from "@/store/playerStore";

export const MobilePlayButton = () => {
  const { isPlaying, setIsPlaying } = usePlayerStore((state) => state);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  const className = "hover:scale-125 w-5 h-5";

  return (
    <button className="text-white" onClick={handleClick}>
      {isPlaying ? (
        <Pause className={className} />
      ) : (
        <Play className={className} />
      )}
    </button>
  );
};
