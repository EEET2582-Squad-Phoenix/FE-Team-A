import { IUser } from "@/types/user";
import API from "@/utils/axiosClient";

export async function userRegister(values: {
  firstName: string;
  lastName: string;
  email: string;
  userRole: string;
  password: string;
}) {
  try {
    const res = await API.post<{ message: string; dto: IUser }>(
      "api/auth/signup",
      {
        ...values,
      },
    );
    return res;
  } catch (error) {
    throw error;
  }
}