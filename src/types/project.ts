export enum ProjectCategory {
    FOOD = "Food",
    HEALTH = "Health",
    EDUCATION = "Education",
    ENVIRONMENT = "Environment",
    RELIGION = "Religion",
    HUMANITARIAN = "Humanitarian",
    HOUSING = "Housing",
    OTHER = "Other",
  }
  

//  Interface for representing a single project.
   
  export interface IProject {
    id: number;
    title: string;
    description: string;
    category: ProjectCategory; 
    country: string;
    image: string;
    fundStatus: string;
  }
  
  
    // Response interface for a paginated list of projects.
   
  export interface ResProjects {
    message: string;
    error?: string;
    projects: IProject[];
    total: number;
  }
  
  export interface FilterState {
    category: string;
    country: string;
  }