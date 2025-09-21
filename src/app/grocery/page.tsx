import Hero from "@/app/components/home/hero";
import Products from "@/app/components/home/products";
import Categories from "@/app/components/home/categories";

type SearchParams = {
  search?: string;
  category?: string;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function GroceryPage({ searchParams }: Props) {
  const params = await searchParams;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Hero />
      <Categories />
      <Products searchQuery={params.search} category={params.category} />
    </div>
  );
}