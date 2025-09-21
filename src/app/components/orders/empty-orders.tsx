import { RiFileList3Line } from "react-icons/ri";
import Link from "next/link";

export default function EmptyOrders() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <RiFileList3Line className="text-4xl text-gray-400" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Henüz Siparişiniz Yok
        </h1>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          İlk siparişinizi vermek için ürünlerimizi inceleyin ve sepetinize ekleyin.
        </p>
        
        <Link
          href="/grocery"
          className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          <span>Alışverişe Başla</span>
        </Link>
      </div>
    </div>
  );
}

