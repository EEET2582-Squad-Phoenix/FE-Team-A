export enum AuthRole {
    ROLE_USER = "ROLE_USER",
    ROLE_ADMIN = "ROLE_ADMIN",
  }
  
  export enum UserRole {
    ROLE_DONOR = "ROLE_DONOR",
    ROLE_ORGANIZATION = "ROLE_ORGANIZATION",
  }
  
  const dictRoleString: Record<string, string> = {
    DONOR: "donor",
    ORGANIZATION: "organization",
  };
  
  export function getRoleString(userRole: UserRole) {
    return dictRoleString[userRole];
  }