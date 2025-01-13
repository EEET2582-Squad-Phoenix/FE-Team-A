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
  thumbnailUrl: string;
  imageURLs: string[]; 
  description: string; 
  status: "UNAPPROVED" | "ACTIVE" | "HALTED" | "INACTIVATED" | "COMPLETED"; 
  isGlobal: boolean;
  country: string; 
  continent: string;
  categories: ProjectCategory[];
  isHighlighted: boolean; 
  fundStatus: "ONGOING" | "FULL"; 
  goalAmount: number; 
  raisedAmount: number; 
  totalDonation: number;
  startDate: Date;
  endDate: Date;
  isVerified: boolean; 
  createdAt: Date; 
  updatedAt: Date; 
  videoURLs: string[]; 
  originalProjectId: string;
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