import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { IProject } from "@/types/project";
import { Eye, Edit, OctagonMinus, Trash } from "lucide-react";

export function CharityProjectCard({
  project,
  onViewDetails,
  onEdit,
  onHalt,
  onDelete,
}: {
  project: IProject;
  onViewDetails: (project: IProject) => void;
  onEdit: (project: IProject) => void;
  onHalt: (project: IProject) => void;
  onDelete: (project: IProject) => void;
}) {

  const handleHaltClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onHalt(project); 
  };

  const isHalted = project.status === "HALTED";
  const haltButtonText = isHalted ? "Unhalt" : "Halt";
  const haltButtonIcon = isHalted ? <Eye /> : <OctagonMinus />;

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
        <div className="text-sm text-gray-700 mb-auto">
          <div className="flex items-center">
            <div
              className={`inline-block py-1 px-3 text-sm rounded-full text-white ${
                isHalted ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {isHalted ? "Halted" : "Active"}
            </div>
          </div>
        </div>
      </CardContent>

      <div className="flex flex-col gap-2 p-4 mt-auto">
        <Button
          variant="outline"
          onClick={() => onViewDetails(project)}
          className="flex items-center gap-2 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
        >
          <Eye /> View Details
        </Button>

        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            onClick={() => onEdit(project)} 
            className="flex items-center gap-2 w-full bg-gradient-to-r from-green-400 to-teal-500 text-white"
          >
            <Edit /> Edit
          </Button>

          <Button
            variant="outline"
            onClick={handleHaltClick}
            className="flex items-center gap-2 w-full bg-gradient-to-r from-red-500 to-yellow-500 text-white"
          >
            {haltButtonIcon} {haltButtonText}
          </Button>
        </div>

        <Button
          variant="outline"
          onClick={() => onDelete(project)}
          className="flex items-center gap-2 w-full bg-gradient-to-r from-pink-500 to-red-500 text-white"
        >
          <Trash /> Delete
        </Button>
      </div>
    </Card>
  );
}
