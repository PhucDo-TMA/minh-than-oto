"use client";

import Image from "next/image";
import Link from "next/link";
import { Car } from "@/data/cars";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <Link href={`/cars/${car.slug}`}>
      <div className="car-card">
        <div className="car-card-image">
          <Image
            src={car.image}
            alt={car.name}
            width={300}
            height={200}
            className="image"
          />
          <div className="car-badge">{car.category}</div>
        </div>
        
        <div className="car-card-content">
          <h3 className="car-name">{car.name}</h3>
          <p className="car-brand">{car.brand}</p>
          
          <div className="car-specs">
            <span>⚡ {car.specs.power}</span>
            <span>🔧 {car.specs.gearbox}</span>
            <span>📅 {car.year}</span>
          </div>

          <div className="car-footer">
            <p className="car-price">{car.priceFormatted}</p>
            <button className="btn-details">Xem chi tiết →</button>
          </div>
        </div>
      </div>
    </Link>
  );
}
