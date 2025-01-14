"use client";

import React, { useEffect, useState } from "react";
import {
  fetchDeletedProjects,
  recoverProject,
} from "@/app/api/charities/charitiesAPI";
import CharityProjectDetailsPopup from "@/components/project/CharityProjectDetailsPopup";
import { IProject } from "@/types/project";
import { toast } from "sonner";
import { Folder } from "lucide-react";
import { DeletedProjectCard } from "../_components/DeletedProjectCard";
import ConfirmationDialog from "@/components/dialog/ConfirmationDialog";

export default function ProjectClient() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
    useState<boolean>(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const projects = await fetchDeletedProjects();
      setProjects(projects);
    } catch {
      toast.error("Failed to fetch projects.");
    }
  };

  const openDetailsPopup = (project: IProject) => {
    setSelectedProject(project);
    setIsDetailsOpen(true);
  };

  const closeDetailsPopup = () => {
    setIsDetailsOpen(false);
    setSelectedProject(null);
  };

  const openRevertDialog = (project: IProject) => {
    setSelectedProject(project);
    setIsConfirmDialogOpen(true);
  };

  const closeRevertDialog = () => {
    setIsConfirmDialogOpen(false);
    setSelectedProject(null);
  };

  const handleRevertProject = async () => {
    if (!selectedProject) return;
    try {
      await recoverProject({ projectId: selectedProject.originalProjectId });
      toast.success(
        `Project "${selectedProject.name}" successfully recovered!`
      );
      setProjects((prev) =>
        prev.filter((proj) => proj.id !== selectedProject.id)
      );
    } catch {
      toast.error("Failed to recover the project.");
    } finally {
      closeRevertDialog();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-10">
        <div className="text-gray-900">
          <h1 className="text-3xl font-semibold flex items-center gap-4">
            <Folder className="w-8 h-8" /> Your Inactive Projects
          </h1>
          <p className="text-sm text-gray-600">
            View projects you have deleted
          </p>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="text-lg font-medium">No inactive projects found.</p>
          <p className="text-sm">
            Projects you delete will appear here for recovery.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <DeletedProjectCard
              key={project.originalProjectId}
              project={project}
              onViewDetails={openDetailsPopup}
              onRecoverProject={openRevertDialog}
            />
          ))}
        </div>
      )}

      {isDetailsOpen && selectedProject && (
        <CharityProjectDetailsPopup
          project={selectedProject}
          closeModal={closeDetailsPopup}
        />
      )}

      {isConfirmDialogOpen && selectedProject && (
        <ConfirmationDialog
          isOpen={isConfirmDialogOpen}
          onClose={closeRevertDialog}
          onConfirm={handleRevertProject}
          title="Recover Project"
          warningText={`Are you sure you want to recover the project "${selectedProject.name}"?`}
        />
      )}
    </div>
  );
}
