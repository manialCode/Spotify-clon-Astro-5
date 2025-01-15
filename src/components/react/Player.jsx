import { usePlayerStore } from "@/store/playerStore"; // estado global
import { Slider } from "./Slider";
import { useEffect, useRef, useState } from "react";
import { VolumeFull, VolumeSilenced } from "@/icons/VolumeIcons";

export const Pause = () => (
  <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16">
    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
  </svg>
);

export const Play = () => (
  <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16">
    <path d="M3 1.713a.7.7 0 0 1 1.105-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.105 14.894a.7.7 0 0 1-1.105-.607V1.713z"></path>
  </svg>
);

const CurrentSong = ({ image, title, artists }) => {
  return (
    <div className={`flex items-center gap-5 relative overflow-hidden`}>
      <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
        <img src={image} alt={title} />
      </picture>
      <div className="flex  flex-col">
        <h3 className="font-semibold text-sm block">
          {title ? title : "No song"}
        </h3>
        <span className="opacity-80 text-xs">
          {artists ? artists?.join(" • ") : "No album or artist?🥺"}
        </span>
      </div>
    </div>
  );
};

// volume control
const VolumeControl = () => {
  const volume = usePlayerStore((state) => state.volume);
  const setVolume = usePlayerStore((state) => state.setVolume);
  const previousVolRef = useRef(volume);

  const isVolumeSilence = volume < 0.1;
  const handleVolume = () => {
    if (isVolumeSilence) setVolume(previousVolRef.current);
    else {
      previousVolRef.current = volume;
      setVolume(0);
    }
  };

  return (
    <div className="flex justify-center gap-x-2 group ">
      <button
        onClick={handleVolume}
        className="opacity-70 group-hover:opacity-100 transition"
      >
        {volume < 0.1 ? <VolumeSilenced /> : <VolumeFull />}
      </button>
      <Slider
        defaultValue={[100]}
        max={100}
        min={0}
        className="w-[95px] "
        value={[volume * 100]}
        onValueChange={(value) => {
          const [newVolume] = value;
          const volumeV = newVolume / 100;
          setVolume(volumeV);
        }}
      />
    </div>
  );
};

// SongControl
const SongControl = ({ audio }) => {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    audio.current.addEventListener("timeupdate", handleTimeUpdate);
    setCurrentTime(audio.current.currentTime);
    return () => {
      audio.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  });

  const handleTimeUpdate = () => {
    setCurrentTime(audio.current.currentTime);
  };

  const formatTime = (time) => {
    if (time == null) return `00:00`;
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const duration = audio?.current?.duration ?? 0;

  return (
    <div className="flex  gap-x-3 pt-2">
      <span className="opacity-60 w-12 text-right text-sm font-light">
        {formatTime(currentTime)}
      </span>
      <Slider
        defaultValue={[0]}
        max={audio?.current?.duration ?? 0}
        min={0}
        className="w-[400px] "
        value={[currentTime]}
        onValueChange={(value) => {
          audio.current.currentTime = value;
        }}
      />
      <span className="opacity-60 w-12 text-sm font-light">
        {duration ? formatTime(duration) : "0:00"}
      </span>
    </div>
  );
};

// Player component
export function Player() {
  const { isPlaying, setIsPlaying, currentMusic, volume } = usePlayerStore(
    (state) => state
  );
  const audioRef = useRef();

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const { playlist, songs, song } = currentMusic;
    if (song) {
      const src = `/music/${playlist?.id}/0${song.id}.mp3`;

      audioRef.current.src = src;
      audioRef.current.volume = volume;
      audioRef.current.play();
    }
  }, [currentMusic]);
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
          <button
            className="bg-white rounded-full p-2 hover:scale-110 hover:opacity-85"
            onClick={handleClick}
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>

          {/* TimeLine */}
          <SongControl audio={audioRef} />
        </div>
        <audio ref={audioRef} />
      </div>

      {/* slider */}
      <div className="grid place-content-center">
        <VolumeControl />
      </div>
    </div>
  );
}
