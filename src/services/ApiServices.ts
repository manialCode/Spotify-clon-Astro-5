export function getPlayListInfoById(playListId: number) {
  return fetch(`/api/get-info.json?id=${playListId}`)
    .then(res => res.json())
}