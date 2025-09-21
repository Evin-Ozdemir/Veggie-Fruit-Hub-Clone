import { NextResponse } from "next/server";
import { mockCarts } from "../../utils/mockStorage";

// Mock checkout - gerçek ödeme sistemi olmadan test için

export async function POST(req: Request) {
  try {
    // İstek gövdesinden gelen veriyi al
    const data = await req.json();

    // Sepetten satın alınıyorsa
    if (data.userId) {
      return handleCartCheckout(data);
    }

    return NextResponse.json(
      { message: "Geçersiz istek formatı" },
      { status: 400 }
    );
  } catch (error) {
    console.log("HATA!:", error);
    return NextResponse.json({ message: "Bir hata oluştu" }, { status: 500 });
  }
}

// Sepetten toplu satın alma işlemi - Mock versiyon
async function handleCartCheckout(data: any) {
  const { userId, customerInfo } = data;

  console.log("Checkout - userId:", userId);
  console.log("Checkout - mockCarts:", Object.keys(mockCarts));
  console.log("Checkout - cart:", mockCarts[userId]);

  if (!userId) {
    return NextResponse.json(
      { message: "Kullanıcı ID gerekli" },
      { status: 400 }
    );
  }

  // Kullanıcının sepetini bul
  const cart = mockCarts[userId];

  if (!cart || cart.items.length === 0) {
    return NextResponse.json(
      { message: "Sepet boş veya bulunamadı" },
      { status: 404 }
    );
  }

  // Mock ödeme URL'i - gerçek ödeme sistemi olmadan test için
  const mockPaymentUrl = `http://localhost:3000/success?userId=${userId}&total=${cart.totalAmount}`;

  // Sepeti temizle
  mockCarts[userId] = {
    _id: `cart_${userId}`,
    userId,
    items: [],
    totalAmount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  };

  // Mock ödeme URL'ini döndür
  return NextResponse.json({ url: mockPaymentUrl });
}
