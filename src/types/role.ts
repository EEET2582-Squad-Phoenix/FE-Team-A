export enum AuthRole {
    ROLE_USER = "ROLE_USER",
    ROLE_ADMIN = "ROLE_ADMIN",
  }
  
  export enum UserRole {
    ROLE_DONOR = "ROLE_DONOR",
    ROLE_CHARITY = "ROLE_CHARITY",
  }
  
  const dictRoleString: Record<string, string> = {
    DONOR: "donor",
    CHARITY: "charity",
  };
  
  export function getRoleString(userRole: UserRole) {
    return dictRoleString[userRole];
  }