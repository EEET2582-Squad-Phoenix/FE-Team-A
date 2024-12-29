import React from "react";
import ProjectClient from "./ProjectClient/ProjectClient";
import { IProject, ProjectCategory } from "@/types/project";

const mockProjects: IProject[] = [
  {
    id: 1,
    title: "Clean Water for All",
    description: "Provide clean drinking water in rural areas.",
    category: ProjectCategory.HEALTH,
    country: "Kenya",
    image: "/gura.jpg",
    fundStatus: "80% funded",
  },
  {
    id: 2,
    title: "Building Schools",
    description: "Construct schools in underprivileged areas.",
    category: ProjectCategory.EDUCATION,
    country: "India",
    image: "/gura.jpg",
    fundStatus: "50% funded",
  },
  {
    id: 3,
    title: "Emergency Food Aid",
    description: "Support families in need with food essentials.",
    category: ProjectCategory.FOOD,
    country: "USA",
    image: "/gura.jpg",
    fundStatus: "90% funded",
  },
  {
    id: 4,
    title: "Housing for Refugees",
    description: "Construct shelters for displaced individuals.",
    category:  ProjectCategory.HOUSING,
    country: "Syria",
    image: "/gura.jpg",
    fundStatus: "40% funded",
  },
  {
    id: 5,
    title: "Reforestation Project",
    description: "Planting trees to restore forests.",
    category:  ProjectCategory.ENVIRONMENT,
    country: "Brazil",
    image: "/gura.jpg",
    fundStatus: "70% funded",
  },
  {
    id: 6,
    title: "Breast Cancer Research",
    description: "Support for ongoing cancer research.",
    category:  ProjectCategory.HEALTH,
    country: "UK",
    image: "/gura.jpg",
    fundStatus: "85% funded",
  },
  {
    id: 7,
    title: "Relief for Flood Victims",
    description: "Humanitarian aid for recent flood victims.",
    category:  ProjectCategory.HUMANITARIAN,
    country: "Pakistan",
    image: "/gura.jpg",
    fundStatus: "95% funded",
  },
  {
    id: 8,
    title: "Solar Power in Schools",
    description: "Install solar panels in rural schools.",
    category:  ProjectCategory.EDUCATION,
    country: "South Africa",
    image: "/gura.jpg",
    fundStatus: "60% funded",
  },
];

const categories = Object.values(ProjectCategory);


export default async function Page() {
  return <ProjectClient initialProjects={mockProjects} />;
}