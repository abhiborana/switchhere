export default function manifest() {
  return {
    name: "SwitchHere",
    short_name: "switchhere",
    start_url: "/",
    scope: "https://www.switchhere.vercel.app/",
    orientation: "any",
    display: "standalone",
    dir: "auto",
    lang: "en-US",
    description: "Switchhere - your career switch guide",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        sizes: "16x16",
        src: "/icon-16x16.png",
        type: "image/png",
      },
      {
        sizes: "32x32",
        src: "/icon-32x32.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "512x512",
        src: "/icon-512x512.png",
        type: "image/png",
      },
    ],
  };
}
