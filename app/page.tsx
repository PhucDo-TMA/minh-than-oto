"use client";

import CarCard from "@/components/CarCard";
import { cars } from "@/data/cars";

export default function Home() {
  return (
    <div className="home">
      <section className="cars-list-section">
        <div className="section-header">
          <h1>Danh sách xe ô tô</h1>
          <p>{cars.length} chiếc xe có sẵn</p>
        </div>
        <div className="cars-grid">
          {cars.map((car) => (
            <CarCard key={car.slug} car={car} />
          ))}
        </div>
      </section>
    </div>
  );
}