"use client";

import { Card } from "@/components/ui/card";
import {
  BookOpenIcon,
  CircleCheckIcon,
  ExternalLinkIcon,
  GlobeIcon,
  VideoIcon,
} from "lucide-react";
import Link from "next/link";

const RoadmapUi = ({ roadmap, roadmapId }) => {
  const getResourceIcon = (type) => {
    switch (type) {
      case "article":
        return <BookOpenIcon className="size-4" />;
      case "course":
        return <VideoIcon className="size-4" />;
      case "website":
        return <GlobeIcon className="size-4" />;
      default:
        return <ExternalLinkIcon className="size-4" />;
    }
  };

  return !roadmap ? null : (
    <div className="w-full h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-sky-600 to-sky-500 bg-clip-text text-transparent">
            {roadmap.title}
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          {roadmap?.steps
            ?.sort((a, b) => a.priority - b.priority)
            .map((step, index) => (
              <Link href={`/step/${step.id}`} key={index} className="">
                <div className="flex items-start">
                  <div className="flex-shrink-0 relative z-10">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900 border-4 border-white dark:border-neutral-900">
                      <span className="text-amber-600 dark:text-amber-400 font-bold">
                        {step.priority}
                      </span>
                    </div>
                  </div>

                  <Card className="ml-4 flex-grow p-6 hover:shadow-md transition-shadow duration-200 border-l-4 border-l-sky-500">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        {step.title}{" "}
                        {step?.isCompleted ? (
                          <CircleCheckIcon className="text-green-500 inline-flex" />
                        ) : null}
                      </h3>
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </Card>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RoadmapUi;
