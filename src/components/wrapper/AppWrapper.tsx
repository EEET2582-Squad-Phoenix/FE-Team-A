"use client";
import { useEffect } from "react";
import { useUserStore } from "@/store/user-store";
import { usePathname } from "next/navigation"; 

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const { fetchCurrentUser, currentUser } = useUserStore();
  const pathname = usePathname();  // Get current route path

  useEffect(() => {
    
    if (pathname.includes("/auth")) {
      return;  // Skip fetchCurrentUser if on login/signup pages
    }

    // Only fetch user if there's no user set
    if (!currentUser) {
      fetchCurrentUser();
    }
  }, [fetchCurrentUser, currentUser, pathname]); 

  return <>{children}</>;
}
