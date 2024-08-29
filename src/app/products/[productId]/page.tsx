import getCurrentUser from "@/app/actions/getCurrentUser";
import getProductById from "@/app/actions/getProductById";
import EmptyState from "@/components/EmptyState";
import React from "react";
import ProductClient from "./ProductClient";

export interface Params {
  productId?: string;
}

const ProductPage = async ({ params }: { params: Params }) => {
  const product = await getProductById(params);
  const currentUser = await getCurrentUser();

  if (!product) {
    return <EmptyState />;
  }

  return <ProductClient currentUser={currentUser} product={product} />;
};

export default ProductPage;
