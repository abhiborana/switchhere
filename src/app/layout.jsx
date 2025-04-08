import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata = {
  title: "Switchhere - AI career switch coach",
  description:
    "Switchhere helps people pivot or upgrade their careers through hyper-personalized, AI-generated roadmaps — built uniquely for them, with real-time coaching, skill-tracking, and job-focused outcomes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "antialiased flex flex-col relative w-screen h-dvh overflow-hidden",
          geist.className,
        )}
        cz-shortcut-listen="true"
      >
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
