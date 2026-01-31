import carData from "./cars.json";

export interface Car {
  order: number;
  name: string;
  slug: string;
  image: string;
  year: number;
  price: number;
  priceFormatted: string;
  category: "SUV" | "Sedan" | "Bán tải" | "Hatchback";
  brand: string;
  specs: {
    engine: string;
    power: string;
    gearbox: string;
    acceleration: string;
    topSpeed: string;
    fuelConsumption: string;
  };
  gallery: string[];
  description: string;
  features: string[];
}

export const cars: Car[] = carData as Car[];
