export enum ProjectCategory {
    FOOD = "FOOD",
    HEALTH = "HEALTH",
    EDUCATION = "EDUCATION",
    ENVIRONMENT = "ENVIRONMENT",
    RELIGION = "RELIGION",
    HOUSING = "HOUSING",
    HUMANITARIAN = "HUMANITARIAN",
    OTHER = "OTHER",
  }
  
export interface IProject {
  _id: string; //for suggested project api
  id: string; 
  charityID: string; 
  name: string; 
  imageURLs: string[]; 
  videoURLs: string[]; 
  description: string; 
  status: "UNAPPROVED" | "ACTIVE" | "HALTED" | "INACTIVATED" | "COMPLETED"; 
  haltedReason: string;
  isGlobal: boolean;
  country: string; 
  continent: string;
  category: ProjectCategory[];
  isHighlighted: boolean; 
  fundStatus: "ON-GOING" | "FULL"; 
  goalAmount: number; 
  raisedAmount: number; 
  follower: string[]; 
  startDate: Date;
  endDate: Date;
  isVerified: boolean; 
  createdAt: Date; 
  updatedAt: Date; 
}
   
  export interface ResProjects {
    message: string;
    error?: string;
    projects: IProject[];
    total: number;
  }
  
  export interface FilterState {
    name: string;
    category: string;
    country: string;
  }