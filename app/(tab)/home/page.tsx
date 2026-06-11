import TabHeader from "@/components/tab-header";
import { getProducts } from "./actions";
import ProductList from "@/components/product-list";

export default async function Products() {
  const initialProducts = await getProducts();

  return (
    <>
      <TabHeader header="홈" />
      <ProductList initialProducts={initialProducts} />
    </>
  );
}
