import type { Song, Playlist } from "@/lib/data";
import { useCurrentMusic } from "../hooks/UseCurrentMusic";
import { usePlayerStore } from "@/store/playerStore";
import { useRef } from "react";

interface CardHeaderProps {
  song: Song | any;
  playlist: Playlist | any;
}

const CardHeader: React.FC<CardHeaderProps> = ({ song, playlist }) => {
  const { currentMusic, setCurrentMusic, setIsPlaying } = usePlayerStore(
    (state) => state
  );
  const { getNextSong, getPreviousSong } = useCurrentMusic(currentMusic);

  const cardRef = useRef<HTMLDivElement>(null);
  const DECISION_THRESHOLD = 50; // Límite para decidir si avanzar o regresar.
  let pullDeltaX = 0;
  let startX = 0;
  let isAnimating = false;

  // Función para iniciar el drag
  const startDrag = (event: React.MouseEvent | React.TouchEvent) => {
    if (isAnimating) return; // Evita interferir si ya está animando.

    const actualCard = cardRef.current;
    if (!actualCard) return;

    startX = "touches" in event ? event.touches[0].pageX : event.pageX;

    const onMove = (e: MouseEvent | TouchEvent) => {
      const currentX = "touches" in e ? e.touches[0].pageX : e.pageX;
      pullDeltaX = currentX - startX;
      const opacity = Math.abs(pullDeltaX) / 100;

      // Solo aplica transformación si hay movimiento.
      if (pullDeltaX !== 0) {
        actualCard.style.transform = `translateX(${pullDeltaX}px)`;
        actualCard.style.opacity = `${1 - opacity}`;
      }
    };

    const onEnd = () => {
      // Finaliza y evalúa si se debe cambiar la canción.
      const decisionMade = Math.abs(pullDeltaX) >= DECISION_THRESHOLD;

      if (decisionMade) {
        const goNext = pullDeltaX < 0;
        actualCard.style.transition = "transform 0.3s ease";
        actualCard.style.transform = `translateX(${goNext ? "-200%" : "200%"})`;

        actualCard.addEventListener("transitionend", () => {
          const nextSong = goNext ? getNextSong() : getPreviousSong();

          if (nextSong) {
            setCurrentMusic({ ...currentMusic, song: nextSong });
            setIsPlaying(true);
          }

          // Reinicia el estado de la tarjeta.
          actualCard.style.transition = "none";
          actualCard.style.transform = "translateX(0)";
          actualCard.style.opacity = "1";
          pullDeltaX = 0;
          isAnimating = false;
        });
      } else {
        // Si no se supera el umbral, regresa la tarjeta a la posición inicial.
        actualCard.style.transition = "transform 0.3s ease";
        actualCard.style.transform = "translateX(0)";
        actualCard.addEventListener("transitionend", () => {
          actualCard.style.transition = "";
          pullDeltaX = 0;
          isAnimating = false;
        });
      }

      // Elimina los listeners después del evento.
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onEnd);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onEnd);
    document.addEventListener("touchmove", onMove, { passive: true });
    document.addEventListener("touchend", onEnd, { passive: true });
  };
  return (
    <a
      href={`/playlist/${playlist?.albumId}/song/${song?.id}`}
      className="w-full cursor-grab"
    >
      <div
        ref={cardRef}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        className="card-content flex items-center gap-3"
      >
        <picture className="w-14 h-14 p-1 aspect-square overflow-hidden">
          <img
            src={song?.image}
            className="rounded"
            alt={`Cover of ${song?.title}`}
            loading="lazy"
          />
        </picture>
        <div className="flex flex-col text-left">
          <h3 className="font-semibold text-sm block">{song?.title}</h3>
          <span className="opacity-80 text-xs">
            {song?.artists ? song?.artists?.join(" • ") : "No album or artist?"}
          </span>
        </div>
      </div>
    </a>
  );
};

export default CardHeader;
