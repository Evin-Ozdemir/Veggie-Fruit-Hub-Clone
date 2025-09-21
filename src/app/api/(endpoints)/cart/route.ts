import { NextResponse } from "next/server";
import { mockCarts } from "../../utils/mockStorage";

// Tüm sepet içeriğini getir
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "Kullanıcı ID gerekli" },
        { status: 400 }
      );
    }

    // Kullanıcının sepetini bul
    let cart = mockCarts[userId];

    if (!cart) {
      // Sepet bulunamadıysa boş bir sepet oluştur
      cart = {
        _id: `cart_${userId}`,
        userId,
        items: [],
        totalAmount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0,
      };
      mockCarts[userId] = cart;
    }

    return NextResponse.json({ cart });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Sepet bilgileri alınamadı" },
      { status: 500 }
    );
  }
}

// Ürün ekle veya güncelle
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { userId, groceryId, quantity } = data;

    if (!userId || !groceryId) {
      return NextResponse.json(
        { message: "Kullanıcı ID ve Ürün ID gerekli" },
        { status: 400 }
      );
    }

    // Mock grocery data - frontend'teki mock data ile uyumlu
    const mockGroceries = [
      {
        _id: "1",
        name: "Elma",
        price: 15.5,
        photo: "/elma.jpg",
        unit: "kg",
        origin: "Amasya",
        isOrganic: true,
        description: "Taze ve lezzetli Amasya elması",
      },
      {
        _id: "2",
        name: "Muz",
        price: 18.0,
        photo: "/muz.jpg",
        unit: "kg",
        origin: "Ekvador",
        isOrganic: true,
        description: "Tatlı ve besleyici muz",
      },
      {
        _id: "3",
        name: "Portakal",
        price: 14.0,
        photo: "/portakal.jpeg",
        unit: "kg",
        origin: "Mersin",
        isOrganic: true,
        description: "C vitamini deposu portakal",
      },
      {
        _id: "4",
        name: "Armut",
        price: 16.0,
        photo: "/armut.jpg",
        unit: "kg",
        origin: "Bursa",
        isOrganic: true,
        description: "Tatlı ve sulu armut",
      },
      {
        _id: "5",
        name: "Çilek",
        price: 25.0,
        photo: "/cilek.png",
        unit: "kg",
        origin: "Mersin",
        isOrganic: true,
        description: "Taze ve aromalı çilek",
      },
      {
        _id: "6",
        name: "Kiraz",
        price: 35.0,
        photo: "/kiraz.jpg",
        unit: "kg",
        origin: "Amasya",
        isOrganic: true,
        description: "Tatlı ve kırmızı kiraz",
      },
      {
        _id: "7",
        name: "Üzüm",
        price: 20.0,
        photo: "/uzum.jpg",
        unit: "kg",
        origin: "Manisa",
        isOrganic: true,
        description: "Tatlı ve sulu üzüm",
      },
      {
        _id: "8",
        name: "Karpuz",
        price: 8.0,
        photo: "/karbuz.jpg",
        unit: "kg",
        origin: "Diyarbakır",
        isOrganic: false,
        description: "Sulu ve serinletici karpuz",
      },
      {
        _id: "9",
        name: "Domates",
        price: 12.0,
        photo: "/domates.webp",
        unit: "kg",
        origin: "Antalya",
        isOrganic: false,
        description: "Sulu ve aromalı domates",
      },
      {
        _id: "10",
        name: "Havuç",
        price: 6.5,
        photo: "/havuc.jpg",
        unit: "kg",
        origin: "Konya",
        isOrganic: false,
        description: "Beta karoten zengini havuç",
      },
    ];

    const grocery = mockGroceries.find((g) => g._id === groceryId);

    if (!grocery) {
      return NextResponse.json({ message: "Ürün bulunamadı" }, { status: 404 });
    }

    // Kullanıcının sepetini bul
    let cart = mockCarts[userId];

    if (!cart) {
      // Sepet yoksa yeni bir sepet oluştur
      cart = {
        _id: `cart_${userId}`,
        userId,
        items: [
          {
            _id: `item_${Date.now()}`,
            grocery: grocery,
            quantity,
            price: grocery.price * quantity,
            name: grocery.name,
          },
        ],
        totalAmount: grocery.price * quantity,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0,
      };
    } else {
      // Sepet varsa, ürün sepette var mı kontrol et
      const itemIndex = cart.items.findIndex(
        (item: any) => item.grocery._id === groceryId
      );

      if (itemIndex > -1) {
        // Ürün sepette varsa, miktarı güncelle
        cart.items[itemIndex].quantity = quantity;
        cart.items[itemIndex].price = grocery.price * quantity;
      } else {
        // Ürün sepette yoksa, ekle
        cart.items.push({
          _id: `item_${Date.now()}`,
          grocery: grocery,
          quantity,
          price: grocery.price * quantity,
          name: grocery.name,
        });
      }

      // Toplam tutarı güncelle
      cart.totalAmount = cart.items.reduce(
        (total: number, item: any) => total + item.price,
        0
      );
      cart.updatedAt = new Date().toISOString();
    }

    mockCarts[userId] = cart;

    return NextResponse.json({ cart });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Ürün sepete eklenemedi" },
      { status: 500 }
    );
  }
}

// Sepeti temizle
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "Kullanıcı ID gerekli" },
        { status: 400 }
      );
    }

    if (mockCarts[userId]) {
      mockCarts[userId].items = [];
      mockCarts[userId].totalAmount = 0;
      mockCarts[userId].updatedAt = new Date().toISOString();
    }

    return NextResponse.json({ message: "Sepet boşaltıldı" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Sepet boşaltılamadı" },
      { status: 500 }
    );
  }
}

// Checkout işlemi - cart endpoint'i içinde
export async function PATCH(req: Request) {
  try {
    const data = await req.json();
    const { userId, customerInfo } = data;

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
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Checkout işlemi başarısız" },
      { status: 500 }
    );
  }
}
