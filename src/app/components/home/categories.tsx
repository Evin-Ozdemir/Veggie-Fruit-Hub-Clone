"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { BiSolidOffer } from "react-icons/bi";
import { FaLeaf } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

export default function Categories() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const productCategories = [
    { name: "Meyveler", icon: "🍎" },
    { name: "Sebzeler", icon: "🥕" },
    { name: "Kuruyemişler", icon: "🥜" },
    { name: "Bakliyatlar", icon: "🫘" },
    { name: "Süt Ürünleri", icon: "🥛" },
    { name: "İçecekler", icon: "🥤" },
    { name: "Doğal Ürünler", icon: "🍯" },
    { name: "Yeşillikler", icon: "🌿" },
  ];

  const features = [
    {
      icon: <MdLocalShipping className="text-4xl text-blue-600" />,
      title: "Hızlı Teslimat",
      description: "Aynı gün teslimat",
      bgColor: "bg-blue-50",
    },
    {
      icon: <FaLeaf className="text-4xl text-green-600" />,
      title: "Taze Ürünler",
      description: "Günlük taze ürünler",
      bgColor: "bg-green-50",
    },
    {
      icon: <BiSolidOffer className="text-4xl text-orange-600" />,
      title: "Özel Fiyatlar",
      description: "En uygun fiyatlar",
      bgColor: "bg-orange-50",
    },
    {
      icon: <FaLeaf className="text-4xl text-purple-600" />,
      title: "Organik Ürünler",
      description: "Doğal ve organik",
      bgColor: "bg-purple-50",
    },
  ];

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (currentCategory === category) {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`/grocery?${params.toString()}`);
  };

  return (
    <div className="mt-10 mb-8">
      {/* Product Categories */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Kategoriler</h2>
        <div className="flex flex-wrap gap-2">
          {productCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                currentCategory === category.name
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-green-600 hover:text-green-600"
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((option, key) => (
          <div
            key={key}
            className={`flex items-center gap-3 p-4 rounded-lg ${option.bgColor}`}
          >
            {option.icon}

            <div>
              <h3 className="font-medium text-gray-800">{option.title}</h3>
              <p className="text-sm text-gray-600">{option.description}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
