"use client";

import { useState, useMemo, useEffect } from "react";
import CarCard from "@/components/CarCard";
import { cars } from "@/data/cars";

const ITEMS_PER_PAGE = 12;

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Filter cars based on search
  const filteredCars = useMemo(() => {
    return cars
      .filter((car) =>
        car.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCars = filteredCars.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Reset to page 1 when search changes
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="home">
      <section className="cars-list-section">
        <div className="section-header">
          <h1>Danh sách xe ô tô</h1>
          <p>{filteredCars.length} chiếc xe có sẵn</p>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Tìm kiếm tên xe..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        {/* Cars Grid */}
        <div className="cars-grid">
          {paginatedCars.length > 0 ? (
            paginatedCars.map((car) => (
              <CarCard key={car.slug} car={car} />
            ))
          ) : (
            <div className="no-results">
              <p>Không tìm thấy xe nào phù hợp với tìm kiếm của bạn</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              ← Trang trước
            </button>

            <div className="pagination-info">
              Trang {currentPage} / {totalPages}
            </div>

            <button
              className="pagination-btn"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Trang sau →
            </button>
          </div>
        )}
      </section>
    </div>
  );
}