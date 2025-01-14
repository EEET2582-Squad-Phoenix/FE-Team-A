import React from "react";
import { MapPin, Flag, Tags } from "lucide-react";

type ProjectCategoryDetailsProps = {
  country: string;
  region: string;
  category: string[]; 
};

const ProjectCategoryDetails = ({
  country,
  region,
  category,
}: ProjectCategoryDetailsProps) => {
  return (
    <div className="mb-6 p-6 bg-gray-50 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold mb-4">Project Details</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <Flag className="text-3xl text-blue-600 mr-4" />
          <div>
            <p className="text-sm text-gray-600">Country</p>
            <p className="font-semibold text-xl">{country}</p>
          </div>
        </div>

        <div className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <MapPin className="text-3xl text-orange-500 mr-4" />
          <div>
            <p className="text-sm text-gray-600">Region</p>
            <p className="font-semibold text-xl">{region}</p>
          </div>
        </div>

        <div className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <Tags className="text-3xl text-green-500 mr-4" />
          <div>
            <p className="text-sm text-gray-600">Category</p>
            <p className="font-semibold text-xl">{category.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCategoryDetails;
