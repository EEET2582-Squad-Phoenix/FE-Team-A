import { create } from "zustand";
import { IUser } from "@/types/user";
import { getMe } from "@/actions/auth";

type UserState = {
  currentUser: IUser | null; 
  isLoading: boolean;       
};

type UserAction = {
  setCurrentUser: (user: IUser | null) => void;
  logout: () => void;
  login: (user: IUser) => void;
  fetchCurrentUser: () => Promise<void>; 
};

type UserStore = UserState & UserAction;

export const useUserStore = create<UserStore>(
  (set): UserStore => ({
    currentUser: null,
    isLoading: false, 

    setCurrentUser: (user: IUser | null) => set({ currentUser: user }),

    logout: () => set({ currentUser: null }),

    login: (user: IUser) => set({ currentUser: user }),

    fetchCurrentUser: async () => {
      set({ isLoading: true }); 
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
