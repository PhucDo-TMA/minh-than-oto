export default function Header() {
return (
<header className="border-b border-slate-800">
<div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
<div className="flex items-center gap-2">
<img src="/logo.png" className="h-10" />
<span className="font-bold text-lg">MINH THÂN Ô TÔ</span>
</div>


<nav className="flex gap-6">
<a className="hover:text-blue-400">Trang chủ</a>
<a className="hover:text-blue-400">Xe đang bán</a>
<a className="hover:text-blue-400">Liên hệ</a>
</nav>
</div>
</header>
);
}