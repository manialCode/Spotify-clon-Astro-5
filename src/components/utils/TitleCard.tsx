import { usePlayerStore } from "@/store/playerStore";

interface Props {
  title: String;
  albumId: Number;
}

export const TitleCard = ({ title, albumId }: Props) => {
  const { playlist } = usePlayerStore((state) => state.currentMusic);
  const curretAlbum = albumId == playlist?.albumId;

  return (
    <h4
      className={`text-sm ${
        curretAlbum ? "text-sm text-green-500" : "text-sm text-white"
      }`}
    >
      {title}
    </h4>
  );
};
