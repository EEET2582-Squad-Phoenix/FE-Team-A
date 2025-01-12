import { CreditCard } from "@/types/creditCard";
import { IProject } from "@/types/project";
import API from "@/utils/axiosClient";

export const updateProject = async (project: IProject) => {
  const apiPayload = {
    projectId: project.id,
    name: project.name,
    description: project.description,
    country: project.country,
    category: project.category,
    goalAmount: project.goalAmount,
    startDate: project.startDate,
    endDate: project.endDate,
    imageURLs: project.imageURLs,
    videoURLs: project.videoURL,
  };

  const response = await API.put(
    "/api/charity-project/updateProject",
    apiPayload
  );
  return response.data;
};

export const fetchProjectsForCharity = async (): Promise<IProject[]> => {
  const response = await API.get<{ projects: IProject[] }>(
    `/api/charity-project/my_project`
  );
  return response.data.projects; // Return the actual projects array
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
  window.location.reload();
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


export const fetchDonationsByCharity = async (
): Promise<any[]> => {
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

