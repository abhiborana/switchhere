"use server";

export const getYoutubeResults = async (query, results = 5) => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${process.env.GOOGLE_CONSOLE_API}&limit=${results}&maxResults=${results}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
