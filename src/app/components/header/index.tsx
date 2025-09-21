"use client";

import Link from "next/link";
import { FaShoppingCart, FaListAlt } from "react-icons/fa";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import SearchForm from "./search-form";
import { getBasket } from "@/app/service/basket-service";
import { userId } from "@/app/utils/constants";
import { useEffect, useState } from "react";

export default function Header() {
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { cart } = await getBasket(userId);
        const quantity = cart.items.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        setTotalQuantity(quantity);
      } catch (error) {
        console.error("Sepet bilgileri alınamadı:", error);
      }
    };

    fetchCart();

    // Custom event listener for cart updates
    const handleCartUpdate = () => {
      fetchCart();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  return (
    <div className="bg-white flex justify-between items-center py-5 px-7 lg:py-6 lg:px-10 shadow-sm">
      <Link
        href="/"
        className="text-green-600 font-bold text-2xl lg:text-3xl flex items-center gap-2"
      >
        <MdOutlineLocalGroceryStore />
        <span>MANAV</span>
      </Link>

      <SearchForm />

      <div className="flex items-center gap-5">
        <Link
          href="/orders"
          className="text-lg text-gray-700 hover:text-green-600 transition flex items-center gap-2"
        >
          <FaListAlt className="text-2xl" />
          <span className="max-md:hidden">Siparişlerim</span>
        </Link>

        <Link
          href="/cart"
          className="text-lg relative text-gray-700 hover:text-green-600 transition flex items-center gap-2"
        >
          <div className="relative">
            <FaShoppingCart className="text-2xl" />
            <span className="absolute shadow-sm text-sm font-bold right-[-20px] top-[-20px] bg-green-500 text-white rounded-full size-6 grid place-items-center">
              {totalQuantity}
            </span>
          </div>
          <span className="max-md:hidden">Sepetim</span>
        </Link>
      </div>
    </div>
  );
}
