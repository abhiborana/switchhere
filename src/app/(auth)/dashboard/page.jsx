"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useSwitchStore from "@/store";
import { supabaseClient } from "@/supabase";
import { formatDistanceToNowStrict } from "date-fns";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const user = useSwitchStore((state) => state.user);
  const [userRoadmaps, setUserRoadmaps] = useState([]);
  const [continueLearning, setContinueLearning] = useState([]);

  useEffect(() => {
    if (!user) return;
    // Fetch continue learning data from Supabase
    supabaseClient
      .from("continue_learning")
      .select("*, roadmaps(title), roadmap_steps(title, isCompleted)")
      .eq("user_id", user.id)
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching roadmaps:", error);
        } else {
          setContinueLearning(data);
        }
      });
    // Fetch user roadmaps from Supabase
    supabaseClient
      .from("roadmaps")
      .select("*")
      .eq("user_id", user.id)
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching roadmaps:", error);
        } else {
          setUserRoadmaps(data);
        }
      });
  }, [user]);

  return (
    <main className="flex-1 w-full overflow-y-auto">
      <div className="flex flex-col gap-4 flex-1 w-full p-4">
        {continueLearning.length ? (
          <>
            <div className="flex gap-4 items-center justify-between">
              <h2 className="text-xl font-semibold">
                Continue Learning Topics
              </h2>
            </div>
            <div className="flex gap-4 w-full overflow-x-auto snap-x snap-always">
              {continueLearning
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .map((roadmap) => (
                  <StepCard key={roadmap.id} roadmap={roadmap} />
                ))}
            </div>
          </>
        ) : null}
        <div className="flex gap-4 items-center justify-between">
          <h2 className="text-xl font-semibold">Your Roadmaps</h2>
          {userRoadmaps.length >= 5 ? null : (
            <Button asChild variant={"outline"} className="w-fit">
              <Link href={"/roadmap"}>
                <PlusIcon />
                New Roadmap
              </Link>
            </Button>
          )}
        </div>
        <div className="flex gap-4 w-full flex-wrap">
          {userRoadmaps.length ? (
            userRoadmaps.map((roadmap) => (
              <Link
                key={roadmap.id}
                href={`/roadmap/${roadmap.id}`}
                className="w-xs shrink-0 aspect-video"
              >
                <Card>
                  <CardHeader>
                    <CardTitle
                      className={
                        "flex flex-wrap items-center gap-2 justify-between"
                      }
                    >
                      {roadmap.toBecome}
                      <Badge variant={"outline"}>
                        {roadmap.isCompleted ? "Completed" : "In Progress"}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{roadmap.title}</CardDescription>
                  </CardHeader>
                  <CardContent className={"gap-4 flex flex-wrap items-center"}>
                    <Badge variant={"secondary"}>{roadmap.estimatedTime}</Badge>
                    <Badge variant={"secondary"}>
                      {formatDistanceToNowStrict(roadmap.created_at, {
                        addSuffix: true,
                        includeSeconds: true,
                      })}
                    </Badge>
                    {/* <div className="text-xs text-muted-foreground">
                    {roadmap.hoursPerDay}hrs/day
                    </div> */}
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <Link href={"/roadmap"}>
              <Card>
                <CardHeader>
                  <CardTitle>No roadmaps found</CardTitle>
                  <CardDescription>
                    Create a new roadmap to get started
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    You can create a roadmap to track your progress and goals.
                  </div>
                </CardContent>
              </Card>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;

const StepCard = ({ roadmap }) => {
  return (
    <Link
      href={`/step/${roadmap.step_id}`}
      className="w-xs shrink-0 aspect-video snap-center"
    >
      <Card>
        <CardHeader>
          <CardTitle
            className={"flex flex-wrap items-center gap-2 justify-between"}
          >
            {roadmap.roadmap_steps.title}
          </CardTitle>
          <CardDescription>{roadmap.roadmaps.title}</CardDescription>
        </CardHeader>
        <CardContent className={"gap-4 flex flex-wrap items-center"}>
          <Badge variant={"secondary"}>
            {formatDistanceToNowStrict(roadmap.created_at, {
              addSuffix: true,
              includeSeconds: true,
            })}
          </Badge>
          {roadmap.roadmap_steps.isCompleted ? (
            <Badge variant={"secondary"}>Completed</Badge>
          ) : (
            <Badge variant={"outline"}>In Progress</Badge>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
