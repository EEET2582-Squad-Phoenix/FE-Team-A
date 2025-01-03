import React from "react";
import { IProject } from "@/types/project";

export default function ProjectCard({ project }: { project: IProject }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={project.img[0]}
        alt={project.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{project.name}</h3>
        <p className="text-gray-600 text-sm">{project.description}</p>
        <span className="block text-green-500 font-semibold mt-2">
          {project.fundStatus}
        </span>
      </div>
    </div>
  );
}
