import TabHeader from "@/components/tab-header";
import { getProducts } from "./actions";
import ProductList from "@/components/product-list";
import AddLink from "@/components/add-link";

export const metadata = {
  title: "홈",
};

export default async function Products() {
  const initialProducts = await getProducts();

  return (
    <div className="relative flex flex-col min-h-screen max-w-screen-sm mx-auto">
      <TabHeader header="홈" />
      <div className="flex-grow">
        <ProductList initialProducts={initialProducts} />
      </div>
      <div className="fixed bottom-24 w-full max-w-screen-sm px-5 flex justify-end">
        <AddLink link="/add" />
      </div>
    </div>
  );
}
