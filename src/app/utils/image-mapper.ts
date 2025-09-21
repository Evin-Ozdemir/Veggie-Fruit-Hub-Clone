// Ürün isimlerini resim dosya isimleriyle eşleştiren mapping
const productImageMap: Record<string, string> = {
  // Meyveler
  elma: "apple.jpg",
  armut: "pear.jpg",
  muz: "banana.jpg",
  portakal: "orange.jpg",
  limon: "lemon.jpg",
  çilek: "strawberry.jpg",
  kiraz: "cherry.jpg",
  üzüm: "grape.jpg",
  karpuz: "watermelon.jpg",
  kavun: "melon.jpg",
  şeftali: "peach.jpg",
  kayısı: "apricot.jpg",
  incir: "fig.jpg",
  nar: "pomegranate.jpg",
  avokado: "avocado.jpg",
  mango: "mango.jpg",
  ananas: "pineapple.jpg",
  kiwi: "kiwi.jpg",

  // Sebzeler
  domates: "tomato.jpg",
  salatalık: "cucumber.jpg",
  patlıcan: "eggplant.jpg",
  biber: "pepper.jpg",
  soğan: "onion.jpg",
  sarımsak: "garlic.jpg",
  havuç: "carrot.jpg",
  patates: "potato.jpg",
  lahana: "cabbage.jpg",
  brokoli: "broccoli.jpg",
  karnabahar: "cauliflower.jpg",
  ıspanak: "spinach.jpg",
  marul: "lettuce.jpg",
  roka: "arugula.jpg",
  maydanoz: "parsley.jpg",
  dereotu: "dill.jpg",
  nane: "mint.jpg",
  fesleğen: "basil.jpg",
  kabak: "zucchini.jpg",
  bamya: "okra.jpg",
  fasulye: "green-beans.jpg",
  bezelye: "peas.jpg",
  mısır: "corn.jpg",
  mantar: "mushroom.jpg",

  // Diğer
  zeytin: "olive.jpg",
  ceviz: "walnut.jpg",
  fındık: "hazelnut.jpg",
  badem: "almond.jpg",
  fıstık: "peanut.jpg",
};

// Ürün ismini normalize eden fonksiyon (türkçe karakterleri düzeltir)
const normalizeProductName = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[çğıöşü]/g, (match) => {
      const map: Record<string, string> = {
        ç: "c",
        ğ: "g",
        ı: "i",
        ö: "o",
        ş: "s",
        ü: "u",
      };
      return map[match] || match;
    })
    .replace(/[^a-z0-9\s]/g, "") // Özel karakterleri kaldır
    .replace(/\s+/g, "-"); // Boşlukları tire ile değiştir
};

// Ürün ismine göre resim URL'ini döndüren fonksiyon
export const getProductImageUrl = (
  productName: string,
  fallbackUrl?: string
): string => {
  // Şimdilik backend'den gelen URL'leri kullan
  if (fallbackUrl) {
    return fallbackUrl;
  }

  // Local resim dosyası mevcutsa onu kullan
  const normalizedName = normalizeProductName(productName);

  // Mevcut local resimler için kontrol
  const availableImages = ["apple", "banana", "tomato", "default"];

  for (const imageName of availableImages) {
    if (
      normalizedName.includes(imageName) ||
      imageName.includes(normalizedName)
    ) {
      return `/images/products/${imageName}.jpg`;
    }
  }

  // Hiçbiri yoksa default resmi kullan
  return "/images/products/default.jpg";
};

// Tüm resim isimlerini döndüren fonksiyon (debug için)
export const getAllImageNames = (): string[] => {
  return Object.values(productImageMap);
};
