import { Product, User } from "@prisma/client";
import React from "react";

interface ProductCardProps {
  currentUser: User | null;
  data: Product;
}

const ProductCard = ({ currentUser, data }: ProductCardProps) => {
  return <div>ProductCard</div>;
};

export default ProductCard;
