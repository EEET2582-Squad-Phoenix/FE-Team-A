"use client";
import { useEffect } from "react";
import { useUserStore } from "@/store/user-store";
import { usePathname } from "next/navigation"; 

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const { fetchCurrentUser, currentUser } = useUserStore();
  const pathname = usePathname();  

  useEffect(() => {
    
    if (pathname.includes("/guest")) {
      return;  
    }

    if (!currentUser) {
      fetchCurrentUser();
    }
  }, [fetchCurrentUser, currentUser, pathname]); 

  return <>{children}</>;
}
