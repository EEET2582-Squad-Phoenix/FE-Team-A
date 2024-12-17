"use client";
import React, { useState } from 'react';

const projects = [
  { name: 'Clean water' },
  { name: 'War support' },
  { name: 'Cancer support' },
  { name: 'Breast Cancer support' },
  { name: 'World Charity' },
  { name: 'Save the Animal' },
  { name: 'Save the Trees' },
  { name: 'Japan natural Disaster' },
  { name: 'M' },
];

const SubcribedProject = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const itemsToShow = 4; // Maximum items to show at a time
  
  // Handles the "Next" button logic
  const handleNext = () => {
    setVisibleIndex((prevIndex) => {
      // Check if it's the last slice of projects
      if (prevIndex + itemsToShow >= projects.length) {
        return prevIndex; // Stay at the last position if no more projects to show
      }
      return prevIndex + itemsToShow;
    });
  };

  // Handles the "Previous" button logic
  const handlePrev = () => {
    setVisibleIndex((prevIndex) => {
      // Ensure we don't go before the start of the list
      if (prevIndex <= 0) {
        return 0;
      }
      return prevIndex - itemsToShow;
    });
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Subscribed Projects</h2>
      <div className="relative">
        <div className="flex gap-4 overflow-hidden">
          {/* Loop through the projects to show only the current set based on the visibleIndex */}
          {projects.slice(visibleIndex, visibleIndex + itemsToShow).map((project, index) => (
            <div
              key={index}
              className="flex-none w-full sm:w-1/4 p-2"
            >
              <div className="bg-white shadow-lg rounded-lg">
                <img
                  src="/gura.jpg" // Using the gura.jpg image from the public folder
                  alt={project.name}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <p className="text-center py-2 text-lg font-semibold">{project.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Previous Button */}
        <div className="absolute inset-y-0 left-0 flex items-center justify-center">
          <button
            onClick={handlePrev}
            className="bg-black text-white rounded-full p-2 m-2"
          >
            &lt;
          </button>
        </div>

        {/* Next Button */}
        <div className="absolute inset-y-0 right-0 flex items-center justify-center">
          <button
            onClick={handleNext}
            className="bg-black text-white rounded-full p-2 m-2"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubcribedProject;
