"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";

export default function SearchForm() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/grocery?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex gap-2 py-2 px-4 rounded-full border border-zinc-300 md:w-1/2"
    >
      <button 
        type="submit"
        className="text-xl text-zinc-700 hover:text-green-600 transition-colors"
      >
        <CiSearch />
      </button>

      <input
        type="text"
        placeholder="Bir ürün veya kategori arayın"
        className="w-full outline-none text-zinc-800"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
}
