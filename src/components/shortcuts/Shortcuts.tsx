import React from "react";
import Link from "next/link";
import { DollarSign, FileX, FileText, GalleryVerticalEnd, HandCoins, Earth } from "lucide-react";

const Shortcuts = ({ userRole }: { userRole: string }) => {
  const roleBasedShortcuts: Record<string, { label: string; href: string; icon: React.ReactNode }[]> = {
    organization: [
      { label: "Create New Project", href: "/charity/projects/new", icon: <FileText /> },
      { label: "All Owned Projects", href: "/charity/projects", icon: <GalleryVerticalEnd /> },
      { label: "Manage Credit Card Info", href: "/charity/credit-card", icon: <DollarSign /> },
      { label: "Halted Projects", href: "/charity/projects/deleted", icon: <FileX /> },
    ],
    donor: [
      { label: "All Projects", href: "/donor/projects", icon: <FileText /> },
      { label: "Your Donations", href: "/donor/donation", icon: <HandCoins /> },
      { label: "Manage Subscription", href: "/donor/donation", icon: <Earth /> },
    ],
  };

  const shortcuts = roleBasedShortcuts[userRole] || [];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {shortcuts.map((shortcut) => (
        <Link
          key={shortcut.label}
          href={shortcut.href}
          className="flex flex-col items-center p-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-105 hover:shadow-md rounded-lg text-white transition-all"
        >
          <div className="p-2 bg-white text-indigo-500 rounded-full mb-2">
            {shortcut.icon}
          </div>
          <span className="font-semibold">{shortcut.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default Shortcuts;
