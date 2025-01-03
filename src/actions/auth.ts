import API from "@/utils/axiosClient";
import { IUser, JWTPayload } from "@/types/user";
import { jwtDecode } from "jwt-decode";

export async function signOut(): Promise<void> {
  try {
    await API.post("api/auth/logout", {}, { withCredentials: true });
    console.log("User successfully logged out.");
  } catch (error) {
    console.error("Failed to sign out:", error);
  }
}

export function decodeJWT(token: string): JWTPayload {
  try {
    return jwtDecode<JWTPayload>(token);
  } catch (e) {
    console.error("Failed to decode token", e);
    throw new Error("Invalid token");
  }
}

export function extractRoleInfo(user: IUser): IUser {
  return {
    ...user,
    // avatarUrl: user.avatarUrl || `/api/users/${user._id}/avatar`, 
    avatarUrl: getUserImgFromType(user.userType),
  };
}

export function getUserImgFromType(userType: IUser["userType"]): string {
  switch (userType) {
    case "DONOR":
      return "/gura.jpg";
    //add role here
    default:
      return "";
  }
}

export async function login(values: { email: string; password: string }): Promise<IUser> {
  const res = await API.post<IUser>("/api/auth/login", values, {
    withCredentials: true,
  });

  return extractRoleInfo(res.data);
}

export async function getMe(): Promise<IUser | null> {
  try {
    const res = await API.get<IUser>("api/auth/me", {
      withCredentials: true,
    });

    return extractRoleInfo(res.data);
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return null;
  }
}

