"use client";

import { useState, FormEvent, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface FormData {
  name: string;
  phone: string;
  subject: string;
  message: string;
}

function ContactPageContent() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const subject = searchParams.get("subject");
    if (subject === "test-drive") {
      setFormData((prev) => ({
        ...prev,
        subject: "test-drive",
      }));
    }
  }, [searchParams]);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to send message");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Lỗi: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Liên hệ với chúng tôi</h1>
        <p>Chúng tôi luôn sẵn sàng lắng nghe từ bạn</p>
      </div>

      <div className="contact-container">
        {/* Contact Info */}
        <aside className="contact-info">
          <div className="info-card">
            <div className="icon">📍</div>
            <h3>Địa chỉ</h3>
            <p>507 QL1A, KP18, Bình Tân</p>
            <p>Thành phố Hồ Chí Minh, Vietnam</p>
          </div>

          <div className="info-card">
            <div className="icon">📞</div>
            <h3>Điện thoại</h3>
            <p>
              <a href="tel:0936211276">0936 211 276 (Thân)</a>
            </p>
          </div>

          <div className="info-card">
            <div className="icon">✉️</div>
            <h3>Email</h3>
            <p>
              <a href="mailto:dohuuphuc5678@gmail.com">dohuuphuc5678@gmail.com</a>
            </p>
          </div>

          <div className="info-card">
            <div className="icon">⏰</div>
            <h3>Giờ làm việc</h3>
            <p>Thứ 2 - Chủ nhật: 7:00 - 22:00</p>
          </div>
        </aside>

        {/* Contact Form */}
        <main className="contact-form-wrapper">
          {submitted && (
            <div className="success-message">
              ✓ Cảm ơn bạn! Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Họ và tên *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Nhập họ và tên của bạn"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Số điện thoại *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="0123 456 789"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Chủ đề</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Chọn chủ đề</option>
                <option value="inquiry">Tư vấn mua xe</option>
                <option value="test-drive">Đăng ký lái thử</option>
                <option value="service">Dịch vụ bảo dưỡng</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Tin nhắn *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="form-input form-textarea"
                placeholder="Nhập tin nhắn của bạn..."
                rows={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-submit"
            >
              {loading ? "Đang gửi..." : "Gửi tin nhắn"}
            </button>
          </form>
        </main>
      </div>

      {/* Map section */}
      <section className="map-section">
        <h2>Vị trí của chúng tôi</h2>
        <iframe
          src="https://maps.google.com/maps?q=Bình%20Tân&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="map-iframe"
        />
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="contact-page"><p>Đang tải...</p></div>}>
      <ContactPageContent />
    </Suspense>
  );
}