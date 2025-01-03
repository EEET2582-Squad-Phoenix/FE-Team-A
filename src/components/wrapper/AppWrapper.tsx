"use client"
import { useEffect } from "react";
import { useUserStore } from "@/store/user-store";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const { fetchCurrentUser } = useUserStore();

  useEffect(() => {

    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return <>{children}</>;
}
