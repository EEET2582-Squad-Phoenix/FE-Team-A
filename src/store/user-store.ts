import { create } from "zustand";
import { IUser } from "@/types/user";
import { getMe } from "@/actions/auth";

type UserState = {
  currentUser: IUser | null;
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
    setCurrentUser: (user: IUser | null) => set({ currentUser: user }), 
    logout: () => set({ currentUser: null }), 
    login: (user: IUser) => set({ currentUser: user }),
    fetchCurrentUser: async () => {
      try {
        const user = await getMe(); 
        set({ currentUser: user }); 
      } catch (error) {
        console.error("Error fetching current user:", error);
        set({ currentUser: null }); 
      }
    },
  })
);
