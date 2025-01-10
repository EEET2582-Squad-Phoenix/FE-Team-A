"use client";

import React, { useEffect, useRef, useState } from "react";
import { IProject } from "@/types/project";
import ProjectImages from "./ProjectImages";
import ProjectVideos from "./ProjectVideos";
import ProjectStats from "./ProjectStats";
import ProjectCategoryDetails from "./ProjectCategoryDetails";
import ProjectDuration from "./ProjectDuration";
import { Button } from "../ui/button";
import DonationModal from "../donation/DonationModal";

type ProjectDetailsPopupProps = {
  project: IProject;
  closeModal: () => void;
};

const ProjectDetailsPopup = ({ project, closeModal }: ProjectDetailsPopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [donationType, setDonationType] = useState("one-time");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  const handleDonationClick = (type: string) => {
    setDonationType(type);
    setIsDonationModalOpen(true);
  };

  const closeDonationModal = () => {
    setIsDonationModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center p-4">
      <div
        ref={popupRef}
        className="bg-white rounded-lg shadow-lg p-8 w-full sm:w-10/12 lg:w-8/12 max-h-[90vh] overflow-y-auto relative"
      >
        <Button
          variant="outline"
          className="absolute top-4 right-4 text-3xl font-semibold text-gray-800 hover:text-gray-800"
          onClick={closeModal}
        >
          <span aria-hidden="true">×</span>
        </Button>
        <h2 className="text-3xl font-semibold mb-4">{project.name}</h2>
        <p className="text-gray-600 mb-6">{project.description}</p>

        <ProjectImages images={project.imageURLs} />

        <ProjectVideos videos={project.videoURLs} />

        <ProjectDuration startDate={project.startDate} endDate={project.endDate} />

        <ProjectStats
          goalAmount={project.goalAmount}
          raisedAmount={project.raisedAmount}
        />

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Support this Project</h3>
          <p className="mb-4">Choose how you want to contribute:</p>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              className="flex-1 py-3 px-6 text-center text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 border border-transparent rounded-full shadow-lg hover:shadow-2xl transition duration-200 ease-in-out transform hover:scale-105"
              onClick={() => handleDonationClick("one-time")}
            >
              One-Time Donation
            </Button>
            <Button
              variant="outline"
              className="flex-1 py-3 px-6 text-center text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 border border-transparent rounded-full shadow-lg hover:shadow-2xl transition duration-200 ease-in-out transform hover:scale-105"
              onClick={() => handleDonationClick("recurring")}
            >
              Recurring Donation
            </Button>
          </div>
        </div>

        <ProjectCategoryDetails
          country={project.country}
          region={project.continent}
          category={project.category}
        />

        {isDonationModalOpen && (
          <DonationModal
          donationType={donationType}
          closeModal={closeDonationModal}
          projectName={project.name}
          projectId={project.id}
        />        
        )}
      </div>
    </div>
  );
};

export default ProjectDetailsPopup;
