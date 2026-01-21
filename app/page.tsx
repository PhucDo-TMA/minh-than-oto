import Header from '@/components/Header';
import CarCard from '@/components/CarCard';


const cars = [
{ id: 1, name: 'Mercedes C300', price: '1.8 tỷ', year: 2022, image: '/cars/mercedes.jpg' },
{ id: 2, name: 'Toyota Fortuner', price: '1.3 tỷ', year: 2021, image: '/cars/fortuner.jpg' },
{ id: 3, name: 'Mazda CX5', price: '900 triệu', year: 2020, image: '/cars/mazda.jpg' },
{ id: 4, name: 'Honda CRV', price: '1.05 tỷ', year: 2021, image: '/cars/crv.jpg' },
{ id: 5, name: 'Ford Ranger', price: '950 triệu', year: 2022, image: '/cars/ranger.jpg' },
];


export default function Home() {
return (
<main className="bg-slate-950 text-white min-h-screen">
<Header />


{/* Hero */}
<section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
<div>
<h1 className="text-4xl md:text-5xl font-bold leading-tight">
Showroom Minh Thân Ô Tô
</h1>
<p className="mt-4 text-gray-300">
Chuyên mua bán xe đã qua kiểm định chất lượng
</p>
<a
href="tel:0342579086"
className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
>
Gọi tư vấn
</a>
</div>



</section>


{/* Featured cars */}
<section className="max-w-7xl mx-auto px-6 pb-20">
<h2 className="text-3xl font-semibold mb-8">Xe nổi bật</h2>
<div className="grid md:grid-cols-3 gap-8">
{cars.map(car => (
<CarCard key={car.id} car={car} />
))}
</div>
</section>
</main>
);
}