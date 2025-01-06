import React from "react";

type ProjectImagesProps = {
  images: string[];
};

export default function ProjectImages({ images }: ProjectImagesProps) {
  return (
    <div className="relative w-full mb-8">
      {images.length === 0 ? (
        <div className="text-center text-gray-500 font-semibold">
          No images available
        </div>
      ) : (
        <div className="overflow-x-auto whitespace-nowrap scroll-smooth py-4 px-2">
          {images.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`Project Image ${index + 1}`}
              className="w-[500px] h-auto max-h-[calc(33.33vh)] object-contain rounded-lg shadow-lg inline-block mr-6"
            />
          ))}
        </div>
      )}
    </div>
  );
}
