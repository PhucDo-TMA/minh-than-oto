import Image from "next/image";

export default function CarCard({ car }) {
  return (
    <div className="bg-slate-900 rounded-xl p-4 shadow">
      <Image
        src={car.image}
        alt={car.name}
        width={400}
        height={250}
        className="rounded-lg object-cover"
      />

      <h3 className="text-lg font-semibold mt-3">{car.name}</h3>
      <p>Năm: {car.year}</p>
      <p className="font-bold text-blue-400">{car.price}</p>

      <button className="mt-3 w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700">
        Xem chi tiết
      </button>
    </div>
  );
}
