export const maxDuration = 30;

export async function POST(req) {
  // Create a metadata scraper for a URL withouty  using a library
  const { url } = await req.json();
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    },
  });
  const html = await response.text();
  let meta;
  try {
    meta = {
      title: html.match(/<title>(.*?)<\/title>/)[1],
      description: html.match(/<meta name="description" content="(.*?)"/)[1],
      image: html.match(/<meta property="og:image" content="(.*?)"/)[1],
    };
  } catch (error) {
    console.error("Error parsing HTML:", error);
    meta = {
      title: "Error parsing HTML",
      description: "Error parsing HTML",
      image: null,
    };
  }
  return Response.json(meta);
}
