import { getProducts, searchProducts } from "@/app/service/product-service";
import { Product } from "@/app/types";
import Card from "./card";

type Props = {
  searchQuery?: string;
  category?: string;
};

export default async function Products({ searchQuery, category }: Props) {
  // api'dan ürün verilerini al - arama varsa arama yap, yoksa tüm ürünleri getir
  let groceries;
  
  if (searchQuery) {
    const searchResult = await searchProducts(searchQuery);
    groceries = searchResult.groceries;
  } else {
    const allProducts = await getProducts();
    groceries = allProducts.groceries;
  }

  // Kategori filtresi uygula
  if (category) {
    groceries = groceries.filter((product) => product.category === category);
  }

  // elimdeki diziyi istediğim formatta dönüştürmek için
  const groupedProducts = groceries.reduce<Record<string, Product[]>>(
    (groups, products) => {
      const category = products.category;

      if (!groups[category]) {
        groups[category] = [];
      }

      groups[category].push(products);

      return groups;
    },
    {}
  );

  return (
    <div className="text-black flex flex-col gap-10">
      {(searchQuery || category) && (
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-green-600 mb-2">
            {searchQuery && category 
              ? `"${searchQuery}" için ${category} kategorisinde arama sonuçları`
              : searchQuery 
              ? `"${searchQuery}" için arama sonuçları`
              : `${category} kategorisi`
            }
          </h1>
          <p className="text-gray-600">
            {groceries.length} ürün bulundu
          </p>
        </div>
      )}
      
      {groceries.length === 0 && (searchQuery || category) ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">
            {searchQuery && category 
              ? "Aradığınız ürün bu kategoride bulunamadı"
              : searchQuery 
              ? "Aradığınız ürün bulunamadı"
              : "Bu kategoride ürün bulunamadı"
            }
          </h2>
          <p className="text-gray-500">
            {searchQuery && category 
              ? `"${searchQuery}" için ${category} kategorisinde hiçbir ürün bulunamadı. Farklı anahtar kelimeler veya kategoriler deneyin.`
              : searchQuery 
              ? `"${searchQuery}" için hiçbir ürün bulunamadı. Farklı anahtar kelimeler deneyin.`
              : `${category} kategorisinde hiçbir ürün bulunamadı.`
            }
          </p>
        </div>
      ) : (
        Object.keys(groupedProducts).map((category) => {
          return (
            <div key={category}>
              <h2 className="text-2xl font-bold text-black mb-5">{category}</h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {groupedProducts[category].map((product, index) => (
                  <Card
                    key={product._id}
                    product={product}
                    isPriority={index < 4} // İlk 4 ürüne priority ver
                  />
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
