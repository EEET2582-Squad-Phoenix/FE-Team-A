import API from "@/utils/axiosClient";
import { IProject } from "@/types/project";

interface ProjectsResponse {
  data: IProject[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

export const fetchProjects = async (
  filters: { name?: string; charityID?: string; country?: string; category?: string },
  page: number = 1,
  limit: number = 5
): Promise<ProjectsResponse> => {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });

  // Add filters
  if (filters.name) params.append("name", filters.name);
  if (filters.charityID) params.append("charityID", filters.charityID);
  if (filters.country) params.append("country", filters.country);
  if (filters.category) params.append("category", filters.category);

  const response = await API.get<ProjectsResponse>(`/api/projects?${params.toString()}`);
  return response.data;
};

export const fetchHighlightedProjects = async (): Promise<IProject[]> => {
  const response = await API.get<IProject[]>("/api/charity-project/highlighted");
  return response.data;
};
