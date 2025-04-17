"use client";

import { getYoutubeResults } from "@/actions/external";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useSwitchStore from "@/store";
import { supabaseClient } from "@/supabase";
import { AlertTriangleIcon, CheckIcon, ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

const LearningPage = ({ params }) => {
  const { stepId } = use(params);
  const { push } = useRouter();
  const user = useSwitchStore((state) => state.user);
  const [status, setStatus] = useState("loading");
  const [videoStatus, setVideoStatus] = useState("loading");
  const [stepInfo, setStepInfo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);

  const fetchStepInfo = async () => {
    const { data, error } = await supabaseClient
      .from("roadmap_steps")
      .select("*")
      .eq("id", stepId)
      .eq("user_id", user.id)
      .single();
    if (error) {
      console.debug("Error fetching step info:", error);
      return;
    }
    setStepInfo(data);
    setStatus("success");
  };

  const fetchVideos = async () => {
    setVideoStatus("loading");
    const { data, error } = await supabaseClient
      .from("youtube")
      .select("*")
      .eq("step_id", stepId);
    if (error || !data.length) {
      console.debug("No videos found, fetching from YouTube API");
      const res = await getYoutubeResults(
        stepInfo?.youtubeSearchQuery ?? stepInfo?.title,
        10,
      );
      const videos = res.items
        .map((video) => ({
          title: video.snippet.title,
          description: video.snippet.description,
          videoId: video.id.videoId,
          step_id: stepId,
        }))
        .filter(
          (video, index, self) =>
            index === self.findIndex((v) => v.videoId === video.videoId) &&
            video.videoId,
        );
      const { error } = await supabaseClient
        .from("youtube")
        .insert(videos)
        .select();
      console.log("🚀 ~ SAVING VIDEOS TO SUPABASE ~ error:", error);
      setVideos(videos);
      setCurrentVideo(videos[0]);
    } else {
      setVideos(data);
      setCurrentVideo(data[0]);
    }
    setVideoStatus("success");
    // setStatus("success");
  };

  const handleMarkAsCompleted = async () => {
    const { error } = await supabaseClient
      .from("roadmap_steps")
      .update({ isCompleted: true })
      .eq("id", stepId)
      .eq("user_id", user.id);
    if (error) {
      console.debug("Error updating step:", error);
    } else {
      toast.success("Marked as completed!");
      await supabaseClient
        .from("continue_learning")
        .delete()
        .eq("step_id", stepId);
      push(`/roadmap/${stepInfo.roadmap_id}`);
    }
  };

  useEffect(() => {
    if (stepId && user) {
      fetchStepInfo();
    }
  }, [stepId, user]);

  useEffect(() => {
    if (stepInfo) {
      fetchVideos();
    }
  }, [stepInfo]);

  return status === "success" ? (
    <main className="flex flex-col gap-4 w-full h-full flex-1 overflow-auto">
      <div className="flex items-center flex-wrap justify-between gap-4 p-4">
        <div className="flex items-center gap-2">
          <Button variant={"outline"} asChild>
            <Link href={`/roadmap/${stepInfo.roadmap_id}`}>
              <ChevronLeftIcon />
            </Link>
          </Button>
          <h1 className="md:text-xl font-semibold">{stepInfo.title}</h1>
        </div>
        {stepInfo.isCompleted ? (
          <Button variant={"outline"} disabled>
            <CheckIcon className="size-4 text-green-500" />
            Completed
          </Button>
        ) : (
          <Button variant={"outline"} onClick={handleMarkAsCompleted}>
            <AlertTriangleIcon className="size-4 text-amber-500" />
            Mark as Completed
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {videoStatus == "success" ? (
          <div className="w-full h-full col-span-1 md:col-span-3 md:pl-4 flex flex-col">
            <div className="w-full aspect-video md:rounded-2xl overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${currentVideo?.videoId}`}
                title={currentVideo?.title}
                frameBorder="0"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="flex flex-col p-2">
              <p className="text-lg">{currentVideo?.title}</p>
              <p className="text-sm text-muted-foreground">
                {currentVideo?.description}
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full h-full col-span-1 md:col-span-3 md:pl-4 flex flex-col">
            <Skeleton className="w-full aspect-video md:rounded-2xl overflow-hidden"></Skeleton>
            <div className="flex flex-col gap-2 p-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        )}
        <div className="col-span-1 w-full flex flex-col gap-4">
          {videoStatus === "success" ? (
            videos.map((video) =>
              currentVideo?.videoId === video.videoId ? null : (
                <div
                  key={video.videoId}
                  className={
                    "flex flex-col w-full cursor-pointer shrink-0 hover:bg-neutral-100 rounded-md p-2 md:rounded-2xl"
                  }
                  onClick={() => setCurrentVideo(video)}
                >
                  <div className="w-full aspect-video relative rounded-xl overflow-hidden">
                    <Image
                      src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                      alt={video.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <p className="w-full text-sm line-clamp-2 p-1">
                    {video.title}
                  </p>
                </div>
              ),
            )
          ) : (
            <div className="flex flex-col gap-4 p-2">
              <Skeleton className="aspect-video w-full" />
              <Skeleton className="aspect-video w-full" />
              <Skeleton className="aspect-video w-full" />
            </div>
          )}
        </div>
      </div>
    </main>
  ) : status === "error" ? (
    <div>Error</div>
  ) : (
    <main className="flex flex-col gap-4 w-full p-4">
      <Skeleton className="h-8 w-1/2" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Skeleton className="aspect-video w-full col-span-1 md:col-span-3" />
        <div className="col-span-1 w-full flex flex-col gap-4">
          <Skeleton className="aspect-video w-full" />
          <Skeleton className="aspect-video w-full" />
          <Skeleton className="aspect-video w-full" />
        </div>
      </div>
    </main>
  );
};

export default LearningPage;
