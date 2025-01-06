import { create } from "zustand";
import { IUser } from "@/types/user";
import { getMe } from "@/actions/auth";

type UserState = {
  currentUser: IUser | null; // Stores the logged-in user
  isLoading: boolean;       // Tracks if the user data is being fetched
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
    isLoading: false, // Initialize isLoading to false

    // Action to set current user state
    setCurrentUser: (user: IUser | null) => set({ currentUser: user }),

    // Logs the user out and resets the user state
    logout: () => set({ currentUser: null }),

    // Logs the user in and sets their data
    login: (user: IUser) => set({ currentUser: user }),

    // Fetches the current user data from the server
    fetchCurrentUser: async () => {
      set({ isLoading: true }); // Set loading to true before fetch
      try {
        const user = await getMe(); // Fetch user from backend
        set({ currentUser: user }); // Set user data
      } catch (error) {
        console.error("Error fetching current user:", error);
        set({ currentUser: null }); // Reset user on error
      } finally {
        set({ isLoading: false }); // Always reset loading state
      }
    },
  })
);
