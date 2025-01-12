import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LucideIcon from "@/components/lucide-icon";
import { useUserStore } from "@/store/user-store";
import { signOut } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { IUser, ICharityUser, IDonorUser } from "@/types/user";
import { useState } from "react";
import { SubscriptionDialog } from "@/app/donor/dashboard/_component/SubscriptionDialog";

export function UserButton() {
  const { logout, currentUser } = useUserStore();
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const userSignOut = async () => {
    await signOut();
    logout();
  };

  // Type guards for identifying user roles
  const isDonorUser = (user: IUser | null): user is IDonorUser => {
    return user?.role === "DONOR";
  };

  const isCharityUser = (user: IUser | null): user is ICharityUser => {
    return user?.role === "CHARITY";
  };

  // Display the user name based on their role
  const userDisplayName = () => {
    if (!currentUser) return "";
    if (isDonorUser(currentUser)) {
      return currentUser.firstName;
    } else if (isCharityUser(currentUser)) {
      return currentUser.name;
    }
    return "";
  };

  // Avatar image URL or fallback to role-specific defaults
  const avatarImageUrl = () => {
    if (isDonorUser(currentUser)) {
      return currentUser.avatarUrl || getUserImgFromType("DONOR");
    } else if (isCharityUser(currentUser)) {
      return currentUser.logoUrl[0] || getUserImgFromType("CHARITY");
    }
    return "";
  };

  // Fallback text for the avatar
  const avatarFallbackText = () => {
    if (!currentUser) return "?";
    if (isDonorUser(currentUser)) {
      return currentUser.firstName?.charAt(0).toUpperCase() || "D";
    } else if (isCharityUser(currentUser)) {
      return currentUser.name?.charAt(0).toUpperCase() || "C";
    }
    return "?";
  };

  return (
    <div className="h-full items-center gap-2 hidden sm:flex">
      {isDonorUser(currentUser) && (
        <>
          <Button
            variant="ghost"
            className="flex gap-2 items-center border border-black rounded-full p-2"
            onClick={() => setIsDialogOpen(true)}
          >
            <LucideIcon name="Lightbulb" />
            Notification Settings
          </Button>
          <SubscriptionDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
          />
        </>
      )}

      <div className="rounded-md flex items-center border border-primary border-solid p-2 h-10 gap-2">
        <Avatar className="h-6 w-6">
          <AvatarImage
            className="rounded-full"
            src={avatarImageUrl()}
            alt={userDisplayName()}
          />
          <AvatarFallback>{avatarFallbackText()}</AvatarFallback>
        </Avatar>
        <p className="text-semibold text-primary text-sm">{userDisplayName()}</p>
      </div>

      <Button
        variant="outline"
        className="flex gap-2 items-center w-full justify-start"
        onClick={() => {
          userSignOut().then(() => router.push("http://localhost:3000"));
        }}
      >
        <LucideIcon name="LogOut" />
        Logout
      </Button>
    </div>
  );
}


//Fall back images for testing
function getUserImgFromType(userType: "DONOR" | "CHARITY"): string {
  switch (userType) {
    case "DONOR":
      return "/gura.jpg";
    case "CHARITY":
      return "/mumei.jpg";
    default:
      return "";
  }
}
