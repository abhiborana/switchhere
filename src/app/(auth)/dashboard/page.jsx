import Navbar from "@/components/organisms/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNowStrict } from "date-fns";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-4 flex-1 w-full h-full p-4 overflow-y-auto">
        <div className="flex gap-4 items-center justify-between">
          <h2 className="text-xl font-semibold">Your Roadmaps</h2>
          <Button asChild variant={"outline"} className="w-fit">
            <Link href={"/roadmap"}>
              <PlusIcon />
              Create Roadmap
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {mockRoadmaps.length ? (
            mockRoadmaps.map((roadmap) => (
              <Card key={roadmap.id} className="cursor-pointer">
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
                  <Badge variant={"secondary"}>
                    {roadmap.hoursPerDay}hrs/day
                  </Badge>
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
            ))
          ) : (
            <Card className="cursor-pointer">
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
          )}
        </div>
      </main>
    </>
  );
};

export default Dashboard;

const mockRoadmaps = [
  {
    id: "6f8e4b2c-1a2b-4d3e-b5f6-7a8b9c0d1e2f",
    title: "Roadmap 1",
    toBecome: "Frontend Developer",
    hoursPerDay: 4,
    isCompleted: false,
    completed_at: null,
    user_id: "e1079b3b-ae54-4572-a372-da173932cc62",
    created_at: "2025-04-01T12:00:00Z",
  },
  {
    id: "7a8b9c0d-1e2f-4d3e-b5f6-7a8b9c0d1e2f",
    title: "Roadmap 2",
    toBecome: "Backend Developer",
    hoursPerDay: 3,
    isCompleted: true,
    completed_at: "2023-10-01T12:00:00Z",
    user_id: "e1079b3b-ae54-4572-a372-da173932cc62",
    created_at: "2025-04-08T12:00:00Z",
  },
  {
    id: "8b9c0d1e-2f4d-3e-b5f6-7a8b9c0d1e2f",
    title: "Roadmap 3",
    toBecome: "Full Stack Developer",
    hoursPerDay: 5,
    isCompleted: false,
    completed_at: null,
    user_id: "e1079b3b-ae54-4572-a372-da173932cc62",
    created_at: "2025-03-24T12:00:00Z",
  },
];
