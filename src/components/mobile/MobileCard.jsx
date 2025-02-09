import { useRef } from "react";
import { usePlayerStore } from "@/store/playerStore";
import CardHeader from "@/components/mobile/CardHeader";
import CardActions from "@/components/mobile/CardActions";

export const MobileCard = () => {
  const { currentMusic } = usePlayerStore((state) => state);
  const { playlist, song } = currentMusic;
  const bg = playlist?.color.dark;

  const cardRef = useRef();

  return (
    <div
      ref={cardRef}
      style={{ backgroundColor: bg ? bg : "#27272a" }}
      className="rounded-lg cursor-grab flex flex-col  "
    >
      <div className="flex items-center p-1 gap-5 relative overflow-hidden justify-between w-full">
        <CardHeader song={song} playlist={playlist} />
        <CardActions song={song} />
      </div>
    </div>
  );
};
