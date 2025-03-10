import API from "@/utils/axiosClient";
import { IProject } from "@/types/project";

interface ProjectsResponse {
  data: IProject[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

export const fetchProjects = async (
  filters: {
    name?: string;
    charityID?: string;
    country?: string;
    category?: string;
  },
  page: number = 1,
  limit: number = 5
): Promise<ProjectsResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (filters.name) params.append("name", filters.name);
  if (filters.charityID) params.append("charityID", filters.charityID);
  if (filters.country) params.append("country", filters.country);
  if (filters.category) params.append("category", filters.category);

  const response = await API.get<ProjectsResponse>(
    `/api/charity-project?${params.toString()}`
  );
  return response.data;
};

export const fetchHighlightedProjects = async (): Promise<IProject[]> => {
  const response = await API.get<IProject[]>(
    "/api/charity-project/highlighted"
  );
  return response.data;
};

export const GetProjectByCharitiesID = async (): Promise<IProject[]> => {
  const response = await API.get<IProject[]>(
    "/api/charity-project/highlighted"
  );
  return response.data;
};

export const fetchSuggestedProjects = async (): Promise<IProject[]> => {
  const response = await API.get<{ projects: IProject[] }>(
    "/api/donor/suggested"
  );
  return response.data.projects;
};

export const fetchProjectCountries = async (): Promise<string[]> => {
  try {
    const response = await API.get<
      Record<string, { name: string; continent: string }>
    >("/api/charity-project/countries");

    return Object.values(response.data).map((country) => country.name);
  } catch (error) {
    console.error("Error fetching project countries:", error);
    return [];
  }
};
