import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata = {
  generator: "Next.js",
  applicationName: "Switchhere",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  referrer: "no-referrer-when-downgrade",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  title: "Switchhere - your career switch guide",
  description:
    "Switchhere helps people switch or upgrade their careers through personalized, AI-generated roadmaps, with real-time coaching, progress-tracking, and best learning resources online.",
  keywords: [
    "career switch",
    "career upgrade",
    "AI-generated roadmap",
    "real-time coaching",
    "progress tracking",
    "learning resources",
    "personalized learning",
    "career development",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "antialiased flex flex-col relative w-screen h-dvh overflow-hidden scroll-smooth",
          geist.className,
        )}
        cz-shortcut-listen="true"
      >
        {children}
        <Toaster richColors position="top-center" theme="light" />
      </body>
    </html>
  );
}
