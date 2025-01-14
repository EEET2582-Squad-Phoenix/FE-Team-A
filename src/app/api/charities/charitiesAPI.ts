import { CreditCard } from "@/types/creditCard";
import { IProject } from "@/types/project";
import API from "@/utils/axiosClient";

export const updateProject = async (project: IProject) => {
  const apiPayload = {
    projectId: project.id,
    name: project.name,
    description: project.description,
    country: project.country,
    categories: project.categories,
    goalAmount: project.goalAmount,
    startDate: project.startDate,
    endDate: project.endDate,
    imageURLs: project.imageURLs,
    videoURLs: project.videoURLs,
  };

  const response = await API.put(
    "/api/charity-project/updateProject",
    apiPayload
  );
  return response.data;
};

export const addProject = async (projectData: {
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
}): Promise<IProject> => {
  try {
    const apiPayload = {
      name: projectData.name,
      description: projectData.description,
      goalAmount: projectData.goalAmount,
      country: projectData.country,
      categories: projectData.categories,
      startDate: projectData.startDate.toISOString(),
      endDate: projectData.endDate.toISOString(),
      img: projectData.img,
      thumbnail: projectData.thumbnail || null,
      vid: projectData.vid || null,
    };

    const response = await API.post(
      "/api/charity-project/createProject",
      apiPayload
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Error in addProject:",
      error?.response?.data || error.message
    );
    throw new Error(
      error?.response?.data?.message ||
        "Failed to add project. Please try again later."
    );
  }
};

export const fetchProjectsForCharity = async (): Promise<IProject[]> => {
  const response = await API.get<{ projects: IProject[] }>(
    `/api/charity-project/my_project`
  );
  return response.data.projects;
};

interface CharityDeleteDTO {
  projectId: string;
  deletionReason: string;
}

export const deactivateProject = async ({
  projectId,
  deletionReason,
}: CharityDeleteDTO) => {
  const response = await API.post("/api/charity-project/deactivate", {
    projectId,
    deletionReason,
  });
  return response.data;
};

export const recoverProject = async ({ projectId }: { projectId: string }) => {
  const response = await API.post("/api/charity-project/restore", {
    projectId,
  });
  return response.data;
};

export const haltProject = async ({
  projectId,
  donorReason,
  charityReason,
}: {
  projectId: string;
  donorReason: string;
  charityReason: string;
}) => {
  const response = await API.post("/api/charity-project/toggleHalt", {
    projectId,
    donorReason,
    charityReason,
  });
  return response.data;
};

export const fetchDonationsByProjectId = async (
  projectId: string
): Promise<any[]> => {
  try {
    const response = await API.get(`/donate/donations/${projectId}`);
    return response.data.donations;
  } catch (error) {
    throw new Error("Failed to fetch donations. Please try again later.");
  }
};

export const fetchDonationsByCharity = async (): Promise<any[]> => {
  try {
    const response = await API.get("donate/charity/my_donation");
    return response.data.donations;
  } catch (error) {
    throw new Error("Failed to fetch donations. Please try again later.");
  }
};

export const fetchCharityCreditCards = async (): Promise<CreditCard[]> => {
  const response = await API.get<{ success: boolean; data: CreditCard[] }>(
    "/credit-card/charity/get"
  );
  if (!response.data.success) {
    throw new Error("Failed to fetch credit cards.");
  }
  return response.data.data;
};

export const fetchDeletedProjects = async (): Promise<IProject[]> => {
  const response = await API.get<{ projects: IProject[] }>(
    `/api/charity-project/my_inactive`
  );
  return response.data.projects;
};

//FOR EXTERNAL API CALLS
const API_BASE_URL = "http://localhost:8080";

export const fetchDonationValue = async (
  userId: string,
  isDonor: boolean
): Promise<number> => {
  const response = await fetch(
    `${API_BASE_URL}/statistics/donation-value/target?userTargetID=${userId}&isDonor=${isDonor}`,
    { credentials: "include" }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch donation value: ${response.statusText}`);
  }

  const data = await response.json();
  return data.value;
};

export const fetchProjectCount = async (
  userId: string,
  isDonor: boolean
): Promise<number> => {
  const response = await fetch(
    `${API_BASE_URL}/statistics/project-count/target?userTargetID=${userId}&isDonor=${isDonor}`,
    { credentials: "include" }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch project count: ${response.statusText}`);
  }

  const data = await response.json();
  return data.value;
};
