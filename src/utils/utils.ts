import { AuthRole, UserRole } from "@/types/role";

export function getUserImg(authRole: AuthRole, userRole: UserRole) {
  switch (authRole) {
    case AuthRole.ROLE_USER:
      switch (userRole) {
        case UserRole.ROLE_DONOR:
          return "/avatar/farmer.png";
       //add role here later
        default:
          return "/avatar/farmer.png";
      }
    case AuthRole.ROLE_ADMIN:
      return "/avatar/admin.png";
  }
}

interface ImageLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

export const imageLoader = ({
  src,
  width,
  quality = 75,
}: ImageLoaderParams): string => `${src}?w=${width}&q=${quality}`;