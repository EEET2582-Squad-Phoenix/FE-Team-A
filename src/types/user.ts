// export interface IUser {
//   id: string; 
//   firstName: string; 
//   lastName: string; 
//   email: string; 
//   avatarUrl: string | null; 
//   language: string; 
//   role: "DONOR" | "CHARITY"; 
//   monthlyDonation: number | null; 
//   subscriptions: string[]; 
//   isVerified: boolean; 


//   name: string;
//   address: string;
//   taxCode: string;
//   accountId.role : string;


// }

// Base type for fields common to both user types
export interface IBaseUser {
  monthlyDonation: number;
  accountId: {
    role: "DONOR" | "CHARITY"; //for get info
  };
  id: string;
  avatarUrl: string;
}

// Specific fields for donors
export interface IDonorUser extends IBaseUser {
  firstName: string;
  lastName: string;
  email: string;
  subscriptions: any[]; 
  language: string;
}

// Specific fields for charities
export interface ICharityUser extends IBaseUser {
  name: string;
  address: string;
  taxCode: string;
  organizationType: "INDIVIDUAL" | "COMPANY" | "NON-PROFIT";
  country: "Vietnam" | "USA"| "South Africa"| "Germany" | "Ukraine" | "Israel";
}

export type IUser = IDonorUser | ICharityUser;