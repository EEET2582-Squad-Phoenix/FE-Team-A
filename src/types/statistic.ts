export interface CharityStatistics {
    totalProjects: number;
    totalDonations: number;
    totalDonors: number;
  }

  export interface DonorRankingResponse {
    totalDonation: number;
    avatar: string;
    firstName: string;
    lastName: string;
  }
  
  export interface CharityRankingResponse {
    totalDonation: number;
    name: string;
  }
  