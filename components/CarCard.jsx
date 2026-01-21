export default function CarCard({ car }) {
return (
<div className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg">
<img src={car.image} className="h-52 w-full object-cover" />
<div className="p-5">
<h3 className="font-semibold text-xl">{car.name}</h3>
<p className="text-gray-400 mt-1">Năm: {car.year}</p>
<p className="text-blue-400 font-bold mt-2">{car.price}</p>


<button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-xl">
Xem chi tiết
</button>
</div>
</div>
);
}