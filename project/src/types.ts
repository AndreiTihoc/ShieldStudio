export interface User {
  email: string;
}

export interface BreachData {
  name: string;
  domain: string;
  breachDate: string;
  description: string;
  dataClasses: string[];
  isVerified: boolean;
  isSensitive: boolean;
}