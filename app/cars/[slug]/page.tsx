import Image from "next/image";
import Link from "next/link";
import { cars } from "@/data/cars";
import GalleryViewer from "@/components/GalleryViewer";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CarDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const car = cars.find((c) => c.slug === slug);

  if (!car) {
    return (
      <div className="not-found">
        <h1>Xe không tồn tại</h1>
        <p>Xin lỗi, không tìm thấy xe bạn tìm kiếm</p>
        <Link href="/cars" className="btn-back">
          ← Quay lại danh sách
        </Link>
      </div>
    );
  }

  return (
    <div className="car-detail">
      <Link href="/cars" className="btn-back">
        ← Quay lại danh sách
      </Link>

      <div className="detail-container">
        <div className="detail-gallery">
          <GalleryViewer images={car.gallery} carName={car.name} mainImage={car.image} />
        </div>

        <div className="detail-info">
          <div className="header">
            <h1>{car.name}</h1>
            <div className="badge-group">
              <span className="badge-category">{car.category}</span>
              <span className="badge-brand">{car.brand}</span>
            </div>
          </div>

          <p className="description">{car.description}</p>

          <div className="price-section">
            <p className="label">Giá bán:</p>
            <p className="price">{car.priceFormatted}</p>
          </div>

          <div className="specs-grid">
            <h3>Thông số kỹ thuật</h3>
            <div className="specs-list">
              <div className="spec-item">
                <span className="label">Động cơ:</span>
                <span className="value">{car.specs.engine}</span>
              </div>
              <div className="spec-item">
                <span className="label">Công suất:</span>
                <span className="value">{car.specs.power}</span>
              </div>
              <div className="spec-item">
                <span className="label">Hộp số:</span>
                <span className="value">{car.specs.gearbox}</span>
              </div>
              <div className="spec-item">
                <span className="label">Tăng tốc (0-100):</span>
                <span className="value">{car.specs.acceleration}</span>
              </div>
              <div className="spec-item">
                <span className="label">Vận tốc tối đa:</span>
                <span className="value">{car.specs.topSpeed}</span>
              </div>
              <div className="spec-item">
                <span className="label">Tiêu hao nhiên liệu:</span>
                <span className="value">{car.specs.fuelConsumption}</span>
              </div>
            </div>
          </div>

          <div className="features-section">
            <h3>Tính năng nổi bật</h3>
            <ul className="features-list">
              {car.features.map((feature, idx) => (
                <li key={idx}>✓ {feature}</li>
              ))}
            </ul>
          </div>

          <div className="action-buttons">
            <Link href="/contact" className="btn-contact">📞 Liên hệ tư vấn</Link>
            <Link href="/contact?subject=test-drive" className="btn-test-drive">🚗 Đăng ký lái thử</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
