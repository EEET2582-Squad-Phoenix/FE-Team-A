import API from "@/utils/axiosClient";
import { ICharityUser, IDonorUser, IUser } from "@/types/user";

export async function signOut(): Promise<void> {
  try {
    await API.post("api/auth/logout", {}, { withCredentials: true });
    console.log("User successfully logged out.");
  } catch (error) {
    console.error("Failed to sign out:", error);
  }
}

export function extractRoleInfo(user: IUser): IUser {
  if (user.accountId.role === "DONOR") {
    const donorUser = user as IDonorUser; // Typecast to Donor
    return {
      ...donorUser,
      avatarUrl: donorUser.avatarUrl || getUserImgFromType(user.accountId.role),
    };
  } else if (user.accountId.role === "CHARITY") {
    const charityUser = user as ICharityUser; // Typecast to Charity
    return {
      ...charityUser,
      avatarUrl: getUserImgFromType(user.accountId.role), 
    };
  } else {
    throw new Error("Unknown role in extractRoleInfo");
  }
}

export function getUserImgFromType(userType: IUser["accountId"]["role"]): string {
  switch (userType) {
    case "DONOR":
      return "/gura.jpg";
    case "CHARITY":
        return "/mumei.jpg";
    default:
      return "";
  }
}

export async function login(values: { email: string; password: string }): Promise<void> {
  try {
    await API.post("/api/auth/login", values, { withCredentials: true });
  } catch (error) {
    console.error("Login failed:", error);
    throw error;  
  }
}


export async function getMe(): Promise<IUser | null> {
  try {
    const res = await API.get<IUser>("api/auth/me", {
      withCredentials: true,
    });
    console.log(res.data);
    return extractRoleInfo(res.data);
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return null;
  }
}


