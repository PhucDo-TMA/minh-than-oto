import Header from "@/components/Header";
import CarCard from "@/components/CarCard";

const cars = [
  {
    name: "Mercedes C300",
    year: 2022,
    price: "1.8 tỷ",
    image: "/cars/mercedes.jpg",
  },
  {
    name: "Toyota Fortuner",
    year: 2021,
    price: "1.3 tỷ",
    image: "/cars/fortuner.jpg",
  },
  {
    name: "Mazda CX5",
    year: 2020,
    price: "900 triệu",
    image: "/cars/mazda.jpg",
  },
  {
    name: "Honda CRV",
    year: 2021,
    price: "1.05 tỷ",
    image: "/cars/crv.jpg",
  },
  {
    name: "Ford Ranger",
    year: 2022,
    price: "950 triệu",
    image: "/cars/ranger.jpg",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <Header />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold mb-4">
          Showroom Minh Thân Ô Tô
        </h1>
        <p className="text-slate-300 mb-6">
          Chuyên mua bán xe đã qua kiểm định chất lượng
        </p>

        <a
          href="tel:0342579086"
          className="inline-block bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          Gọi tư vấn
        </a>
      </section>

      {/* XE */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold mb-10">Xe nổi bật</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {cars.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </div>
      </section>
    </main>
  );
}
