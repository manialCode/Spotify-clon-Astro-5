import { useEffect, useState } from "react";
import { Slider, White } from "../utils/Slider";

export const SongControl = ({ audio }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!audio.current) return;

    // Función para actualizar el tiempo actual
    const handleTimeUpdate = () => {
      setCurrentTime(audio.current.currentTime);
    };

    // Función para actualizar la duración
    const handleLoadedMetadata = () => {
      setDuration(audio.current.duration);
    };

    // Escucha los eventos
    const audioElement = audio.current;
    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);

    // Cleanup al desmontar el componente
    return () => {
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [audio]);

  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSliderChange = (value) => {
    const [newCurrentTime] = value;
    if (audio.current) {
      audio.current.currentTime = newCurrentTime;
      setCurrentTime(newCurrentTime);
    }
  };

  return (
    <div>
      <div className="player:flex gap-x-3 pt-2 hidden">
        <span className="opacity-60 w-12 text-right text-sm font-light">
          {formatTime(currentTime)}
        </span>
        <Slider
          defaultValue={[0]}
          max={duration}
          min={0}
          className="w-96"
          value={[currentTime]}
          onValueChange={handleSliderChange}
        />
        <span className="opacity-60 w-12 text-sm font-light">
          {formatTime(duration)}
        </span>
      </div>
      <div className=" player:hidden gap-3 pt-2 flex flex-col items-center mx-1 w-[65vw]">
        <White
          defaultValue={[0]}
          max={duration}
          min={0}
          value={[currentTime]}
          className="w-full "
          onValueChange={handleSliderChange}
        />
        <div className="flex justify-between w-full">
          <span className="opacity-60 w-12 text-left text-sm font-light">
            {formatTime(currentTime)}
          </span>
          <span className="opacity-60 w-12 text-sm font-light text-right">
            {formatTime(duration)}
          </span>
        </div>{" "}
      </div>
    </div>
  );
};
