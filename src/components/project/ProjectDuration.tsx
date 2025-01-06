import React from "react";
import { Calendar } from "lucide-react";

type ProjectDurationProps = {
  duration: Date;
};

const ProjectDuration = ({ duration }: ProjectDurationProps) => {
    const now = new Date();
    const projectEndDate = new Date(duration);
    const timeRemaining = projectEndDate.getTime() - now.getTime();
    const daysRemaining = Math.floor(timeRemaining / (1000 * 3600 * 24));
  
    const formattedDuration = projectEndDate.toLocaleDateString();
    
    return (
      <div className="mb-6 p-6 bg-gray-50 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4 flex items-center">
          <Calendar className="mr-3 text-indigo-500 text-2xl" />
          Project Duration
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col items-center sm:items-start p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <p className="text-lg text-gray-600">End Date</p>
          <p className="font-semibold text-2xl">{formattedDuration}</p>
        </div>

        <div className="flex flex-col items-center sm:items-start p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <p className="text-lg text-gray-600">Days Left</p>
          <p className="font-semibold text-2xl text-red-600">
            {daysRemaining < 0 ? 'Project Ended' : `${daysRemaining} Days`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDuration;