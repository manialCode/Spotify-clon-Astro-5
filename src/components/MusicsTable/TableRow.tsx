import React, { useEffect, useState } from "react";
import { allPlaylists, songs, type Song } from "@/lib/data";
import { MusicsTablePlayButton } from "./MusicTablePlayButton";
import { PlayingSongIcon } from "@/icons/PlayingSongIcon";
import { usePlayerStore } from "@/store/playerStore";

interface TableRowProps {
  song: Song | any;
  index: number;
  isDisabled: boolean;
  isCurrentSong: (song: Song) => boolean;
  handleClick: (song: Song) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  song,
  index,
  isDisabled,
  isCurrentSong,
  handleClick,
}) => {
  const isCurrentSongBoolean = isCurrentSong(song);

  return (
    <tr
      key={`${song.albumId}-${song.id}`}
      className="text-gray-300 text-sm font-light tr-hover player:hover:bg-zinc-400/10 overflow-hidden transition-all duration-300 group"
      onClick={() => handleClick(song)}
    >
      <td className="relative td px-5 py-2 rounded-tl-lg rounded-bl-lg w-5">
        <span className="absolute top-5 opacity-100 transition-all group-hover:opacity-0">
          <div
            className={`absolute ${
              isCurrentSongBoolean ? "text-green-400" : "text-white"
            }`}
          >
            {isCurrentSongBoolean ? <PlayingSongIcon /> : index + 1}
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
          <img src={song.image} alt={song.title} className="w-11 h-11" />
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
};

export default TableRow;
