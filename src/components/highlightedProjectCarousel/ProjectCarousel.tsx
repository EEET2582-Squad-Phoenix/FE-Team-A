"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const ProjectCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mockProjects = [
    {
      id: 1,
      title: "Clean Water for All",
      picture: "/gura.jpg",
      description: "A project to provide clean drinking water in rural areas.",
      fundStatus: "80% funded",
    },
    {
      id: 2,
      title: "Education for the Future",
      picture: "/gura.jpg",
      description: "Building schools for underprivileged children.",
      fundStatus: "60% funded",
    },
    {
      id: 3,
      title: "Healthcare Access",
      picture: "/gura.jpg",
      description: "Providing medical supplies to remote communities.",
      fundStatus: "90% funded",
    },
  ];

  // Automatically switch slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === mockProjects.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval); // Clear interval on unmount
  }, [mockProjects]);

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mockProjects.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === mockProjects.length - 1 ? 0 : prevIndex + 1
    );
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
        {mockProjects.map((project) => (
          <div key={project.id} className="flex-shrink-0 w-full relative">
            <Image
              src={project.picture}
              alt={project.title}
              width={1200}
              height={500}
              className="w-full h-64 object-cover rounded-lg"
              priority={project.id === 1}
            />
            {/* Project Information */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 rounded-lg">
              <h2 className="text-white text-xl font-bold">{project.title}</h2>
              <p className="text-gray-200">{project.description}</p>
              <span className="text-green-400 font-semibold mt-2">
                {project.fundStatus}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={goToPreviousSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-600"
      >
        &#9664; {/* Left arrow symbol */}
      </button>

      {/* Next Button */}
      <button
        onClick={goToNextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-600"
      >
        &#9654; {/* Right arrow symbol */}
      </button>

      {/* Carousel Indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {mockProjects.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
