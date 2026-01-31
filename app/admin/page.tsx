"use client";

import { useEffect, useState } from "react";

interface CarForm {
  name: string;
  slug: string;
  image: string;
  gallery: string;
  year: number;
  priceFormatted: string;
  price: number;
  odometer: string;
  category: string;
  brand: string;
  description: string;
  engine: string;
  power: string;
  gearbox: string;
  acceleration: string;
  topSpeed: string;
  fuelConsumption: string;
  features: string;
}

export default function AdminPage() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<CarForm>({
    name: "",
    slug: "",
    image: "/cars/placeholder.jpg",
    gallery: "",
    year: new Date().getFullYear(),
    priceFormatted: "",
    price: 0,
    odometer: "",
    category: "Sedan",
    brand: "",
    description: "",
    engine: "",
    power: "",
    gearbox: "",
    acceleration: "",
    topSpeed: "",
    fuelConsumption: "",
    features: "",
  });
  const [editing, setEditing] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/cars");
    const data = await res.json();
    setCars(data);
    setLoading(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((s) => ({
      ...s,
      [name]: ["year", "price"].includes(name) ? Number(value) : value,
    }));
  }

  async function createOrUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.slug) return alert("Tên và slug bắt buộc!");

    const galleryArray = form.gallery
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    if (galleryArray.length === 0) {
      galleryArray.push(form.image);
    }

    const payload = {
      name: form.name,
      slug: form.slug,
      image: form.image,
      year: form.year,
      price: form.price,
      priceFormatted: form.priceFormatted,
      odometer: form.odometer,
      category: form.category,
      brand: form.brand,
      description: form.description,
      specs: {
        engine: form.engine,
        power: form.power,
        gearbox: form.gearbox,
        acceleration: form.acceleration,
        topSpeed: form.topSpeed,
        fuelConsumption: form.fuelConsumption,
      },
      gallery: galleryArray,
      features: form.features.split("\n").filter((f) => f.trim()),
    };

    if (editing) {
      const res = await fetch(`/api/cars?slug=${editing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) return alert("Cập nhật thất bại");
    } else {
      const res = await fetch(`/api/cars`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) return alert("Thêm thất bại");
    }

    resetForm();
    load();
  }

  function resetForm() {
    setForm({
      name: "",
      slug: "",
      image: "/cars/placeholder.jpg",
      gallery: "",
      year: new Date().getFullYear(),
      priceFormatted: "",
      price: 0,
      odometer: "",
      category: "Sedan",
      brand: "",
      description: "",
      engine: "",
      power: "",
      gearbox: "",
      acceleration: "",
      topSpeed: "",
      fuelConsumption: "",
      features: "",
    });
    setEditing(null);
  }

  function startEdit(c: any) {
    setEditing(c.slug);
    setForm({
      name: c.name,
      slug: c.slug,
      gallery: (c.gallery || []).join("\n"),
      image: c.image,
      year: c.year,
      priceFormatted: c.priceFormatted,
      price: c.price,
      odometer: c.odometer || "",
      category: c.category,
      brand: c.brand,
      description: c.description,
      engine: c.specs?.engine || "",
      power: c.specs?.power || "",
      gearbox: c.specs?.gearbox || "",
      acceleration: c.specs?.acceleration || "",
      topSpeed: c.specs?.topSpeed || "",
      fuelConsumption: c.specs?.fuelConsumption || "",
      features: (c.features || []).join("\n"),
    });
  }

  async function remove(slug: string) {
    if (!confirm("Xóa xe này?")) return;
    const res = await fetch(`/api/cars?slug=${slug}`, { method: "DELETE" });
    if (!res.ok) return alert("Xóa thất bại");
    load();
  }

  const handleDragStart = (slug: string) => {
    setDraggedItem(slug);
    setDragOverIndex(null);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = async (targetSlug: string) => {
    if (!draggedItem || draggedItem === targetSlug) {
      setDraggedItem(null);
      setDragOverIndex(null);
      return;
    }

    const draggedIdx = cars.findIndex((c) => c.slug === draggedItem);
    const targetIdx = cars.findIndex((c) => c.slug === targetSlug);

    if (draggedIdx === -1 || targetIdx === -1) {
      setDraggedItem(null);
      setDragOverIndex(null);
      return;
    }

    // Create new array with reordered items
    const newCars = [...cars];
    const draggedCar = newCars[draggedIdx];
    newCars.splice(draggedIdx, 1);
    newCars.splice(targetIdx, 0, draggedCar);

    // Update order field for all cars
    const updatedCars = newCars.map((car, index) => ({
      ...car,
      order: index + 1,
    }));

    setCars(updatedCars);

    // Save each car's new order to backend
    for (const car of updatedCars) {
      await fetch(`/api/cars?slug=${car.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(car),
      });
    }

    setDraggedItem(null);
    setDragOverIndex(null);
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin - Quản lý xe</h1>
        <p>Thêm / sửa / xóa xe dễ dàng</p>
      </div>

      <div className="admin-grid">
        <section className="admin-form">
          <h2>{editing ? "Sửa xe" : "Thêm xe mới"}</h2>
          <form onSubmit={createOrUpdate}>
            <div className="form-group">
              <h3>Thông tin cơ bản</h3>
              <div className="form-row">
                <label>Tên xe *</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="vd: Mercedes C300" />
              </div>
              <div className="form-row">
                <label>Slug (đường dẫn) *</label>
                <input name="slug" value={form.slug} onChange={handleChange} placeholder="vd: mercedes-c300" />
              </div>
              <div className="form-row">
                <label>Hãng</label>
                <input name="brand" value={form.brand} onChange={handleChange} placeholder="vd: Mercedes-Benz" />
              </div>
              <div className="form-row">
                <label>Loại xe</label>
                <select name="category" value={form.category} onChange={handleChange}>
                  <option>Sedan</option>
                  <option>SUV</option>
                  <option>Bán tải</option>
                  <option>Hatchback</option>
                </select>
              </div>
              <div className="form-row">
                <label>Năm</label>
                <input name="year" type="number" value={form.year} onChange={handleChange} />
              </div>
              <div className="form-row">
                <label>Giá (VNĐ)</label>
                <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="vd: 299000000" />
              </div>
              <div className="form-row">
                <label>Giá hiển thị</label>
                <input name="priceFormatted" value={form.priceFormatted} onChange={handleChange} placeholder="vd: 1.8 tỷ" />
              </div>
              <div className="form-row">
                <label>Odo (số km đã chạy)</label>
                <input name="odometer" value={form.odometer} onChange={handleChange} placeholder="vd: 45,000 km" />
              </div>
              <div className="form-row">
                <label>Hình ảnh chính (path)</label>
                <input name="image" value={form.image} onChange={handleChange} placeholder="vd: /cars/mercedes.jpg" />
              </div>
              <div className="form-row">
                <label>Danh sách hình ảnh (mỗi dòng 1 hình)</label>
                <textarea
                  name="gallery"
                  value={form.gallery}
                  onChange={handleChange}
                  placeholder="/cars/mercedes.jpg&#10;/cars/mercedes-interior.jpg&#10;/cars/mercedes-engine.jpg"
                  rows={4}
                />
              </div>
              <div className="form-row">
                <label>Mô tả</label>
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Mô tả chi tiết về xe" rows={3} />
              </div>
            </div>

            <div className="form-group">
              <h3>Thông số kỹ thuật</h3>
              <div className="form-row">
                <label>Động cơ</label>
                <input name="engine" value={form.engine} onChange={handleChange} placeholder="vd: 2.0L Turbo" />
              </div>
              <div className="form-row">
                <label>Công suất</label>
                <input name="power" value={form.power} onChange={handleChange} placeholder="vd: 255 HP" />
              </div>
              <div className="form-row">
                <label>Hộp số</label>
                <input name="gearbox" value={form.gearbox} onChange={handleChange} placeholder="vd: 9AT" />
              </div>
              <div className="form-row">
                <label>Tăng tốc (0-100)</label>
                <input name="acceleration" value={form.acceleration} onChange={handleChange} placeholder="vd: 6.3s" />
              </div>
              <div className="form-row">
                <label>Vận tốc tối đa</label>
                <input name="topSpeed" value={form.topSpeed} onChange={handleChange} placeholder="vd: 250 km/h" />
              </div>
              <div className="form-row">
                <label>Tiêu hao nhiên liệu</label>
                <input name="fuelConsumption" value={form.fuelConsumption} onChange={handleChange} placeholder="vd: 6.5 L/100km" />
              </div>
            </div>

            <div className="form-group">
              <h3>Tính năng</h3>
              <div className="form-row">
                <label>Tính năng (mỗi dòng 1 tính năng)</label>
                <textarea
                  name="features"
                  value={form.features}
                  onChange={handleChange}
                  placeholder="Hệ thống an toàn ADAS&#10;Nội thất da Nappa&#10;Cửa sổ trời toàn cảnh"
                  rows={5}
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-submit">{editing ? "Cập nhật" : "Thêm xe"}</button>
              {editing && (
                <button type="button" onClick={resetForm} className="btn-cancel">
                  Hủy
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="admin-list">
          <h2>Danh sách xe ({cars.length})</h2>
          {loading ? (
            <p>Đang tải...</p>
          ) : (
            <table className="cars-table">
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Hãng</th>
                  <th>Giá</th>
                  <th>Năm</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cars.map((c, index) => (
                  <tr
                    key={c.slug}
                    draggable
                    onDragStart={() => handleDragStart(c.slug)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={() => handleDrop(c.slug)}
                    className={`draggable-row ${draggedItem === c.slug ? "dragging" : ""} ${dragOverIndex === index ? "drag-over" : ""}`}
                  >
                    <td>📍 {c.name}</td>
                    <td>{c.brand}</td>
                    <td>{c.priceFormatted}</td>
                    <td>{c.year}</td>
                    <td className="actions">
                      <button onClick={() => startEdit(c)} className="btn-edit">Sửa</button>
                      <button onClick={() => remove(c.slug)} className="btn-delete">Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>

      <style jsx>{`
        .admin-page {
          max-width: 1400px;
          margin: 2rem auto;
          padding: 1rem;
          background: #f5f5f5;
          color: #333;
        }
        .admin-header {
          background: linear-gradient(135deg, #2563eb, #1e40af);
          color: white;
          padding: 2rem;
          border-radius: 8px;
          margin-bottom: 2rem;
        }
        .admin-header h1 {
          font-size: 1.75rem;
          margin: 0;
          color: white;
        }
        .admin-header p {
          margin: 0.5rem 0 0;
          opacity: 0.9;
          color: white;
        }
        .admin-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .admin-form h2,
        .admin-list h2 {
          color: #1f2937;
          margin-top: 0;
        }
        .admin-form,
        .admin-list {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .form-group {
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #eee;
        }
        .form-group h3 {
          font-size: 1rem;
          margin: 0 0 1rem;
          color: #2563eb;
        }
        .form-row {
          display: flex;
          flex-direction: column;
          margin-bottom: 0.75rem;
        }
        .form-row label {
          font-weight: 600;
          margin-bottom: 0.25rem;
          font-size: 0.9rem;
          color: #374151;
        }
        input,
        textarea,
        select {
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-family: inherit;
          font-size: 0.9rem;
          color: #1f2937;
          background-color: #fff;
        }
        input::placeholder,
        textarea::placeholder {
          color: #9ca3af;
        }
        input:focus,
        textarea:focus,
        select:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        .form-actions {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
        }
        .btn-submit,
        .btn-cancel {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-submit {
          background: #2563eb;
          color: white;
        }
        .btn-submit:hover {
          background: #1e40af;
        }
        .btn-cancel {
          background: #e5e7eb;
          color: #333;
        }
        .btn-cancel:hover {
          background: #d1d5db;
        }
        .cars-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
          color: #333;
        }
        .cars-table th {
          background: #f9fafb;
          padding: 0.75rem;
          text-align: left;
          border-bottom: 2px solid #e5e7eb;
          font-weight: 600;
          color: #1f2937;
        }
        .cars-table td {
          padding: 0.75rem;
          border-bottom: 1px solid #e5e7eb;
          color: #374151;
        }
        .cars-table tr:hover {
          background: #f9fafb;
        }
        .draggable-row {
          cursor: move;
          user-select: none;
          transition: all 0.2s ease;
        }
        .draggable-row:hover {
          background: #eff6ff;
        }
        .draggable-row.dragging {
          opacity: 0.5;
          background: #dbeafe;
        }
        .draggable-row.drag-over {
          background: #cffafe;
          box-shadow: inset 0 -3px 0 #06b6d4;
          border-bottom: 3px solid #06b6d4;
        }
        .actions {
          display: flex;
          gap: 0.25rem;
        }
        .btn-edit,
        .btn-delete {
          padding: 0.4rem 0.75rem;
          border: none;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-edit {
          background: #3b82f6;
          color: white;
        }
        .btn-edit:hover {
          background: #2563eb;
        }
        .btn-delete {
          background: #ef4444;
          color: white;
        }
        .btn-delete:hover {
          background: #dc2626;
        }

        @media (max-width: 1000px) {
          .admin-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
