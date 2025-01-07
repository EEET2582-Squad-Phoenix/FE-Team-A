import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LucideIcon from "@/components/lucide-icon";
import { useUserStore } from "@/store/user-store";
import { signOut } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { ICharityUser, IDonorUser } from "@/types/user";
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

  const isDonorUser = (user: unknown): user is IDonorUser => {
    return !!user && (user as IDonorUser).email !== undefined;
  };

  const isCharityUser = (user: unknown): user is ICharityUser => {
    return !!user && (user as ICharityUser).name !== undefined;
  };

  const userDisplayName = () => {
    if (!currentUser) return "";
    if (isDonorUser(currentUser)) {
      return currentUser.email;
    } else if (isCharityUser(currentUser)) {
      return currentUser.name;
    }
    return "";
  };

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
      <Button
        variant="ghost"
        className="flex gap-2 items-center border border-black rounded-full p-2"
        onClick={() => setIsDialogOpen(true)}
      >
        <LucideIcon name="Lightbulb" />
        Notification Settings
      </Button>

      <div className="rounded-md flex items-center border border-primary border-solid p-2 h-10 gap-2">
        <Avatar className="h-6 w-6">
          <AvatarImage
            className="rounded-full"
            src={currentUser?.avatarUrl}
            alt={userDisplayName()}
          />
          <AvatarFallback>{avatarFallbackText()}</AvatarFallback>
        </Avatar>
        <p className="text-semibold text-primary text-sm">{userDisplayName()}</p>
      </div>

      <SubscriptionDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />

      <Button
        variant="outline"
        className="flex gap-2 items-center w-full justify-start"
        onClick={() => {
          userSignOut().then(() => router.push("/auth/login"));
        }}
      >
        <LucideIcon name="LogOut" />
        Logout
      </Button>
    </div>
  );
}
