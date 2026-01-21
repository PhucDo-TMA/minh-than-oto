export default function ContactPage() {
return (
<main className="min-h-screen bg-slate-950 text-white px-6 py-20">
<h1 className="text-4xl font-bold mb-6">Liên hệ</h1>


<p className="mb-2">📞 Hotline: 0342 579 086</p>
<p className="mb-6">📍 Địa chỉ: Quốc lộ 1A, Bình Tân</p>


<iframe
src="https://maps.google.com/maps?q=Bình%20Tân&t=&z=13&ie=UTF8&iwloc=&output=embed"
className="w-full h-[400px] rounded-xl"
/>
</main>
);
}