
export type Fuel = "petrol" | "diesel" | "hybrid" | "electric";
export type Gearbox = "auto" | "manual";

export interface Vehicle {
  id: string;
  slug: string;            
  brand: string;          
  model: string;          
  year: number;            
  mileage: number;        
  fuel: Fuel;              
  gearbox: Gearbox;        
  powerKW: number;         
  pricePerMonth: number;   
  priceTotal: number;      
  images: string[];        
  available: boolean;   
  featured: boolean;   
  shortDesc: string;       
}
