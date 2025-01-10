"use client";

import React, { useState, useEffect } from "react";
import CarouselSlide from "./CarouselSlide";
import { IProject } from "@/types/project";
import { fetchHighlightedProjects } from "@/app/api/projects/projectsAPI";
import { Button } from "../ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import ProjectDetailsPopup from "../project/ProjectDetailsPopup"; // Adjust the import path

export default function Carousel() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal state

  useEffect(() => {
    const loadHighlightedProjects = async () => {
      try {
        const data = await fetchHighlightedProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching highlighted projects:", error);
      }
    };

    loadHighlightedProjects();
  }, []);

  // Automatically switch slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        projects.length ? (prevIndex + 1) % projects.length : 0
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [projects]);

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % projects.length
    );
  };

  const handleSlideClick = (project: IProject) => {
    setSelectedProject(project); // Set selected project when a slide is clicked
    setIsModalOpen(true); // Open modal when a project is selected
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedProject(null); // Clear the selected project
  };

  return (
    <div className="relative overflow-hidden w-full max-w-4xl mx-auto">
      {/* Carousel Content */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {projects.map((project, index) => (
          <CarouselSlide
            key={project.id}
            project={project}
            isActive={index === currentIndex}
            onClick={() => handleSlideClick(project)} 
          />
        ))}
      </div>

      <Button
        onClick={goToPreviousSlide}
        variant="outline" size="icon"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-600"
      >
        <ChevronLeft />
      </Button>

      <Button
        onClick={goToNextSlide}
        variant="outline" size="icon"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-600"
      >
        <ChevronRight />
      </Button>

      <div className="flex justify-center mt-4 space-x-2">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {isModalOpen && selectedProject && (
        <ProjectDetailsPopup project={selectedProject} closeModal={closeModal} />
      )}
    </div>
  );
}
