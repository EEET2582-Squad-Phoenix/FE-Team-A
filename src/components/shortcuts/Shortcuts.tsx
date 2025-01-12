import React from "react";
import Link from "next/link";
import { DollarSign, FileX, FileText, GalleryVerticalEnd, HandCoins, Earth, CreditCard } from "lucide-react";

const Shortcuts = ({ userRole }: { userRole: string }) => {
  const roleBasedShortcuts: Record<string, { label: string; href: string; icon: React.ReactNode }[]> = {
    organization: [
      { label: "Create New Project", href: "/organization/projects", icon: <FileText /> },
      { label: "All Owned Projects", href: "/organization/projects", icon: <GalleryVerticalEnd /> },
      { label: "Manage Credit Card Info", href: "/organization/credit-card", icon: <DollarSign /> },
      { label: "Halted Projects", href: "/organization/projects/deleteShard", icon: <FileX /> },
    ],
    donor: [
      { label: "All Projects", href: "/donor/projects", icon: <FileText /> },
      { label: "Your Donations", href: "/donor/donation", icon: <HandCoins /> },
      { label: "Manage Subscription", href: "/donor/donation", icon: <Earth /> },
      { label: "Your Credit Card", href: "/donor/credit-card", icon: <CreditCard /> },
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
