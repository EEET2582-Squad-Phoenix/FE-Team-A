import { create } from "zustand";
import { IUser } from "@/types/user";
import { getMe } from "@/actions/auth";

type UserState = {
  currentUser: IUser | null; // Stores the logged-in user
  isLoading: boolean;       
};

type UserAction = {
  setCurrentUser: (user: IUser | null) => void;
  logout: () => void;
  login: (user: IUser) => void;
  fetchCurrentUser: () => Promise<void>; // Fetch user from backend
};

type UserStore = UserState & UserAction;

export const useUserStore = create<UserStore>(
  (set): UserStore => ({
    currentUser: null,
    isLoading: false, 

    setCurrentUser: (user: IUser | null) => set({ currentUser: user }),

    logout: () => set({ currentUser: null }),

    // Logs the user in and set data
    login: (user: IUser) => set({ currentUser: user }),

    fetchCurrentUser: async () => {
      set({ isLoading: true }); // Set loading to true before fetch
      try {
        const user = await getMe(); 
        set({ currentUser: user }); 
      } catch (error) {
        console.error("Error fetching current user:", error);
        set({ currentUser: null });
      } finally {
        set({ isLoading: false }); 
      }
    },
  })
);
