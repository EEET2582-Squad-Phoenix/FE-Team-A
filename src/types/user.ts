export interface IUser {
  _id: string; 
  firstName: string; 
  lastName: string; 
  email: string; 
  avatarUrl: string | null; 
  language: string; 
  userType: "DONOR" | "ORGANIZATION"; 
  monthlyDonation: number | null; 
  subscriptions: string[]; 
  isVerified: boolean; 
}

export interface ResIUser {
  message: string;
  error?: string;
  dto: IUser;
}

export interface JWTPayload {
  accountId: string; 
  email: string;  
  iat: number; 
  exp: number; 
}