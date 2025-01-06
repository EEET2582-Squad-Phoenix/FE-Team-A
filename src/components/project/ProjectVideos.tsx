import React from "react";

type ProjectVideosProps = {
  videos: string[];
};

const ProjectVideos = ({ videos }: ProjectVideosProps) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">Videos</h3>
      {videos.length === 0 ? (
        <div className="text-center text-gray-500 font-semibold">
          No videos available
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video, index) => (
            <div key={index} className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg">
              <iframe
                src={video}
                className="w-full h-full rounded-lg"
                title={`Project Video ${index + 1}`}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectVideos;
