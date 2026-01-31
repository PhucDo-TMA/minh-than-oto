"use client";

import { useState, useEffect } from "react";
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
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pinchStartDistance, setPinchStartDistance] = useState<number | null>(null);
  const [pinchStartZoom, setPinchStartZoom] = useState(1);

  const displayImage = images.length > 0 ? images[currentIndex] : mainImage;

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const goToPrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      setIsTransitioning(false);
    }, 150);
  };

  const goToNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      setIsTransitioning(false);
    }, 150);
  };

  const selectImage = (index: number) => {
    setCurrentIndex(index);
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setZoomLevel(1);
  };

  const handleImageClick = () => {
    if (zoomLevel < 2) {
      setZoomLevel(zoomLevel + 0.5);
    } else {
      setZoomLevel(1);
    }
  };

  const getDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleLightboxTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      setPinchStartDistance(getDistance(e.touches));
      setPinchStartZoom(zoomLevel);
      setTouchStart(null);
      setTouchEnd(null);
    } else if (e.touches.length === 1) {
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientX);
    }
  };

  const handleLightboxTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchStartDistance !== null) {
      e.preventDefault();
      const currentDistance = getDistance(e.touches);
      const scale = currentDistance / pinchStartDistance;
      const newZoom = Math.min(3, Math.max(1, pinchStartZoom * scale));
      setZoomLevel(newZoom);
    } else if (e.touches.length === 1) {
      setTouchEnd(e.targetTouches[0].clientX);
    }
  };

  const handleLightboxTouchEnd = () => {
    setPinchStartDistance(null);
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && zoomLevel === 1) {
      goToNext();
    } else if (isRightSwipe && zoomLevel === 1) {
      goToPrevious();
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!isLightboxOpen) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    const newZoom = Math.min(3, Math.max(1, zoomLevel + delta));
    setZoomLevel(newZoom);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLightboxOpen]);

  return (
    <div className="gallery-wrapper">
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

          <div className="main-image" onClick={openLightbox}>
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
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div 
            className="lightbox-content" 
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleLightboxTouchStart}
            onTouchMove={handleLightboxTouchMove}
            onTouchEnd={handleLightboxTouchEnd}
          >
            <button className="lightbox-close" onClick={closeLightbox}>
              ✕
            </button>
            
            <div className="lightbox-image" style={{ opacity: isTransitioning ? 0.3 : 1, transform: `scale(${zoomLevel})`, cursor: zoomLevel < 3 ? 'zoom-in' : 'zoom-out' }} onClick={handleImageClick} onWheel={handleWheel}>
              <Image
                src={displayImage}
                alt={carName}
                width={1200}
                height={800}
                className="zoomed-image"
              />
            </div>

            <div className="lightbox-nav-container">
              <button
                className="lightbox-nav lightbox-prev"
                onClick={goToPrevious}
                aria-label="Previous image"
                disabled={isTransitioning}
              >
                ◀
              </button>
              
              <button
                className="lightbox-nav lightbox-next"
                onClick={goToNext}
                aria-label="Next image"
                disabled={isTransitioning}
              >
                ▶
              </button>
            </div>
          </div>
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
          cursor: zoom-in;
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

        /* Lightbox Styles */
        .lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          cursor: zoom-out;
          touch-action: none;
        }

        .lightbox-content {
          position: relative;
          max-width: 95vw;
          max-height: 95vh;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          touch-action: pan-x;
          user-select: none;
        }

        .lightbox-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(220, 38, 38, 0.9);
          color: white;
          border: 3px solid rgba(255, 255, 255, 0.8);
          font-size: 2rem;
          cursor: pointer;
          z-index: 10000;
          padding: 0.5rem 0.75rem;
          line-height: 1;
          transition: all 0.3s ease;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.6);
        }

        .lightbox-close:hover {
          background: rgba(220, 38, 38, 1);
          border-color: rgba(255, 255, 255, 1);
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(220, 38, 38, 0.8);
        }

        .lightbox-close:active {
          transform: scale(0.95);
        }

        .lightbox-nav {
          background: rgba(37, 99, 235, 0.9);
          color: white;
          border: 3px solid rgba(255, 255, 255, 0.8);
          font-size: 2rem;
          padding: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 50%;
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: static;
          transform: none;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.6);
        }

        .lightbox-nav:hover {
          background: rgba(37, 99, 235, 1);
          border-color: rgba(255, 255, 255, 1);
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.8);
        }

        .lightbox-nav:active {
          transform: scale(0.95);
        }

        .lightbox-nav:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .lightbox-nav-container {
          display: flex;
          gap: 1rem;
          align-items: center;
          justify-content: center;
        }

        .lightbox-image {
          max-width: 80vw;
          max-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.3s ease;
          transform-origin: center;
          overflow: hidden;
          border-radius: 8px;
          touch-action: none;
        }

        .zoomed-image {
          width: auto !important;
          height: auto !important;
          max-width: 100%;
          max-height: 90vh;
          object-fit: contain;
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

          .lightbox-nav {
            width: 55px;
            height: 55px;
            font-size: 1.8rem;
            padding: 0.5rem;
            gap: 1rem;
            opacity: 1;
            box-shadow: 0 6px 16px rgba(37, 99, 235, 0.7);
          }

          .lightbox-close {
            font-size: 1.5rem;
            width: 45px;
            height: 45px;
            top: 1rem;
            right: 1rem;
          }

          .lightbox-content {
            gap: 0.5rem;
            flex-direction: column;
            width: 100%;
            padding: 0 1rem;
          }

          .lightbox-image {
            max-width: 100%;
            max-height: 70vh;
            order: 2;
          }

          .lightbox-nav-container {
            order: 3;
            gap: 1.5rem;
          }

          .lightbox-nav {
            position: static;
            display: inline-flex;
          }

          .lightbox-close {
            order: 1;
            align-self: flex-end;
            margin-bottom: 1rem;
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

