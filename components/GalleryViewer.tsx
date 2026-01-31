"use client";

import { useState, useEffect } from "react";

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
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);

  const displayImage = images.length > 0 ? images[currentIndex] : mainImage;

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const goToPrevious = () => {
    setIsTransitioning(true);
    setOffsetX(0);
    setOffsetY(0);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      setIsTransitioning(false);
    }, 150);
  };

  const goToNext = () => {
    setIsTransitioning(true);
    setOffsetX(0);
    setOffsetY(0);
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
    setOffsetX(0);
    setOffsetY(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    setDragStartX(e.clientX - offsetX);
    setDragStartY(e.clientY - offsetY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStartX;
    const newY = e.clientY - dragStartY;
    setOffsetX(newX);
    setOffsetY(newY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleImageClick = () => {
    if (zoomLevel < 2) {
      setZoomLevel(zoomLevel + 0.5);
    } else {
      setZoomLevel(1);
      setOffsetX(0);
      setOffsetY(0);
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
      setIsDragging(false);
    } else if (e.touches.length === 1) {
      if (zoomLevel > 1) {
        // Dragging mode for zoomed image
        e.preventDefault();
        setIsDragging(true);
        setDragStartX(e.targetTouches[0].clientX - offsetX);
        setDragStartY(e.targetTouches[0].clientY - offsetY);
      } else {
        // Swipe mode for navigation
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
        setIsDragging(false);
      }
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
      if (isDragging && zoomLevel > 1) {
        // Drag to pan
        e.preventDefault();
        const newX = e.targetTouches[0].clientX - dragStartX;
        const newY = e.targetTouches[0].clientY - dragStartY;
        setOffsetX(newX);
        setOffsetY(newY);
      } else if (!isDragging && zoomLevel === 1) {
        // Swipe navigation
        setTouchEnd(e.targetTouches[0].clientX);
      }
    }
  };

  const handleLightboxTouchEnd = () => {
    setPinchStartDistance(null);
    setIsDragging(false);
    
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
            <img
              src={displayImage}
              alt={carName}
              className="image"
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
                <img
                  src={img}
                  alt={`${carName} ${idx + 1}`}
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

            <button
              className="lightbox-nav lightbox-prev"
              onClick={goToPrevious}
              aria-label="Previous image"
              disabled={isTransitioning}
            >
              ◀
            </button>
            
            <div 
              className="lightbox-image" 
              style={{ 
                opacity: isTransitioning ? 0.3 : 1, 
                transform: `scale(${zoomLevel}) translate(${offsetX}px, ${offsetY}px)`,
                cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : (zoomLevel < 3 ? 'zoom-in' : 'zoom-out'),
                userSelect: isDragging ? 'none' : 'auto'
              }} 
              onClick={handleImageClick} 
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <img
                src={displayImage}
                alt={carName}
                className="zoomed-image"
                draggable={false}
              />
            </div>

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

        .lightbox-content {
          position: relative;
          max-width: 95vw;
          max-height: 95vh;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          touch-action: pan-x;
          user-select: none;
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
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.6);
          flex-shrink: 0;
          z-index: 1000;
        }

        .lightbox-prev {
          left: 1rem;
        }

        .lightbox-next {
          right: 1rem;
        }

        .lightbox-nav:hover {
          background: rgba(37, 99, 235, 1);
          border-color: rgba(255, 255, 255, 1);
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.8);
        }

        .lightbox-nav:active {
          transform: translateY(-50%) scale(0.95);
        }

        .lightbox-nav:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .lightbox-nav-container {
          display: none;
        }

        .lightbox-image {
          max-width: 90vw;
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
          width: 100%;
          height: 100%;
          object-fit: contain;
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

          .lightbox-nav {
            width: 45px;
            height: 45px;
            font-size: 1.2rem;
            padding: 0.25rem;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.5);
          }

          .lightbox-prev {
            left: 0.5rem;
          }

          .lightbox-next {
            right: 0.5rem;
          }

          .lightbox-nav:hover {
            transform: translateY(-50%) scale(1.1);
          }

          .lightbox-nav:active {
            transform: translateY(-50%) scale(0.95);
          }

          .lightbox-close {
            font-size: 1.5rem;
            width: 45px;
            height: 45px;
            top: 1rem;
            right: 1rem;
          }

          .lightbox-content {
            gap: 0;
            flex-direction: row;
            width: 100%;
            padding: 0;
            position: relative;
          }

          .lightbox-image {
            max-width: 100%;
            max-height: 80vh;
            flex: 1;
          }

          .lightbox-nav-container {
            display: none;
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

