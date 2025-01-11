import { DonationResponse, IDonation, IRecurringDonation, RecurringDonationResponse } from "@/types/donation";
import API from "@/utils/axiosClient";

export const subscribeUnsubscribe = async (continent: string, category: string) => {
  const response = await API.post("/api/donor/subscribe", { continent, category });
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

//still works despite the error, dunno how to fix, but hey, it still works
export async function fetchRecurringDonations(): Promise<IRecurringDonation[]> {
  try {
    const response = await API.get<RecurringDonationResponse>("/donate/recurring");
    if (response.data.success) {
      return response.data.data.map((entry) => ({
        ...entry.donation,
        nextBillingDate: new Date(entry.donation.nextBillingDate * 1000),  
      }));
    } else {
      throw new Error("Failed to fetch recurring donations");
    }
  } catch (error) {
    console.error("Failed to fetch recurring donations:", error);
    throw error;
  }
}

export async function cancelRecurringDonation(donationId: string): Promise<void> {
  try {
    const response = await API.put(`/donate/cancel/${donationId}`);
    if (!response.data.success) {
      throw new Error("Failed to cancel subscription");
    }
    return;
  } catch (error) {
    console.error("Error canceling subscription:", error);
    throw new Error("Failed to cancel subscription");
  }
}

export const fetchSubscription = async () => {
  try {
    const response = await API.get("/api/donor/getSubscription");
    return response.data[0]; 
  } catch (error: any) {
      throw new Error(error?.message || "Failed to fetch subscription");
  }
};