"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProjectCard from "@/components/project/ProjectCard";
import { fetchSuggestedProjects } from "@/app/api/projects/projectsAPI";
import { IProject } from "@/types/project";
import { toast } from "sonner";

export default function SuggestedProjectsCarousel() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const suggestedProjects = await fetchSuggestedProjects();
        setProjects(suggestedProjects);
      } catch (err) {
        setError("Failed to load suggested projects.");
        toast.error("Unable to load projects.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) return <p>Loading suggested projects...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Suggested Projects</h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-full"
      >
        <CarouselContent className="space-x-4">
          {projects.map((project) => (
            <CarouselItem
              key={project._id}
              className="basis-full md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <ProjectCard project={project} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
}
