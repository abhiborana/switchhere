"use client";

import { getTrendingCareers } from "@/actions/ai";
import { BorderBeam } from "@/components/magicui/border-beam";
import RoadmapUi from "@/components/organisms/roadmap-ui";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Ripple from "@/components/ui/ripple";
import { roadmapFormSchema } from "@/schema";
import useSwitchStore from "@/store";
import { supabaseClient } from "@/supabase";
import { experimental_useObject } from "@ai-sdk/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, SaveIcon, WandSparklesIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const RoadmapCreate = () => {
  const router = useRouter();

  const user = useSwitchStore((state) => state.user);
  const [status, setStatus] = useState(null);

  const [trending, setTrending] = useState([]);
  console.debug(`🚀 ~ RoadmapCreate ~ trending:`, trending);

  const { isLoading, submit, object } = experimental_useObject({
    api: "/api/roadmap",
    onFinish: (data) => {
      toast.success("Roadmap generated successfully!");
    },
    onError: (error) => {
      console.debug("Error:", error);
    },
  });

  const form = useForm({
    resolver: zodResolver(roadmapFormSchema),
    defaultValues: {
      toBecome: "",
      currentExperience: "",
    },
  });

  const handleSaveRoadmap = async () => {
    setStatus("loading");
    // Save the roadmap to the database
    const { data: roadmapSaved, error } = await supabaseClient
      .from("roadmaps")
      .insert({
        title: object.title,
        estimatedTime: object.estimatedTime,
        toBecome: form.getValues("toBecome"),
        currentExperience: form.getValues("currentExperience"),
        hoursPerDay: form.getValues("hoursPerDay"),
        user_id: user.id,
      })
      .select("id")
      .single();
    if (error) {
      toast.error("Error saving roadmap");
      console.debug("Error saving roadmap:", error);
      setStatus("error");
      return;
    }

    // Save the roadmap steps to the database
    const steps = object.daily_tasks.map((step) => ({
      title: step.title,
      description: step.description,
      priority: step.priority,
      youtubeSearchQuery: step.youtubeSearchQuery,
      roadmap_id: roadmapSaved.id,
      user_id: user.id,
    }));

    const { error: stepsError } = await supabaseClient
      .from("roadmap_steps")
      .insert(steps)
      .select("id, priority");
    if (stepsError) {
      toast.error("Error saving roadmap steps");
      console.debug("Error saving roadmap steps:", stepsError);
      setStatus("error");
      supabaseClient.from("roadmaps").delete().eq("id", roadmapSaved.id);
      return;
    }
    toast.success("Roadmap saved successfully!");
    setStatus("success");
    router.push(`/dashboard?new=${roadmapSaved.id}`);
  };

  useEffect(() => {
    getTrendingCareers().then(({ trendingCareers }) => {
      setTrending(trendingCareers);
    });
  }, []);

  return (
    <>
      <main className="w-full flex-1 flex-col overflow-y-auto flex items-center py-4 gap-4 justify-center">
        {object ? (
          <>
            {!isLoading && status !== "success" ? (
              <Alert
                variant={"default"}
                className={
                  "w-fit items-center flex gap-4 border-sky-500 bg-sky-50 text-sky-600 "
                }
              >
                <SaveIcon className="h-4 w-4 shrink-0" />
                <p>Do you want to save this roadmap & get started with it?</p>
                <Button
                  variant={"outline"}
                  className={"inline-flex w-fit hover:text-sky-600"}
                  size={"sm"}
                  onClick={handleSaveRoadmap}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Saving..." : "Save"}
                </Button>
              </Alert>
            ) : null}
            <RoadmapUi roadmap={object} disabled />
          </>
        ) : isLoading ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <Ripple className={"w-40 h-40"} />
          </div>
        ) : (
          <Card className="w-full max-w-sm shadow-2xl relative">
            <CardHeader>
              <CardTitle>Create roadmap</CardTitle>
              <CardDescription>
                We will create a customised roadmap for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(submit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="toBecome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your goal is to become a</FormLabel>
                        <FormControl>
                          <Input
                            autoFocus
                            placeholder="Frontend Developer"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hoursPerDay"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hours you can dedicate per day</FormLabel>
                        <FormControl>
                          <Input
                            type={"number"}
                            placeholder="2 or 4 etc"
                            {...field}
                            onChange={(e) => {
                              field.onChange(Number(e.target.value));
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="currentExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Your current experience in the field (if any)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Commerce student / Sales Analyst"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-between items-center mt-8">
                    <Button asChild variant="outline" disabled={isLoading}>
                      <Link href={"/dashboard"}>
                        <ArrowLeftIcon />
                        Go back
                      </Link>
                    </Button>
                    <Button
                      disabled={isLoading}
                      type="submit"
                      className={"bg-indigo-600 hover:bg-indigo-700 text-white"}
                    >
                      <WandSparklesIcon className="" />
                      Generate
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
            <BorderBeam duration={8} size={100} />
          </Card>
        )}
      </main>
    </>
  );
};

export default RoadmapCreate;
