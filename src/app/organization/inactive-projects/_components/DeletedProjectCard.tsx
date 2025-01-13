import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { IProject } from "@/types/project";
import { Eye, Edit, OctagonMinus, Trash } from "lucide-react";

export function DeletedProjectCard({
  project,
  onViewDetails,
  onRecoverProject,
}: {
  project: IProject;
  onViewDetails: (project: IProject) => void;
  onRecoverProject: (project: IProject) => void;
}) {

  return (
    <Card className="bg-white shadow-lg flex flex-col h-full">
      <img
        src={project.thumbnailUrl}
        alt={project.name}
        className="w-full h-[200px] object-cover rounded-t-md"
      />
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">{project.name}</CardTitle>
        <CardDescription className="text-gray-600">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
      </CardContent>

      <div className="flex flex-col gap-2 p-4 mt-auto">
        <Button
          variant="outline"
          onClick={() => onViewDetails(project)}
          className="flex items-center gap-2 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
        >
          <Eye /> View Details
        </Button>

        <Button
          variant="outline"
          onClick={() => onRecoverProject(project)}
          className="flex items-center gap-2 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
        >
          <Eye /> Revert 
        </Button>
      </div>
    </Card>
  );
}
