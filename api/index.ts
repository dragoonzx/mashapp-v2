const APP_NAME = "MASHAPP";

export const getAuidusHost = async () => {
  const sample = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  const host = await fetch(`https://api.audius.co?app_name=${APP_NAME}`)
    .then((r) => r.json())
    .then((j) => j.data)
    .then((d) => sample(d));

  return host;
};

export const getTrendingTracks = async (host: string) => {
  const trendingTracks = await fetch(
    `${host}/v1/tracks/trending?app_name=${APP_NAME}`
  )
    .then((r) => r.json())
    .then((j) => j.data);

  return trendingTracks;
};

export const getTrack = async (host: string, trackId: string) => {
  const trendingTracks = await fetch(
    `${host}/v1/tracks/${trackId}?app_name=${APP_NAME}`
  )
    .then((r) => r.json())
    .then((j) => j.data);

  return trendingTracks;
};

export const getTrackStream = (host: string, trackId: string) => {
  return `${host}/v1/tracks/${trackId}/stream?app_name=${APP_NAME}`;
};
