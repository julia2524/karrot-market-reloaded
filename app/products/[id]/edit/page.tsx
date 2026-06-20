import { getProduct } from "../actions";
import EditForm from "@/components/edit-form";

export default async function EditProduct({
  params,
}: {
  params: { id: string };
}) {
  const productId = Number(params.id);
  const getProductDetail = await getProduct(productId);
  if (!getProductDetail) return;
  console.log(getProductDetail);

  return <EditForm product={getProductDetail} productId={productId} />;
}
