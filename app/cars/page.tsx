import CarCard from '@/components/CarCard';


const cars = [
{ name: 'Mercedes C300', year: 2022, price: '1.8 tỷ', image: '/cars/mercedes.jpg' },
{ name: 'Toyota Fortuner', year: 2021, price: '1.3 tỷ', image: '/cars/fortuner.jpg' },
{ name: 'Mazda CX5', year: 2020, price: '900 triệu', image: '/cars/mazda.jpg' },
{ name: 'Honda CRV', year: 2021, price: '1.05 tỷ', image: '/cars/crv.jpg' },
{ name: 'Ford Ranger', year: 2022, price: '950 triệu', image: '/cars/ranger.jpg' },
];


export default function CarsPage() {
return (
<main className="min-h-screen bg-slate-950 text-white px-6 py-16">
<h1 className="text-4xl font-bold mb-10">Danh sách xe đang bán</h1>


<div className="grid md:grid-cols-3 gap-8">
{cars.map((car, i) => (
<CarCard key={i} car={car} />
))}
</div>
</main>
);
}