"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useSwitchStore from "@/store";
import { supabaseClient } from "@/supabase";
import { getLinkPreview } from "link-preview-js";
import {
  BookOpenIcon,
  CheckIcon,
  ChevronLeftIcon,
  ExternalLinkIcon,
  GlobeIcon,
  TriangleAlertIcon,
  VideoIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

const LearningPage = ({ params }) => {
  const { stepId } = use(params);
  const { push } = useRouter();
  const user = useSwitchStore((state) => state.user);
  const [resources, setResources] = useState([]);
  const [stepInfo, setStepInfo] = useState(null);

  const getResourcesAndAddMeta = async () => {
    const { data, error } = await supabaseClient
      .from("resources")
      .select("*, roadmap_steps(*)")
      .eq("step_id", stepId);

    if (error) {
      console.error("Error fetching resources:", error);
      return;
    }

    const resourcesWithMeta = await Promise.all(
      data.map(async (resource) => {
        try {
          const { url } = resource;
          if (url.includes("youtube"))
            return {
              ...resource,
              title: "Youtube Video",
              description: "Youtube Video",
              images: [null],
              favicons: [null],
            };
          const meta = await getLinkPreview(url);
          return {
            ...resource,
            ...meta,
          };
        } catch (error) {
          return {
            ...resource,
            title: null,
            description: null,
            images: [null],
            favicons: [null],
          };
        }
      }),
    );
    setResources(resourcesWithMeta);
    setStepInfo(data[0]?.roadmap_steps);
  };

  const handleMarkAttendance = async () => {
    // Set the step to isCompleted & redirect to /roadmap/roadmapId
    const { data, error } = await supabaseClient
      .from("roadmap_steps")
      .update({ isCompleted: true })
      .eq("id", stepId)
      .select("*")
      .single();
    if (error) {
      console.error("Error marking attendance:", error);
      return;
    }
    console.debug(`🚀 ~ handleMarkAttendance ~ data:`, data);
    setStepInfo(data);
    push(`/roadmap/${data.roadmap_id}`);
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case "article":
        return BookOpenIcon;
      case "course":
        return VideoIcon;
      case "website":
        return GlobeIcon;
      default:
        return ExternalLinkIcon;
    }
  };

  useEffect(() => {
    if (!stepId || !user) return;
    getResourcesAndAddMeta();
  }, [stepId, user]);

  return !stepInfo ? (
    <main className="flex flex-col gap-4 w-full flex-1 md:p-4 py-4 px-2 overflow-y-auto">
      <div className="flex items-center gap-4">
        <Button size={"icon"} variant={"outline"} asChild>
          <Link href="/dashboard">
            <ChevronLeftIcon className="size-4" />
          </Link>
        </Button>
        <Skeleton className="h-6 w-1/2" />
      </div>
      <div className="grid md:grid-cols-4 gap-4">
        <div className="md:col-span-3 col-span-1 w-full flex flex-col gap-4">
          <div className="w-full aspect-video bg-neutral-100 md:rounded-2xl rounded-md md:shadow"></div>
          <Skeleton className="h-6 w-full" />
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <Skeleton className="aspect-video w-full" />
          <Skeleton className="aspect-video w-full" />
          <Skeleton className="aspect-video w-full" />
        </div>
      </div>
    </main>
  ) : (
    <main className="flex flex-col gap-4 w-full flex-1 md:p-4 py-4 px-2 overflow-y-auto">
      <div className="flex items-center gap-4">
        <Button size={"icon"} variant={"outline"} asChild>
          <Link
            href={
              stepInfo?.roadmap_id
                ? `/roadmap/${stepInfo?.roadmap_id}`
                : `/dashboard`
            }
          >
            <ChevronLeftIcon className="size-4" />
          </Link>
        </Button>
        <h1 className="text-sm flex-1 line-clamp-1 break-all md:text-xl font-medium">
          {stepInfo?.title}
        </h1>
        <Button
          disabled={stepInfo?.isCompleted}
          onClick={handleMarkAttendance}
          className={"ml-auto rounded-full"}
          variant={"outline"}
        >
          {stepInfo?.isCompleted ? (
            <CheckIcon className="size-4 text-green-500" />
          ) : (
            <TriangleAlertIcon className="size-4 text-yellow-500" />
          )}
          {stepInfo?.isCompleted ? "Completed" : "Mark as Completed"}
        </Button>
      </div>
      <div className="grid md:grid-cols-4 gap-4">
        <div className="md:col-span-3 col-span-1 w-full flex flex-col gap-4">
          <div className="w-full aspect-video bg-neutral-100 md:rounded-2xl rounded-md md:shadow"></div>
          <p className="font-medium line-clamp-3 md:px-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. A
            doloribus assumenda accusantium inventore ipsa, debitis laboriosam
            voluptas ullam! Incidunt blanditiis illum laudantium, quibusdam
            ratione dolores voluptatibus perspiciatis totam accusamus pariatur!
          </p>
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          {resources.map((resource) => {
            const Icon = getResourceIcon(resource.type);
            return (
              <Link
                key={resource.id}
                className="w-full flex flex-col gap-1 overflow-hidden rounded-xl transition-all duration-300 hover:bg-neutral-100 p-2 shadow border border-neutral-200 dark:border-neutral-800"
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* iframe and URL */}
                <div className="flex-1 relative rounded-md w-full aspect-video overflow-hidden">
                  <Image
                    src={
                      resource?.images?.[0] ||
                      resource?.favicons?.[0] ||
                      `https://api.dicebear.com/9.x/glass/svg?seed=${resource.url}`
                    }
                    alt={resource?.title || resource?.url}
                    unoptimized
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-2 flex flex-col gap-2">
                  <p className="w-full line-clamp-1 text-sm break-all flex items-center gap-2">
                    <Icon className="inline-flex size-4 shrink-0" />
                    {resource.title || resource.url}
                  </p>
                  <p className="w-full text-xs break-all line-clamp-1 text-muted-foreground">
                    {resource.description || resource.url}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default LearningPage;
