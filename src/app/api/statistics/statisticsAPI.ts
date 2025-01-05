import { CharityStatistics } from "@/types/statistic";
import API from "@/utils/axiosClient";

export const fetchCharityStatistics = async (): Promise<CharityStatistics> => {
    const response = await API.get<CharityStatistics>("/api/charity/statistics");
    return response.data;
  };