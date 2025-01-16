import type { CurrentMusic } from "@/store/playerStore.ts";
import type { Song } from "@/lib/data.ts";

/**
 * Hook para gestionar las canciones actuales en la lista de reproducción.
 * @param currentMusic Estado actual de la música (canción, playlist, etc.)
 */
export function useCurrentMusic(currentMusic: CurrentMusic) {
  /**
   * Obtiene el índice de la canción actual en la lista de canciones.
   * @returns Índice de la canción actual o -1 si no se encuentra.
   */
  const getCurrentSongIndex = (): number => {
    const { songs, song } = currentMusic;

    // Validación inicial para evitar errores
    if (!songs.length || !song) return -1;

    // Encuentra el índice de la canción actual
    return songs.findIndex(({ id }) => id === song.id);
  };

  /**
   * Obtiene la siguiente canción en la lista de reproducción.
   * @returns La siguiente canción o null si no hay más canciones.
   */
  const getNextSong = (): Song | null => {
    const { songs } = currentMusic;

    // Validación inicial
    if (!songs.length) return null;

    // Índice de la canción actual
    const currentIndex = getCurrentSongIndex();

    // Retorna a la primera cancion si ya está en la última canción
    if (currentIndex === -1 || currentIndex + 1 >= songs.length) return songs[0];
    
    return songs[currentIndex + 1];
  };

  /**
   * Obtiene la canción anterior en la lista de reproducción.
   * @returns La canción anterior o null si no hay más canciones.
   */
  const getPreviousSong = (): Song | null => {
    const { songs } = currentMusic;

    // Validación inicial
    if (!songs.length) return null;

    // Índice de la canción actual
    const currentIndex = getCurrentSongIndex();

    // Retorna a la ultima canción si ya está en la primera canción
    if (currentIndex <= 0) return songs[songs.length -1];

    return songs[currentIndex - 1];
  };

  return {
    getPreviousSong,
    getNextSong,
  };
}
