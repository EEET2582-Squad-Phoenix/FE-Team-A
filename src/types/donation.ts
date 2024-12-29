
export interface IDonation {
    id: number;
    projectName: string;
    date: string; // could change this to DATE
    amount: number; 
    message?: string; // Optional message attached to the donation
  }
  
 
  export interface IRecurringDonation {
    id: number;
    projectName: string;
    amount: number; 
    nextDate: string; // ISO-8601 date string for the next scheduled payment. // could change this to DATE
  }
  