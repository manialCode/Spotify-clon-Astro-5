import { type Song } from "@/lib/data";
import { TimeIcon } from "@/icons/MusicsTableIcons";
import { MusicsTablePlayButton } from "./MusicTablePlayButton";
import { usePlayerStore } from "@/store/playerStore";

interface Props {
  songs: Song[];
}

export const MusicsTable = ({ songs }: Props) => {
  const { currentMusic } = usePlayerStore((state) => state);

  const isCurrentSong = (song: Song) => {
    return (
      currentMusic.song?.id === song.id &&
      currentMusic.playlist?.albumId === song.albumId
    );
  };

  return (
    <table className="table-auto text-left min-w-full divide-y divide-gray-500/20">
      <thead className="">
        <tr className="text-gray-300 text-base">
          <th className="px-4 py-2 font-light">#</th>
          <th className="px-4 py-2 font-light">Título</th>
          <th id="album-th" className="album-i  py-2 font-light">
            Álbum
          </th>
          <th className=" player:text-center px-4  py-2 font-light">
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
              className="text-gray-300 text-sm font-light hover:bg-white/10 overflow-hidden transition duration-300 group"
            >
              <td className="relative px-5 py-2 rounded-tl-lg rounded-bl-lg w-5">
                <span className="absolute top-5 opacity-100 transition-all group-hover:opacity-0">
                  {index + 1}
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
              <td>
                <span
                  id="album-td"
                  className="group-hover:text-white hover:underline font-light text-base"
                >
                  {song.album}
                </span>
              </td>
              {/* Duración */}
              <td className="px-4 py-2 rounded-tr-lg rounded-br-lg">
                <span>{song.duration}</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
