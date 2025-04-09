"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BookOpenIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  ExternalLinkIcon,
  GlobeIcon,
  VideoIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const RoadmapUi = ({ roadmap }) => {
  const [expandedSteps, setExpandedSteps] = useState([0]);

  const toggleStep = (index) => {
    setExpandedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

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

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-sky-600 to-sky-500 bg-clip-text text-transparent">
            {roadmap.title}
          </h1>
        </div>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-sky-200 dark:bg-sky-900"></div>
          {roadmap?.steps?.map((step, index) => (
            <div key={index} className="mb-8 relative">
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
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleStep(index)}
                      className="ml-2"
                    >
                      {expandedSteps.includes(index) ? (
                        <ChevronDownIcon className="h-5 w-5" />
                      ) : (
                        <ChevronRightIcon className="h-5 w-5" />
                      )}
                    </Button>
                  </div>

                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>

                  {expandedSteps.includes(index) && (
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Resources:
                      </h4>
                      <ul className="space-y-2">
                        {step?.resources?.map((resource, resourceIndex) => (
                          <li key={resourceIndex}>
                            <Link
                              href={resource.url ?? "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sky-600 dark:text-sky-400 gap-2"
                            >
                              {resource?.isCompleted ? (
                                <CircleCheckIcon className="text-green-500 size-4" />
                              ) : null}
                              {getResourceIcon(resource.type)}
                              <span className="flex-grow truncate">
                                {resource.url}
                              </span>
                              <Badge
                                variant="outline"
                                className="ml-2 bg-amber-50 dark:bg-amber-900 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                              >
                                {resource.type}
                              </Badge>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoadmapUi;
