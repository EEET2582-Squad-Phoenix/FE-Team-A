export interface IUser {
  id: string; 
  firstName: string; 
  lastName: string; 
  email: string; 
  avatarUrl: string | null; 
  language: string; 
  role: "DONOR" | "CHARITY"; 
  monthlyDonation: number | null; 
  subscriptions: string[]; 
  isVerified: boolean; 
}

export interface JWTPayload {
  accountId: string; 
  email: string;  
  iat: number; 
  exp: number; 
}