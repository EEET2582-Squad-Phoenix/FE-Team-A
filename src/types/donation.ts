
export interface IDonation {
    id: number;
    projectName: string;
    date: string; 
    amount: number; 
    isRecurring: boolean;
    message?: string; 
    createdAt: string;
    donor: string;
  }
  
  export interface DonationResponse {
    donations: IDonation[]; 
  }
  
  export interface IRecurringDonation {
    id: string; 
    projectName: string;
    amount: number;
    message?: string;
    isRecurring: boolean;
    status: string;
    nextBillingDate: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface RecurringDonationResponse {
    success: boolean;
    data: { donation: IRecurringDonation }[];
  }
  