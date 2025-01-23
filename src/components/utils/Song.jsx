import { usePlayerStore } from "@/store/playerStore";

const SongC = () => {
  const { song } = usePlayerStore((state) => state.currentMusic);
  const { title, artists } = song;
  const artistsString = artists.join(",");

  return (
    <section className="flex flex-auto flex-col mb-4">
      <h4 className="text-white hover:underline font-bold text-lg">{title}</h4>
      <span className="text-xs text-gray-400 hover:underline text-semibold">
        {artistsString}
      </span>
    </section>
  );
};

export default SongC;
