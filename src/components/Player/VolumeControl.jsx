import {
  VolumeFull,
  VolumeLow,
  VolumeMedium,
  VolumeSilenced,
} from "@/icons/VolumeIcons";
import { usePlayerStore } from "@/store/playerStore"; // estado global
import { useRef } from "react";
import { Slider } from "@/components/utils/Slider";

export const VolumeControl = () => {
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

  const volumeIcon = (v) => {
    if (v == 0) return <VolumeSilenced />;
    else if (v < 0.25) return <VolumeLow />;
    else if (v < 0.5) return <VolumeMedium />;
    else return <VolumeFull />;
  };

  return (
    <div className="flex justify-center gap-x-2 group ">
      <button
        onClick={handleVolume}
        className="opacity-70 group-hover:opacity-100 transition"
      >
        {volumeIcon(volume)}
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
