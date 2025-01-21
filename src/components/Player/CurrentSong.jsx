export const CurrentSong = ({ image, title, artists }) => {
  return (
    <div className={`flex items-center gap-5 relative overflow-hidden`}>
      <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
        <img src={image} alt={title} loading="lazy" />
      </picture>
      <div className="flex  flex-col">
        <h3 className="font-semibold text-sm block">
          {title ? title : "No song"}
        </h3>
        <span className="opacity-80 text-xs">
          {artists ? artists?.join(" • ") : "No album or artist?"}
        </span>
      </div>
    </div>
  );
};
