"use client";

import RoadmapUi from "@/components/organisms/roadmap-ui";
import useSwitchStore from "@/store";
import { supabaseClient } from "@/supabase";
import { use, useEffect, useState } from "react";

const RoadmapInfo = ({ params }) => {
  const { roadmapId } = use(params);
  const user = useSwitchStore((state) => state.user);
  const [roadmapData, setRoadmapData] = useState(null);

  useEffect(() => {
    if (!roadmapId || !user) return;
    supabaseClient
      .from("roadmap_steps")
      .select("*, roadmaps(*)")
      .eq("roadmap_id", roadmapId)
      .eq("user_id", user.id)
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching roadmap:", error);
        } else {
          supabaseClient
            .from("roadmaps")
            .select("title, estimatedTime")
            .eq("id", roadmapId)
            .single()
            .then(({ data: roadmap, error }) => {
              if (error) {
                console.error("Error fetching roadmap title:", error);
              } else {
                setRoadmapData({
                  title: roadmap.title,
                  daily_tasks: data,
                  estimatedTime: roadmap?.estimatedTime,
                });
              }
            });
        }
      });
  }, [roadmapId, user]);

  return (
    <main className="flex-1 w-full py-4 overflow-y-auto">
      <RoadmapUi roadmap={roadmapData} roadmapId={roadmapId} />
    </main>
  );
};

export default RoadmapInfo;
