import { getOrders } from "@/app/service/order-service";
import { userId } from "@/app/utils/constants";
import OrderCard from "@/app/components/orders/order-card";
import EmptyOrders from "@/app/components/orders/empty-orders";

export default async function OrdersPage() {
  const { orders } = await getOrders(userId);

  if (!orders || orders.length === 0) {
    return <EmptyOrders />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Siparişlerim ({orders.length})
      </h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
}

