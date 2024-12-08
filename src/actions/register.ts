import { IUser } from "@/types/user";
import API from "@/utils/axiosClient";

export async function userRegister(values: {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  userRole: string;
  password: string;
}) {
  try {
    const res = await API.post<{ message: string; dto: IUser }>(
      "/auth/register",
      {
        ...values,
      },
    );
    return res;
  } catch (error) {
    throw error;
  }
}