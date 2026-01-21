import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Minh Thân Ô Tô"
            width={300}
            height={300}
            className="object-contain"
          />
          <span className="font-bold text-lg">
            MINH THÂN Ô TÔ
          </span>
        </div>

        {/* MENU */}
        <nav className="flex gap-6 text-slate-300">
          <Link href="/">Trang chủ</Link>
          <Link href="/cars">Xe đang bán</Link>
          <Link href="/contact">Liên hệ</Link>
        </nav>
      </div>
    </header>
  );
}
