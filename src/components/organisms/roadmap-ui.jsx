"use client";

import { cn } from "@/lib/utils";
import useSwitchStore from "@/store";
import { supabaseClient } from "@/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import { Badge } from "../ui/badge";

const RoadmapUi = ({ roadmap, roadmapId, disabled = false }) => {
  const { push } = useRouter();
  const user = useSwitchStore((state) => state.user);

  const handleOnClick = async (step) => {
    if (disabled) {
      toast.warning("Start learning from the dashboard");
      return push(`/dashboard`);
    }
    if (!step.isCompleted) {
      try {
        const { error } = await supabaseClient
          .from("continue_learning")
          .insert({
            user_id: user.id,
            step_id: step.id,
            roadmap_id: roadmapId,
          })
          .select();
      } catch (error) {
        console.error("Error inserting continue learning:", error);
      }
    }
    push(`/step/${step.id}`);
  };

  const completedPercentage = useMemo(() => {
    if (!roadmap?.daily_tasks) return 0;
    const completedSteps = roadmap.daily_tasks.filter(
      (step) => step.isCompleted,
    ).length;
    return (completedSteps / roadmap.daily_tasks.length) * 100;
  }, [roadmap]);

  useEffect(() => {
    if (!roadmap) return;
    const incomplete = roadmap.daily_tasks.find(
      (step) => !step.isCompleted,
    )?.id;
    document.getElementById(incomplete).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    if (completedPercentage === 100 && !roadmap?.isCompleted) {
      // update roadmap to completed
      supabaseClient
        .from("roadmaps")
        .update({ isCompleted: true })
        .eq("id", roadmapId)
        .then(({ error }) => {
          if (error) {
            console.error("Error updating roadmap:", error);
          }
        });
    }
  }, [roadmap]);

  return !roadmap ? null : (
    <div className="overflow-y-auto container mx-auto max-w-7xl">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-sky-600 to-sky-500 bg-clip-text text-transparent">
          {roadmap.title}
        </h1>
      </div>
      <div className="flex items-center justify-center">
        <Badge
          className={cn(
            "text-sm",
            completedPercentage === 100 ? "bg-green-500" : "",
          )}
        >
          {roadmap.estimatedTime}
        </Badge>
      </div>
      <div className="flex flex-col gap-4 w-full relative p-4">
        <div className="absolute h-full bg-accent-foreground w-1 left-1/2 -top-0.5 -z-10 -translate-x-1/2">
          <div
            className="w-full bg-green-500"
            style={{
              height: `${completedPercentage}%`,
              // roadmap?.daily_tasks?.
            }}
          />
        </div>
        {roadmap?.daily_tasks
          ?.sort(
            (a, b) => a.priority - b.priority || b.isCompleted - a.isCompleted,
          )
          .map((step, index) => (
            <div
              onClick={() => handleOnClick(step)}
              key={step.id}
              id={step.id}
              className={cn(
                "cursor-pointer flex flex-col gap-2 relative w-2/5 border bg-neutral-100 rounded-2xl p-4 hover:shadow-md transition-all duration-200 ease-in-out hover:bg-neutral-50 break-all",
                index % 2 === 0 ? "self-end" : "",
              )}
            >
              <p className="font-medium text-lg">{step.title}</p>
              <p className="text-muted-foreground text-sm">
                {step.description}
              </p>
              <Badge variant={step.isCompleted ? "default" : "outline"}>
                {step.isCompleted ? "Completed" : "In Progress"}
              </Badge>
              <div
                className={cn(
                  "absolute w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm transform z-10 top-1/2 -translate-y-1/2",
                  index % 2 ? "-right-1/6" : "-left-1/6",
                  step.isCompleted ? "bg-green-500" : "",
                )}
              >
                {index + 1}
              </div>
              <div
                className={cn(
                  "h-1 bg-accent-foreground w-1/4 absolute top-1/2 -translate-y-1/2 -z-20",
                  index % 2 ? "-right-1/4" : "-left-1/4",
                  step.isCompleted ? "bg-green-500" : "",
                )}
              ></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RoadmapUi;
