"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useSidebarToggle } from "@/store/use-sidebar-toggle";
import { useUserStore } from "@/store/user-store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarToggle } from "./SidebarToggle";
import { Home, BarChart, CreditCard, Folder, Trash, Users, HandCoins } from "lucide-react";

export function Sidebar() {
  const sidebar = useSidebarToggle();
  const { isLoading } = useUserStore();
  const pathname = usePathname();

  // Define navigation items for each role
  const navigation = {
    DONOR: [
      { name: "Dashboard", path: "/donor/dashboard", icon: <Home size={20} /> },
      { name: "Projects", path: "/donor/projects", icon: <Folder size={20} /> },
      { name: "My Donation", path: "/donor/donation", icon: <HandCoins size={20} /> },
      { name: "My Cards", path: "/donor/credit-card", icon: <CreditCard size={20} /> },
    ],
    CHARITY: [
      { name: "Dashboard", path: "/organization/dashboard", icon: <Home size={20} /> },
      { name: "Projects", path: "/organization/projects", icon: <Folder size={20} /> },
      { name: "Donations Overview", path: "/organization/donations", icon: <BarChart size={20} /> },
      { name: "Credit Card Info", path: "/organization/credit-card", icon: <CreditCard size={20} /> },
      { name: "Deleted Shard", path: "/organization/projects/deleted", icon: <Trash size={20} /> },
      { name: "Statistics", path: "/organization/statistics", icon: <Users size={20} /> },
    ],
    GUEST: [
      { name: "Home", path: "/projects", icon: <Home size={20} /> }
    ],
  };

  const navItems = React.useMemo(() => {
    if (isLoading) return []; 

    const baseRole = pathname.startsWith("/donor")
      ? "DONOR"
      : pathname.startsWith("/organization")
      ? "CHARITY"
      : "GUEST";

    return baseRole === "DONOR"
      ? navigation.DONOR
      : baseRole === "CHARITY"
      ? navigation.CHARITY
      : navigation.GUEST;
  }, [pathname, isLoading]);

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        `
          fixed left-0 top-0 z-20 h-full -translate-x-full border-r transition-[width] duration-300 ease-in-out
          lg:translate-x-0 bg-gradient-to-r from-teal-500 to-cyan-500 text-white
        `,
        sidebar?.isOpen === false ? "w-[68px]" : "w-60"
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />

      <div className="relative h-full flex flex-col overflow-y-auto shadow-md dark:shadow-zinc-800">
        <div className="flex items-center justify-center gap-2 h-16 p-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={`/Logo.svg`}
              alt="Application Logo"
              width="32"
              height="32"
            />
            <h1
              className={cn(
                "font-bold text-xl tracking-wide text-white transition-[transform,opacity,display] ease-in-out duration-300",
                sidebar?.isOpen === false
                  ? "-translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100"
              )}
            >
              Charitan
            </h1>
          </Link>
        </div>
        <Separator className="flex-grow-0" />

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-3 mt-5 px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={cn(
                "flex items-center gap-4 p-3 rounded-lg  text-sm font-medium transition-all duration-250 ease-in-out",
                pathname === item.path
                  ? "bg-indigo-600 text-white font-extrabold scale-105"
                  : "text-white font-bold hover:bg-indigo-700 hover:scale-105"
              )}
            >
              {item.icon}
              <span
                className={cn(
                  "transition-[opacity,display] ease-in-out duration-300",
                  sidebar?.isOpen === false ? "hidden" : "block"
                )}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
