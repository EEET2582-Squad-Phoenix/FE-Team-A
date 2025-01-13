import React, { useState } from "react";
import { IProject } from "@/types/project";
import ProjectDetailsPopup from "./ProjectDetailsPopup";
import GuestProjectDetailsPopup from "./GuestProjectDetailsPopup";

export default function ProjectCard({ project }: { project: IProject }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + "...";
    }
    return description;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={project.thumbnailUrl}
        alt={project.name}
        className="w-full h-[200px] object-contain" 
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{project.name}</h3>
        <p className="text-gray-600 text-sm">
          {truncateDescription(project.description, 100)}
        </p>
        <span className="block text-green-500 font-semibold mt-2">
          {project.fundStatus}
        </span>
        <button
          onClick={openModal}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full"
        >
          View More
        </button>

        {isModalOpen && <GuestProjectDetailsPopup project={project} closeModal={closeModal} />}
      </div>
    </div>
  );
}
