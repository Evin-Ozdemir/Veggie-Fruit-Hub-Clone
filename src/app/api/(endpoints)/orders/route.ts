import { NextRequest, NextResponse } from "next/server";

// Mock sipariş verileri
const mockOrders = [
  {
    _id: "order_1",
    userId: "evin123",
    items: [
      {
        _id: "item_1",
        grocery: {
          _id: "1",
          name: "Elma",
          photo: "/elma.jpg",
        },
        quantity: 2,
        price: 31.0,
        name: "Elma",
      },
      {
        _id: "item_2",
        grocery: {
          _id: "2",
          name: "Muz",
          photo: "/muz.jpg",
        },
        quantity: 1,
        price: 18.0,
        name: "Muz",
      },
    ],
    totalAmount: 49.0,
    status: "delivered",
    orderDate: "2025-01-10T10:30:00Z",
    deliveryDate: "2025-01-11T14:00:00Z",
    customerInfo: {
      name: "Evin Ozdemir",
      phone: "05559876543",
      deliveryAddress: "Yeşiltepe Mahalle, yaşam Sokak No:45, İzmir",
    },
    __v: 0,
  },
  {
    _id: "order_2",
    userId: "evin123",
    items: [
      {
        _id: "item_3",
        grocery: {
          _id: "8",
          name: "Domates",
          photo: "/domates.webp",
        },
        quantity: 3,
        price: 36.0,
        name: "Domates",
      },
      {
        _id: "item_4",
        grocery: {
          _id: "9",
          name: "Havuç",
          photo: "/havuc.jpg",
        },
        quantity: 2,
        price: 13.0,
        name: "Havuç",
      },
    ],
    totalAmount: 49.0,
    status: "processing",
    orderDate: "2025-01-12T15:45:00Z",
    deliveryDate: null,
    customerInfo: {
      name: "Evin Ozdemir",
      phone: "05559876543",
      deliveryAddress: "Yeşiltepe Mahalle, yaşam Sokak No:45, İzmir",
    },
    __v: 0,
  },
  {
    _id: "order_3",
    userId: "evin123",
    items: [
      {
        _id: "item_5",
        grocery: {
          _id: "16",
          name: "Ceviz",
          photo: "/ceviz.webp",
        },
        quantity: 1,
        price: 120.0,
        name: "Ceviz",
      },
    ],
    totalAmount: 120.0,
    status: "shipped",
    orderDate: "2025-01-13T09:20:00Z",
    deliveryDate: "2025-01-14T16:30:00Z",
    customerInfo: {
      name: "Evin Ozdemir",
      phone: "05559876543",
      deliveryAddress: "Yeşiltepe Mahalle, yaşam Sokak No:45, İzmir",
    },
    __v: 0,
  },
];

// Configure cache for this route
export const dynamic = "force-dynamic";

// GET handler for fetching user orders
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "Kullanıcı ID gerekli" },
        { status: 400 }
      );
    }

    // Kullanıcının siparişlerini filtrele
    const userOrders = mockOrders.filter((order) => order.userId === userId);

    // Tarihe göre sırala (en yeni önce)
    userOrders.sort(
      (a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
    );

    return NextResponse.json({ orders: userOrders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "Sipariş verileri alınamadı" },
      { status: 500 }
    );
  }
}

