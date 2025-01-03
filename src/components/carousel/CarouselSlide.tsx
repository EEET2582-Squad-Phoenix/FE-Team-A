import React from "react";
import Image from "next/image";
import { IProject } from "@/types/project";

type CarouselSlideProps = {
  project: IProject;
  isActive: boolean;
};

export default function CarouselSlide({ project, isActive }: CarouselSlideProps) {
  return (
    <div
      className={`flex-shrink-0 w-full relative transition-opacity ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
    >
      <Image
        src={project.img[0] || "/gura.jpg"} 
        alt={project.name}
        width={1200}
        height={500}
        className="w-full h-64 object-cover rounded-lg"
        priority={isActive}
      />
      {/* Project Information */}
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
