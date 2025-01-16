import { Play, Pause } from "@/icons/PlayerIcons";
import { usePlayerStore } from "@/store/playerStore";
import { getPlayListInfoById } from "../../services/ApiServices";

export function CardPlayButton({ id, size = "sm" }) {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state);

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist?.id === id;
  const isThisPlaylistInStore = currentMusic?.playlist?.id === id;

  const handleClick = () => {
    if (isThisPlaylistInStore) {
      setIsPlaying(!isPlaying);
      return;
    }

    getPlayListInfoById(id)
      .then((data) => {
        const { songs, playlist } = data;
        setCurrentMusic({ playlist: playlist, songs: songs, song: songs[0] });
      })
      .then(() => {
        setIsPlaying(true);
      });
  };

  const iconClassName = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <button
      onClick={handleClick}
      className="card-play-button rounded-full text-black bg-green-500 hover:bg-green-400 p-4 transition hover:scale-105 shadow-3xl"
    >
      {isPlayingPlaylist ? (
        <Pause className={iconClassName} />
      ) : (
        <Play className={iconClassName} />
      )}
    </button>
  );
}
