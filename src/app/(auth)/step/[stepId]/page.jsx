"use client";

import { Button } from "@/components/ui/button";
import { supabaseClient } from "@/supabase";
import { ChevronLeftIcon, TriangleAlertIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";

const LearningPage = ({ params }) => {
  const { stepId } = use(params);
  const [resources, setResources] = useState([]);
  console.log("🚀 ~ LearningPage ~ resources:", resources);
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
        const { url } = resource;
        const response = await fetch("/api/metascraper", {
          method: "POST",
          body: JSON.stringify({ url }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const metaData = await response.json();
        return {
          ...resource,
          ...metaData,
        };
      }),
    );
    setResources(resourcesWithMeta);
    setStepInfo(data[0]?.roadmap_steps);
  };

  useEffect(() => {
    if (!stepId) return;
    getResourcesAndAddMeta();
  }, [stepId]);

  return (
    <main className="flex flex-col gap-4 w-full flex-1 p-4 overflow-y-auto">
      <div className="flex items-center gap-4">
        <Button size={"icon"} variant={"outline"}>
          <ChevronLeftIcon className="size-4" />
        </Button>
        <h1 className="text-sm flex-1 line-clamp-1 break-all md:text-xl font-medium">
          {stepInfo?.title}
        </h1>
        <Button className={"ml-auto rounded-full"} variant={"outline"}>
          <TriangleAlertIcon className="size-4 text-yellow-500" />
          Mark Attendance
        </Button>
      </div>
      <div className="grid md:grid-cols-4 gap-6">
        {resources.map((resource) => {
          return (
            <Link
              key={resource.id}
              className="w-full flex flex-col gap-1 overflow-hidden rounded-xl transition-all duration-300 hover:bg-neutral-100"
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* iframe and URL */}
              <div className="flex-1 relative rounded-md w-full aspect-video overflow-hidden">
                <Image
                  src={resource.image}
                  alt={resource.title}
                  unoptimized
                  fill
                />
              </div>
              <div className="p-2 flex flex-col gap-2">
                <p className="w-full line-clamp-2 text-sm break-all">
                  {resource.title}
                </p>
                <p className="w-full text-xs break-all line-clamp-3 text-muted-foreground">
                  {resource.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default LearningPage;
