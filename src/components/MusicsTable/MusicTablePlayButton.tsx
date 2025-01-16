import { type Song } from "@/lib/data";
import { Play, Pause } from "@/icons/PlayerIcons";
import { usePlayerStore, type CurrentMusic } from "@/store/playerStore";
import { getPlayListInfoById } from "../../services/ApiServices";

interface Props {
  song: Song;
  isCurrentSong?: boolean;
}

const isForeignSong = (currentMusic: CurrentMusic, song: Song) => {
  return currentMusic.playlist?.id != song.albumId.toString();
};

const setForeignSong = (
  song: Song,
  setIsPlaying: (isPlaying: boolean) => void,
  setCurrentMusic: (currentMusic: CurrentMusic) => void
): void => {
  getPlayListInfoById(song.albumId)
    .then((data) => {
      const { songs, playlist } = data;
      setCurrentMusic({ playlist: playlist, songs: songs, song: song });
    })
    .then(() => setIsPlaying(true));
};

export const MusicsTablePlayButton = ({
  song,
  isCurrentSong = false,
}: Props) => {
  const { setCurrentMusic, setIsPlaying, currentMusic, isPlaying } =
    usePlayerStore((state) => state);

  const isCurrentSongPlaying = (song: Song) => {
    const result =
      currentMusic.song?.id == song.id &&
      currentMusic.playlist?.albumId == song.albumId &&
      isPlaying;

    return result;
  };

  const handleClick = (song: Song) => {
    if (isCurrentSongPlaying(song)) {
      setIsPlaying(false);
      return;
    }

    if (isForeignSong(currentMusic, song)) {
      setForeignSong(song, setIsPlaying, setCurrentMusic);
      return;
    }

    if (currentMusic.song?.id !== song.id) {
      setCurrentMusic({
        songs: currentMusic.songs,
        playlist: currentMusic.playlist,
        song: song,
      });
    }
    setIsPlaying(true);
  };

  const className = "hover:scale-125";

  return (
    <button className="text-white" onClick={() => handleClick(song)}>
      {isCurrentSongPlaying(song) && isCurrentSong ? (
        <Pause className={className} />
      ) : (
        <Play className={className} />
      )}
    </button>
  );
};
