export enum ProjectCategory {
    FOOD = "Food",
    HEALTH = "Health",
    EDUCATION = "Education",
    ENVIRONMENT = "Environment",
    RELIGION = "Religion",
    HOUSING = "Housing",
    OTHER = "Other",
  }
  
export interface IProject {
  _id: string; // Maps to MongoDB's _id
  charityID: string; // Reference to the Charity object
  name: string; // Project name
  img: string[]; // Array of image URLs
  vid: string[]; // Array of video URLs
  description: string; // Project description
  country: string; // Country where the project is conducted
  status: "UNAPPROVED" | "ACTIVE" | "HALTED" | "INACTIVATED" | "HIDDEN" | "COMPLETED"; // Status of the project
  region: "AFRICA" | "EUROPE" | "ASIA" | "AMERICA"; // Region of the project
  category: "Food" | "Health" | "Education" | "Environment" | "Religion" | "Housing" | "Other"; // Category of the project
  isHighlighted: boolean; // Whether the project is highlighted
  fundStatus: "ON-GOING" | "FULL"; // Fundraising status
  goalAmount: number; // Total goal amount for fundraising
  raisedAmount: number; // Current amount raised
  follower: string[]; // Array of donor IDs following this project
  duration: Date; // Duration of the project
  isVerified: boolean; // Whether the project is verified
  createdAt: Date; // Timestamp for when the project was created
  updatedAt: Date; // Timestamp for when the project was last updated
}

    // Response interface for a paginated list of projects.
   
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