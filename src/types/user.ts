

// Base type for fields common to both user types
export interface IBaseUser {
  id: string;
  monthlyDonation: number;
  email: string;
  account: any | null; // Account can be `null` based on the response
}

// Specific fields for donors
export interface IDonorUser extends IBaseUser {
  role: "DONOR";
  firstName: string;
  lastName: string;
  avatarUrl: string;
  introVidUrl: string | null; 
  address: string | null;
  language: string;
  subscriptions: any[]; 
  stripeCustomerId: string | null;
}

// Specific fields for charities
export interface ICharityUser extends IBaseUser {
  role: "CHARITY";
  name: string;
  logoUrl: string[]; 
  introVidUrl: string[]; 
  displayedLogo: string | null;
  displayedIntroVid: string | null;
  address: string;
  taxCode: string;
  type: "INDIVIDUAL" | "COMPANY" | "NON-PROFIT"; 
}

// Union type for donor and charity users
export type IUser = IDonorUser | ICharityUser;