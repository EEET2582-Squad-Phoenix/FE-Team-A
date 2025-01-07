import API from "@/utils/axiosClient";

export const subscribeUnsubscribe = async (region: string, category: string) => {
  const response = await API.post("/api/donor/subscribe", { region, category });
  return response.data;
};
