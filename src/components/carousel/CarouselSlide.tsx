import React from "react";
import Image from "next/image";
import { IProject } from "@/types/project";

type CarouselSlideProps = {
  project: IProject;
  isActive: boolean;
  onClick: () => void; 
};

export default function CarouselSlide({ project, isActive, onClick }: CarouselSlideProps) {
  return (
    <div
      className={`flex-shrink-0 w-full relative transition-opacity ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClick} 
    >
      {project.thumbnailUrl && project.thumbnailUrl.length > 0 ? (
        <Image
          src={project.thumbnailUrl} 
          alt={project.name}
          width={1200}
          height={500}
          className="w-full h-[300px] object-contain rounded-lg"
          priority={isActive}
        />
      ) : (
        <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-700 text-lg font-semibold rounded-lg">
          No Image Available
        </div>
      )}

      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 rounded-lg">
        <h2 className="text-white text-xl font-bold">{project.name}</h2>
        <p className="text-gray-200">{project.description}</p>
        <span className="text-green-400 font-semibold mt-2">
          {project.fundStatus}
        </span>
      </div>
    </div>
  );
}
