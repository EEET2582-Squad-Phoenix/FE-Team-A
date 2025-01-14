"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  fetchProjectsForCharity,
  deactivateProject,
  updateProject,
  addProject,
} from "@/app/api/charities/charitiesAPI";
import { CharityProjectCard } from "@/components/project/CharityProjectCard";
import CharityProjectDetailsPopup from "@/components/project/CharityProjectDetailsPopup";
import { EditProjectForm } from "../_components/EditForm";
import { IProject } from "@/types/project";
import { toast } from "sonner";
import HaltProjectForm from "../_components/HaltProjectForm";
import DeleteProjectForm from "../_components/DeleteProjectForm"; // Import the Delete form
import { Folder, PlusCircle } from "lucide-react";
import AddProjectForm from "../_components/AddProjectForm";

export default function ProjectClient() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [isHaltFormOpen, setHaltFormOpen] = useState<boolean>(false); // Control Halt Project form visibility
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false); // Track if the details popup is open
  const [isDeleteFormOpen, setDeleteFormOpen] = useState<boolean>(false); // Track if the delete form is open
  const [isEditFormOpen, setEditFormOpen] = useState<boolean>(false); // Track if the edit form is open
  const [isAddFormOpen, setAddFormOpen] = useState<boolean>(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const projects = await fetchProjectsForCharity();
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

  const openHaltProjectForm = (project: IProject) => {
    setSelectedProject(project);
    setIsDetailsOpen(false);
    setHaltFormOpen(true);
  };

  const closeHaltProjectForm = () => setHaltFormOpen(false);

  const openDeleteProjectForm = (project: IProject) => {
    setSelectedProject(project);
    setDeleteFormOpen(true);
  };

  const closeDeleteProjectForm = () => setDeleteFormOpen(false);

  const openEditForm = (project: IProject) => {
    setSelectedProject(project);
    setEditFormOpen(true);
  };

  const closeEditForm = () => {
    setSelectedProject(null);
    setEditFormOpen(false);
  };

  const handleSaveProject = async (updatedProject: IProject) => {
    try {
      await updateProject(updatedProject);
      toast.success("Project updated successfully.");
      loadProjects();
      closeEditForm();
    } catch (error) {
      toast.error("Failed to update the project.");
    }
  };

  const handleDeleteProject = async (
    projectId: string,
    deletionReason: string
  ) => {
    try {
      await deactivateProject({ projectId, deletionReason });
      toast.success("Project deleted successfully.");
      loadProjects();
      setDeleteFormOpen(false);
    } catch (error) {
      toast.error("Failed to delete the project.");
    }
  };

  const openAddForm = () => setAddFormOpen(true);
  const closeAddForm = () => setAddFormOpen(false);

  const handleAddProject = async (newProject: {
    name: string;
    description: string;
    goalAmount: number;
    country: string;
    categories: string[];
    startDate: Date;
    endDate: Date;
    img: string[];
    thumbnail?: string;
    vid?: string[] | null;
  }) => {
    try {
      if (
        !newProject.name ||
        !newProject.description ||
        !newProject.goalAmount ||
        !newProject.country ||
        !newProject.categories.length ||
        !newProject.startDate ||
        !newProject.endDate
      ) {
        toast.error("All required fields must be filled.");
        return;
      }

      await addProject({
        name: newProject.name,
        description: newProject.description,
        goalAmount: newProject.goalAmount,
        country: newProject.country,
        categories: newProject.categories,
        startDate: newProject.startDate,
        endDate: newProject.endDate,
        img: newProject.img,
        thumbnail: newProject.thumbnail,
        vid: newProject.vid,
      });

      toast.success(`Project created successfully!`);
      loadProjects();
      closeAddForm();
    } catch (error) {
      toast.error("An error occurred while adding the project.");
      console.error("Error while adding project:", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-10">
        <div className="text-gray-900">
          <h1 className="text-3xl font-semibold flex items-center gap-4">
            <Folder className="w-8 h-8" /> My Projects
          </h1>
          <p className="text-sm text-gray-600">
            Manage all your projects in one place!
          </p>
        </div>
        <Button
          className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-blue-500 text-white"
          onClick={openAddForm}
        >
          <PlusCircle className="w-5 h-5" />
          Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <CharityProjectCard
            key={project.id}
            project={project}
            onViewDetails={openDetailsPopup}
            onEdit={openEditForm}
            onHalt={openHaltProjectForm}
            onDelete={openDeleteProjectForm}
          />
        ))}
      </div>

      {isDetailsOpen && selectedProject && (
        <CharityProjectDetailsPopup
          project={selectedProject}
          closeModal={closeDetailsPopup}
        />
      )}

      {isHaltFormOpen && selectedProject && (
        <HaltProjectForm
          projectId={selectedProject.id}
          onClose={closeHaltProjectForm}
        />
      )}

      {isDeleteFormOpen && selectedProject && (
        <DeleteProjectForm
          projectId={selectedProject.id}
          onClose={closeDeleteProjectForm}
          onConfirm={handleDeleteProject}
        />
      )}

      {isEditFormOpen && selectedProject && (
        <EditProjectForm
          project={selectedProject}
          onClose={closeEditForm}
          onSave={handleSaveProject}
        />
      )}

      {isAddFormOpen && (
        <AddProjectForm onClose={closeAddForm} onSave={handleAddProject} />
      )}
    </div>
  );
}
