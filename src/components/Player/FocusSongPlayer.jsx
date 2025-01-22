import { usePlayerStore } from "@/store/playerStore";
import { useEffect, useRef } from "react";
import { useCurrentMusic } from "../hooks/UseCurrentMusic";
import { PlayerControl } from "./PlayerControl";
import { SongControl } from "./SongControl";

function FocusSongPlayer() {
  const { isPlaying, currentMusic, setCurrentMusic, volume } = usePlayerStore(
    (state) => state
  );
  const audioRef = useRef();
  const { getNextSong } = useCurrentMusic(currentMusic);

  useEffect(() => {
    if (!currentMusic.song) {
      return;
    }
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const { playlist, song } = currentMusic;
    if (song) {
      const audio = audioRef.current;
      if (audio.src !== `/music/${playlist?.id}/0${song.id}.mp3`) {
        audio.pause();
        audioRef.current.src = `/music/${playlist?.id}/0${song.id}.mp3`;
        play();
      }
    }
  }, [currentMusic]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const play = () => {
    if (audioRef.current.play() !== undefined)
      audioRef.current.play().catch((e) => console.log("error playing: ", e));
  };
  function onNextSong() {
    const nextSong = getNextSong();
    if (nextSong) setCurrentMusic({ ...currentMusic, song: nextSong });
  }
  return (
    <div className="grid place-content-center gap-4 flex-1  ">
      <div className="flex justify-center flex-col items-center ">
        {/* TimeLine */}
        <SongControl audio={audioRef} />
        <PlayerControl xl={true} />
        <audio ref={audioRef} onEnded={onNextSong} />
      </div>
    </div>
  );
}

export default FocusSongPlayer;
