import { useUserStore } from "@/store/user-store";
import { CreditCard } from "@/types/creditCard";
import API from "@/utils/axiosClient";

export const donateAsDonor = async ({
  amount,
  projectId,
  creditCardId,
  isRecurring = false,
  message,
}: {
  amount: number;
  projectId: string;
  creditCardId: string;
  isRecurring?: boolean;
  message?: string;
  currency?: string;
}): Promise<{
  donation: {
    id: string;
    donorId: string;
    projectId: string;
    amount: number;
    status: string;
    nextBillingDate?: number;
    isRecurring: boolean;
  };
  subscriptionId?: string; 
}> => {
  const response = await API.post("/donate/donor", {
    amount,
    projectId,
    creditCardId,
    isRecurring,
    message,
  });
  return response.data;
};

export const createStripeCheckout = async ({
    amount,
    currency,
    donationId,
    projectId,
  }: {
    amount: number;
    currency: string;
    donationId: string;
    projectId: string;
  }): Promise<{ url: string }> => {
    const response = await API.post("/payment/stripe/checkout", {
      amount,
      currency,
      donationId,
      projectId,
    });
    return response.data;
  };


  export const createRecurringStripeCheckout = async ({
    subscriptionId,
    donationId,
    projectId,
  }: {
    subscriptionId: string;
    donationId: string;
    projectId: string;
  }): Promise<{ url: string }> => {
    const response = await API.post("/payment/stripe/recurring", {
      subscriptionId,
      donationId,
      projectId,
    });
    return response.data;
  };


export const fetchCreditCards = async (): Promise<CreditCard[]> => {
  const response = await API.get<{ success: boolean; data: CreditCard[] }>(
    "/credit-card/donor/get"
  );
  if (!response.data.success) {
    throw new Error("Failed to fetch credit cards.");
  }
  return response.data.data;
};

export const addCreditCard = async (creditCardData: {
  cardHolder: string;
  number: string;
  expiryDate: string;
  CVV: string;
}): Promise<CreditCard> => {
  const { currentUser } = useUserStore.getState(); 
  const donorId = currentUser?.id; 

  if (!donorId) {
    throw new Error("User not logged in or donor ID is unavailable.");
  }

  const response = await API.post<{ success: boolean; data: CreditCard }>(
    `/credit-card/donor/${donorId}`,
    creditCardData
  );

  if (!response.data.success) {
    throw new Error("Failed to add credit card.");
  }
  return response.data.data;
};

export const deleteCreditCard = async (creditCardId: string): Promise<void> => {
  const response = await API.delete(`/credit-card/${creditCardId}`);
  if (!response.data.success) {
    throw new Error("Failed to delete credit card.");
  }
};
