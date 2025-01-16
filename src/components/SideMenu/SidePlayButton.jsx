import { Play, Pause } from "@/icons/PlayerIcons";
import { usePlayerStore } from "@/store/playerStore";
import { getPlayListInfoById } from "../../services/ApiServices";

export function SidePlayButton({ id }) {
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
  const className = "hover:scale-125";

  return (
    <button className="text-white" onClick={() => handleClick()}>
      {isPlaying ? (
        <Pause className={className} />
      ) : (
        <Play className={className} />
      )}
    </button>
  );
}
