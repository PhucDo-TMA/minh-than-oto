"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Contact Info Bar */}
      <div className="contact-info-bar">
        <div className="contact-info-container">
          <div className="contact-item">
            <span className="contact-icon">📍</span>
            <span>507 QL1A, KP18, Bình Tân, Thành phố Hồ Chí Minh, Vietnam</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <a href="tel:0936211276">0936 211 276 (Thân)</a>
            <span className="separator">·</span>
            <a href="tel:0342579086">034 2579 086 (Phúc)</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="header">
        <div className="header-container">
          <Link href="/" className="logo">
            <div className="logo-image">
              <Image
                src="/logo-car.png"
                alt="Minh Thân Ô Tô Logo"
                width={50}
                height={30}
                priority
              />
            </div>
            <span className="logo-text">MINH THÂN Ô TÔ</span>
          </Link>

          <nav className="nav-desktop">
            <Link href="/" className="nav-link">
              Trang chủ
            </Link>
            <Link href="/cars" className="nav-link">
              Xe đang bán
            </Link>
            <Link href="/contact" className="nav-link">
              Liên hệ
            </Link>
          </nav>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="nav-mobile">
            <Link href="/" className="nav-link">
              Trang chủ
            </Link>
            <Link href="/cars" className="nav-link">
              Xe đang bán
            </Link>
            <Link href="/contact" className="nav-link">
              Liên hệ
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}