import { Play, Pause } from "@/icons/PlayerIcons";
import { usePlayerStore } from "@/store/playerStore";
import { getPlayListInfoById } from "../../services/ApiServices";

export function CardPlayButton({ id, size = "sm", bg = "green" }) {
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

  const iconClassName = size === "sm" ? "w-4 h-4" : "m-[0.17rem] w-5 h-5";
  const btnClassName =
    bg === "non"
      ? "bg-transparent text-white hover:scale-110"
      : "text-black bg-green-500 hover:bg-green-400 hover:scale-105";
  return (
    <button
      id="play-button"
      onClick={handleClick}
      className={`group relative card-play-button rounded-full p-4 transition  shadow-3xl ${btnClassName}`}
    >
      {isPlayingPlaylist ? (
        <Pause className={iconClassName} />
      ) : (
        <Play className={iconClassName} />
      )}
      <span class="absolute -left-2 top-[3.8rem] w-max px-2 py-1 bg-zinc-800/80 text-white text-xs rounded -translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition duration-300 player:inline hidden">
        Reproducir
      </span>
    </button>
  );
}
