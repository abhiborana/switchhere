"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, WandSparklesIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RoadmapCreate = () => {
  const [roadmap, setRoadmap] = useState(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      toBecome: "",
      currentExperience: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    // Handle form submission logic here
  };

  return (
    <main className="w-full h-full flex items-center justify-center">
      <Card className="w-full max-w-sm shadow-2xl">
        <CardHeader>
          <CardTitle>Create roadmap</CardTitle>
          <CardDescription>
            We will create a customised roadmap for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <FormMessage />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between items-center mt-8">
                <Button asChild variant="outline">
                  <Link href={"/dashboard"}>
                    <ArrowLeftIcon />
                    Go back
                  </Link>
                </Button>
                <Button>
                  <WandSparklesIcon className="text-sky-500" />
                  Generate
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default RoadmapCreate;

const formSchema = z.object({
  toBecome: z.string().min(1, "Please enter a goal to become a"),
  hoursPerDay: z
    .number()
    .min(1, "Please enter hours per day")
    .max(24, "Max 24 hours"),
  currentExperience: z.string().min(1, "Please enter your current experience"),
});
