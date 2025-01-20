import React, { useEffect, useState } from "react";
import { usePlayerStore } from "@/store/playerStore";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import { allPlaylists, type Song } from "@/lib/data";

interface Props {
  songs: Song[];
}

export const MusicsTable: React.FC<Props> = ({ songs }) => {
  const { currentMusic, setCurrentMusic, setIsPlaying } = usePlayerStore(
    (state) => state
  );

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
    <table className="table-auto text-left min-w-full player:divide-y player:divide-gray-500/20">
      <TableHeader />
      <tbody>
        <tr className="h-[16px]"></tr>
        {songs.map((song, index) => (
          <TableRow
            key={song.id}
            song={song}
            index={index}
            isDisabled={isDisabled}
            isCurrentSong={isCurrentSong}
            handleClick={handleClick}
          />
        ))}
      </tbody>
    </table>
  );
};
