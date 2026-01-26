"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryViewerProps {
  images: string[];
  carName: string;
  mainImage: string;
}

export default function GalleryViewer({
  images,
  carName,
  mainImage,
}: GalleryViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const displayImage = images.length > 0 ? images[currentIndex] : mainImage;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const selectImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="gallery-viewer">
      {/* Main Image Carousel */}
      <div className="carousel-container">
        <button
          className="carousel-nav prev"
          onClick={goToPrevious}
          aria-label="Previous image"
        >
          ◀
        </button>

        <div className="main-image">
          <Image
            src={displayImage}
            alt={carName}
            width={700}
            height={450}
            className="image"
            priority
          />
        </div>

        <button
          className="carousel-nav next"
          onClick={goToNext}
          aria-label="Next image"
        >
          ▶
        </button>
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="gallery-thumbs">
          {images.map((img, idx) => (
            <button
              key={idx}
              className={`thumb ${idx === currentIndex ? "active" : ""}`}
              onClick={() => selectImage(idx)}
              title={`Hình ${idx + 1}`}
            >
              <Image
                src={img}
                alt={`${carName} ${idx + 1}`}
                width={120}
                height={90}
                className="thumb-image"
              />
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        .gallery-viewer {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
        }

        .carousel-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          background: transparent;
          border-radius: 12px;
          padding: 0;
          position: relative;
          min-height: 450px;
          overflow: hidden;
        }

        .main-image {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border-radius: 0;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          width: 100%;
          height: 100%;
        }

        .image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .carousel-nav {
          background: rgba(37, 99, 235, 0.7);
          color: white;
          border: none;
          border-radius: 6px;
          width: 40px;
          height: 40px;
          font-size: 1.1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          flex-shrink: 0;
          box-shadow: none;
          position: absolute;
          z-index: 10;
          top: 50%;
          transform: translateY(-50%);
        }

        .carousel-nav.prev {
          left: 0.75rem;
        }

        .carousel-nav.next {
          right: 0.75rem;
        }

        .carousel-nav:hover {
          background: rgba(37, 99, 235, 0.9);
          transform: translateY(-50%) scale(1.1);
        }

        .carousel-nav:active {
          transform: translateY(-50%) scale(0.95);
        }

        .gallery-thumbs {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          padding: 0.5rem;
          background: #f9fafb;
          border-radius: 8px;
          padding: 1rem;
        }

        .thumb {
          position: relative;
          border: 3px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          flex-shrink: 0;
          width: 120px;
          height: 90px;
          padding: 0;
          background: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .thumb:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
          border-color: #2563eb;
        }

        .thumb.active {
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15), 0 4px 12px rgba(37, 99, 235, 0.3);
          transform: scale(1.05);
        }

        .thumb-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 768px) {
          .carousel-container {
            gap: 0.75rem;
            padding: 1rem;
            min-height: 300px;
          }

          .main-image {
            aspect-ratio: auto;
            width: 100%;
            height: 250px;
          }

          .carousel-nav {
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }

          .gallery-thumbs {
            gap: 0.75rem;
            padding: 0.75rem;
          }

          .thumb {
            width: 100px;
            height: 75px;
          }
        }

        @media (max-width: 480px) {
          .carousel-container {
            flex-direction: column;
            gap: 0.5rem;
            padding: 0.75rem;
            min-height: auto;
          }

          .carousel-nav {
            position: absolute;
            width: 36px;
            height: 36px;
            font-size: 0.9rem;
          }

          .carousel-nav.prev {
            left: 0.5rem;
            top: 50%;
            transform: translateY(-50%);
          }

          .carousel-nav.next {
            right: 0.5rem;
            top: 50%;
            transform: translateY(-50%);
          }

          .main-image {
            height: 200px;
            width: 100%;
          }

          .gallery-thumbs {
            gap: 0.5rem;
            justify-content: flex-start;
            overflow-x: auto;
            padding: 0.5rem;
          }

          .thumb {
            width: 80px;
            height: 60px;
          }
        }
      `}</style>
    </div>
  );
}

