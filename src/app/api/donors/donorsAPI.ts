import { DonationResponse, IDonation, IRecurringDonation, RecurringDonationResponse } from "@/types/donation";
import API from "@/utils/axiosClient";

export const subscribeUnsubscribe = async (region: string, category: string) => {
  const response = await API.post("/api/donor/subscribe", { region, category });
  return response.data;
};


export async function fetchDonations(): Promise<IDonation[]> {
  try {
    const response = await API.get<DonationResponse>("/donate/my-donation");
    return response.data.donations; 
  } catch (error) {
    console.error("Failed to fetch donations:", error);
    throw new Error("Failed to fetch donations");
  }
}

//TO FIX
export async function fetchRecurringDonations(): Promise<IRecurringDonation[]> {
  try {
    const response = await API.get<RecurringDonationResponse>("/donate/recurring");
    if (response.data.success) {
      return response.data.data;  
    } else {
      throw new Error("Failed to fetch recurring donations");
    }
  } catch (error) {
    console.error("Failed to fetch recurring donations:", error);
    throw new Error("Failed to fetch recurring donations");
  }
}