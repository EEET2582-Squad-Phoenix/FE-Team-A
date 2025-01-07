import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LucideIcon from "@/components/lucide-icon";
import { useUserStore } from "@/store/user-store";
import { signOut } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { ICharityUser, IDonorUser } from "@/types/user";

export function UserButton() {
  const { logout, currentUser } = useUserStore();
  const router = useRouter();

  const userSignOut = async () => {
    await signOut();
    logout();
  };

  // Type narrowing to check if the current user is a donor
  const isDonorUser = (user: unknown): user is IDonorUser => {
    return !!user && (user as IDonorUser).email !== undefined;
  };

  // Type narrowing to check if the current user is a charity
  const isCharityUser = (user: unknown): user is ICharityUser => {
    return !!user && (user as ICharityUser).name !== undefined;
  };

  const userDisplayName = () => {
    if (!currentUser) return ""; // Fallback if no user is logged in
    if (isDonorUser(currentUser)) {
      return currentUser.email; // Render email for donors
    } else if (isCharityUser(currentUser)) {
      return currentUser.name; // Render name for charities
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
