import { Play, Pause } from "./Player";
import { usePlayerStore } from "@/store/playerStore";
export function CardPlayButton({ id }) {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state);
  // ! el boton desaparece si se reinicia la pagina y no hay una cancion elegida
  const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id;
  const handleClick = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }

    fetch(`/api/get-info.json?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { songs, playlist } = data;
        setIsPlaying(true);
        setCurrentMusic({ playlist, songs, song: songs[0] });
      });
  };

  return (
    <button
      onClick={handleClick}
      className="card-play-button rounded-full bg-green-500 hover:bg-green-400 p-4 hover:scale-105 shadow-3xl"
    >
      {isPlayingPlaylist ? <Pause /> : <Play />}
    </button>
  );
}
