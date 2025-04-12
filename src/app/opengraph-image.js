import Image from "next/image";
import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div className="relative flex w-full h-full items-center justify-center bg-white">
        <Image src="/logo.png" fill className="object-cover" />
      </div>
    ),
  );
}
