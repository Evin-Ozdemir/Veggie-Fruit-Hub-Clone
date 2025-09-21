import { Order } from "@/app/types";
import Image from "next/image";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const getStatusText = (status: string) => {
    switch (status) {
      case "processing":
        return "Hazırlanıyor";
      case "shipped":
        return "Kargoda";
      case "delivered":
        return "Teslim Edildi";
      case "cancelled":
        return "İptal Edildi";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Sipariş #{order._id.slice(-6)}
          </h3>
          <p className="text-sm text-gray-600">
            {new Date(order.orderDate).toLocaleDateString("tr-TR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
            order.status
          )}`}
        >
          {getStatusText(order.status)}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        {order.items.map((item) => (
          <div key={item._id} className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden">
              <Image
                src={item.grocery.photo}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">{item.name}</h4>
              <p className="text-sm text-gray-600">
                {item.quantity} adet × {item.price / item.quantity}₺
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-800">{item.price}₺</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <p>Toplam: {order.items.length} ürün</p>
            {order.deliveryDate && (
              <p>
                Teslim:{" "}
                {new Date(order.deliveryDate).toLocaleDateString("tr-TR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-green-600">
              {order.totalAmount}₺
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
