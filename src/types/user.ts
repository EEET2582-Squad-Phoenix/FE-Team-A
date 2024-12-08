import { AuthRole, UserRole } from "@/types/role";

export interface IUser {
  id: string;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string;
  authRole: "ROLE_USER" | "ROLE_ADMIN";
  userRole: "ROLE_DONOR" | "ROLE_ORGANIZATION";
  accessToken: string;
}

export interface ResIUser {
  message: string;
  error?: string;
  dto: IUser;
}

//CHANGE TO JWS
export interface JWSPayload {
  authRole: AuthRole;
  userRole: UserRole;
  sub: string;
  iat: number;
  exp: number;
}