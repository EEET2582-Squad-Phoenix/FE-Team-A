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

export function extractRoleInfo(data: any): IUser {
  const { role } = data; // Extract role from the root level

  if (role === "DONOR") {
    const donorUser: IDonorUser = {
      role: "DONOR",
      id: data.data.id,
      firstName: data.data.firstName,
      lastName: data.data.lastName,
      email: data.email,
      avatarUrl: data.data.avatarUrl ,
      introVidUrl: data.data.introVidUrl || null,
      address: data.data.address || null,
      language: data.data.language,
      monthlyDonation: data.data.monthlyDonation,
      subscriptions: data.data.subscriptions || [],
      stripeCustomerId: data.data.stripeCustomerId || null,
      account: data.account || null,
    };
    return donorUser;
  } else if (role === "CHARITY") {
    const charityUser: ICharityUser = {
      role: "CHARITY",
      id: data.data.id,
      name: data.data.name,
      email: data.email,
      logoUrl: data.data.logoUrl || [],
      introVidUrl: data.data.introVidUrl || [],
      displayedLogo: data.data.displayedLogo || null,
      displayedIntroVid: data.data.displayedIntroVid || null,
      address: data.data.address,
      taxCode: data.data.taxCode,
      type: data.data.type,
      monthlyDonation: data.data.monthlyDonation,
      account: data.account || null,
    };
    return charityUser;
  } else {
    throw new Error("Unknown role in extractRoleInfo");
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
    const response = await fetch("http://localhost:8080/auth/get-me", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user profile: ${response.statusText}`);
    }

    const rawData = await response.json();
    return extractRoleInfo(rawData);
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return null;
  }
}