import { useEffect, useRef } from "react";

import { CurrentSong } from "./CurrentSong";
import { VolumeControl } from "./VolumeControl";
import { SongControl } from "./SongControl";
import { PlayerControl } from "./PlayerControl";

import { useCurrentMusic } from "../hooks/UseCurrentMusic";
import { usePlayerStore } from "@/store/playerStore"; // estado global

// Player component
export function Player() {
  const { isPlaying, setIsPlaying, currentMusic, volume } = usePlayerStore(
    (state) => state
  );
  const audioRef = useRef();
  const { getNextSong } = useCurrentMusic(currentMusic);

  useEffect(() => {
    if (!currentMusic.song) {
      return;
    }
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const { playlist, song } = currentMusic;
    if (song) {
      const audio = audioRef.current;
      audio.pause();
      audioRef.current.src = `/music/${playlist?.id}/0${song.id}.mp3`;
      play();
    }
  }, [currentMusic]);

  const play = () => {
    if (audioRef.current.play() !== undefined)
      audioRef.current.play().catch((e) => console.log("error playing: ", e));
  };

  // todo:random index function
  function onNextSong() {
    const nextSong = getNextSong();
    if (nextSong) setCurrentMusic({ ...currentMusic, song: nextSong });
  }

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };
  return (
    <div className="flex flex-row justify-between items-center w-full px-2 z-50">
      {/* Current song preview */}
      <div className="w-[200px]">
        <CurrentSong {...currentMusic.song} />
      </div>

      {/* PlayButton */}
      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center flex-col items-center">
          <PlayerControl />

          {/* TimeLine */}
          <SongControl audio={audioRef} />
        </div>
        <audio ref={audioRef} onEnded={onNextSong} />
      </div>

      {/* Volume slider */}
      <div className="grid place-content-center">
        <VolumeControl />
      </div>
    </div>
  );
}
