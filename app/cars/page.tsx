"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import CarCard from "@/components/CarCard";
import { cars, Car } from "@/data/cars";

export default function CarsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000000]);

  const categories = ["Tất cả", "Sedan", "SUV", "Bán tải", "Hatchback"];

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchSearch =
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory =
        selectedCategory === "Tất cả" || car.category === selectedCategory;

      const matchPrice =
        car.price >= priceRange[0] && car.price <= priceRange[1];

      return matchSearch && matchCategory && matchPrice;
    });
  }, [searchTerm, selectedCategory, priceRange]);

  return (
    <div className="cars-page">
      <div className="cars-header">
        <h1>Danh sách xe</h1>
        <p>Tìm xe ô tô phù hợp với bạn</p>
      </div>

      <div className="cars-container">
        <aside className="cars-sidebar">
          <h3>Bộ lọc</h3>

          {/* Tìm kiếm */}
          <div className="filter-group">
            <label>Tìm kiếm</label>
            <input
              type="text"
              placeholder="Tên xe hoặc hãng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Danh mục */}
          <div className="filter-group">
            <label>Loại xe</label>
            <div className="category-list">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`category-btn ${
                    selectedCategory === cat ? "active" : ""
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Phạm vi giá */}
          <div className="filter-group">
            <label>Giá từ - đến</label>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Từ"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), priceRange[1]])
                }
                className="price-input"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Đến"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                className="price-input"
              />
            </div>
          </div>
        </aside>

        <main className="cars-main">
          <div className="results-info">
            <p>Tìm thấy <strong>{filteredCars.length}</strong> xe</p>
          </div>

          {filteredCars.length > 0 ? (
            <div className="cars-grid">
              {filteredCars.map((car) => (
                <CarCard key={car.slug} car={car} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>Không tìm thấy xe phù hợp với điều kiện lọc</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("Tất cả");
                  setPriceRange([0, 2000000000]);
                }}
                className="btn-reset"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
