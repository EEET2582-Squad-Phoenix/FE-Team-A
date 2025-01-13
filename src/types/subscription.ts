export interface ISubscription {
    _id: string; 
    donorId: string; 
    region: "AFRICA" | "EUROPE" | "ASIA" | "AMERICA"; 
    category: "EDUCATION" | "HEALTH" | "RELIGION" | "ENVIRONMENTAL" | "HOUSING" | "OTHER"; 
  }