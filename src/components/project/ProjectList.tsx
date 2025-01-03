import React from "react";
import ProjectCard from "./ProjectCard";
import { IProject } from "@/types/project";

type ProjectListProps = {
  projects: IProject[];
};

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project._id}  project={project} />
      ))}
    </div>
  );
}
