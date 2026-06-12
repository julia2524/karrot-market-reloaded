import TabHeader from "@/components/tab-header";
import { getProducts } from "./actions";
import ProductList from "@/components/product-list";
import AddLink from "@/components/add-link";

export default async function Products() {
  const initialProducts = await getProducts();

  return (
    <div className="relative">
      <TabHeader header="홈" />
      <ProductList initialProducts={initialProducts} />
      <div className="sticky bottom-24 flex justify-end px-5">
        <AddLink link="/products/add" />
      </div>
    </div>
  );
}
