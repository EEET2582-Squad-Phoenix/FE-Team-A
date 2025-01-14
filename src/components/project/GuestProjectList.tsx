import React from "react";
import ProjectCard from "./ProjectCard";
import { IProject } from "@/types/project";
import GuestProjectCard from "./GuestProjectCard";

type ProjectListProps = {
  projects: IProject[];
};

export default function GuestProjectList({ projects }: ProjectListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <GuestProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
