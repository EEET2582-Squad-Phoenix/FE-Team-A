import { CharityRankingResponse, CharityStatistics } from "@/types/statistic";
import { DonorRankingResponse } from "@/types/statistic";
import API from "@/utils/axiosClient";

export const fetchCharityStatistics = async (): Promise<CharityStatistics> => {
  const response = await API.get<CharityStatistics>("/api/charity/statistics");
  return response.data;
};


export const fetchTopDonors = async (): Promise<DonorRankingResponse[]> => {
  const response = await API.get<DonorRankingResponse[]>("/ranking/top-ten/donor");
  return response.data;
};

export const fetchTopCharities = async (): Promise<CharityRankingResponse[]> => {
  const response = await API.get<CharityRankingResponse[]>("/ranking/top-ten/charity");
  return response.data;
};
