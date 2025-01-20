import { type Song, allPlaylists } from "@/lib/data";
import { TimeIcon } from "@/icons/MusicsTableIcons";
import { MusicsTablePlayButton } from "./MusicTablePlayButton";
import { usePlayerStore } from "@/store/playerStore";
import { PlayingSongIcon } from "@/icons/PlayingSongIcon";
import { useEffect, useState } from "react";

interface Props {
  songs: Song[];
}

export const MusicsTable = ({ songs }: Props) => {
  const { currentMusic, isPlaying, setCurrentMusic, setIsPlaying } =
    usePlayerStore((state) => state);

  const isCurrentSong = (song: Song) => {
    return (
      currentMusic.song?.id === song.id &&
      currentMusic.playlist?.albumId === song.albumId
    );
  };

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDisabled(window.innerWidth > 800); // 50em = 800px
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = (song: Song) => {
    if (!isDisabled) {
      setCurrentMusic({
        playlist: allPlaylists[song.albumId - 1],
        song,
        songs,
      });
      setIsPlaying(true);
    }
  };

  return (
    <table className="table-auto text-left min-w-full player:divide-y  player:divide-gray-500/20">
      <thead className="opacity-0 player:opacity-100 ">
        <tr className="text-gray-300 text-base">
          <th className="th px-4 py-2 font-light">#</th>
          <th className="px-4 py-2 font-light">Título</th>
          <th className="album-i th py-2 font-light">Álbum</th>
          <th className="  text-center px-4  py-2 font-light">
            <TimeIcon />
          </th>
        </tr>
      </thead>

      <tbody>
        <tr className="h-[16px]"></tr>
        {songs.map((song, index) => {
          const isCurrentSongBoolean = isCurrentSong(song);
          return (
            <tr
              key={`{song.albumId}-${song.id}`}
              className="text-gray-300 text-sm font-light hover:bg-zinc-400/10 overflow-hidden transition-all duration-300 group"
              onClick={() => handleClick(song)}
            >
              <td className="relative td px-5 py-2 rounded-tl-lg rounded-bl-lg w-5">
                <span className="absolute top-5 opacity-100 transition-all group-hover:opacity-0">
                  <div
                    className={`absolute ${
                      isCurrentSongBoolean ? "text-green-400" : "text-white"
                    }`}
                  >
                    {isCurrentSongBoolean && isPlaying ? (
                      <PlayingSongIcon />
                    ) : (
                      index + 1
                    )}
                  </div>
                </span>
                <div className="absolute top-5 opacity-0 transition-all group-hover:opacity-100">
                  <MusicsTablePlayButton
                    song={song}
                    isCurrentSong={isCurrentSongBoolean}
                  />
                </div>
              </td>
              {/* Información de la canción */}
              <td className="px-4 py-2 flex gap-3">
                <picture>
                  <img
                    src={song.image}
                    alt={song.title}
                    className="w-11 h-11"
                  />
                </picture>
                <div className="flex flex-col">
                  <h3
                    className={`text-base font-normal hover:underline ${
                      isCurrentSongBoolean ? "text-green-400" : "text-white"
                    }`}
                  >
                    {song.title}
                  </h3>
                  <span className="group-hover:text-white hover:underline font-extralight">
                    {song.artists.join(" • ")}
                  </span>
                </div>
              </td>
              {/* Álbum */}
              <td className="td">
                <span className="group-hover:text-white hover:underline font-light text-base">
                  {song.album}
                </span>
              </td>
              {/* Duración */}
              <td className="player:text-left text-right px-4 py-2 player:rounded-tr-lg player:rounded-br-lg">
                <span>{isDisabled ? song.duration : "..."}</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
