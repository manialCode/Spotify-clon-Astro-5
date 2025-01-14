import { allPlaylists, songs as allSongs } from "@/lib/data";

export async function GET({ params, request }) {
  // get the id from the url search params
  const { url } = request;
  const urlObject = new URL(url);
  const id = urlObject.searchParams.get("id");

  const playlist = allPlaylists.find((playlist) => playlist.id === id);
  const songs = allSongs.filter((song) => song.albumId === playlist?.albumId);

  // todo: buscar una manera de poner un estado por default a la musica
  // ? Buscar como guardar la ultima cancion escuchada o en su defecto un fallback para evitar errores
  return new Response(JSON.stringify({ playlist, songs }), {
    headers: { "content-type": "application/json" },
  });
}
