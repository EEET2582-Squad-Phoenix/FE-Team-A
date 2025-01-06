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

export function Sidebar() {
  const sidebar = useSidebarToggle();
  const { isLoading } = useUserStore();
  const pathname = usePathname();

  // Define navigation items for each role
  const navigation = {
    DONOR: [
      { name: "DONOR Dashboard", path: "/donor/dashboard" },
      { name: "DONOR Projects", path: "/donor/projects" },
      { name: "DONOR My Donation", path: "/donor/donation" },
    ],
    CHARITY: [
      { name: "CHARITY Dashboard", path: "/charity/dashboard" },
      { name: "CHARITY Projects", path: "/charity/projects" },
      { name: "CHARITY Donations Overview", path: "/charity/donations" },
      { name: "CHARITY Credit Card Info", path: "/charity/credit-card" },
      { name: "CHARITY Deleted Shard", path: "/charity/projects/deleted" },
      { name: "CHARITY Statistics", path: "/charity/statistics" },
    ],
    GUEST: [{ name: "Home", path: "/projects" }],
  };

  const navItems = React.useMemo(() => {
    if (isLoading) return []; 

    const baseRole = pathname.startsWith("/donor")
      ? "DONOR"
      : pathname.startsWith("/organization")
      ? "CHARITY"
      : "GUEST";

    // Use the correct navigation based on role
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
          lg:translate-x-0 bg-[#212529] text-white
        `,
        sidebar?.isOpen === false ? "w-[68px]" : "w-60"
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />

      <div className="relative h-full flex flex-col overflow-y-auto shadow-md dark:shadow-zinc-800">
        {/* Add Logo */}
        <div className="flex items-center justify-center gap-2 h-12 p-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={`/Logo.svg`}
              alt="Application Logo"
              width="32"
              height="32"
            />
            <h1
              className={cn(
                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
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
        <nav className="flex flex-col space-y-1 mt-4 px-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={cn(
                "flex items-center gap-3 p-2 rounded-md text-sm font-medium transition-colors duration-200",
                pathname === item.path
                  ? "bg-gray-700 text-white"
                  : "text-white hover:bg-gray-600"
              )}
            >
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
