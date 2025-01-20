import React from "react";
import { HeartOutline } from "@/icons/Heart";
import { MobilePlayButton } from "./MobilePlayButton";
import type { Song } from "@/lib/data";

interface CardActionsProps {
  song: Song | any;
}

const CardActions: React.FC<CardActionsProps> = ({ song }) => {
  return (
    <div className="mx-4 flex gap-6">
      {song && <HeartOutline />}
      {song && <MobilePlayButton />}
    </div>
  );
};

export default CardActions;
