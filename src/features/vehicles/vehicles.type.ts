
export type Fuel = "petrol" | "diesel" | "hybrid" | "electric";
export type Gearbox = "auto" | "manual";

export type BodyType = 
| "limousine" 
| "suv" 
| "cabrio" 
| "kombiwagen" 
| "pickup" 
| "van"
| "coupe";

export interface Vehicle {
  id: string;
  slug: string;   
  bodyType: string;          
  brand: string;          
  model: string;          
  year: number;            
  mileage: number;        
  fuel: Fuel;              
  gearbox: Gearbox;        
  powerKW: number;         
  pricePerMonth?: number;
  priceTotal: number;    
  priceNeto: number; 
  images: string[];        
  available: boolean;   
  featured: boolean;   
  technicalData?: Record<string, string>;  
  shortDesc: string;    
  
}
