"use client";

import { Product, User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import HeartButton from "../HeartButton";
import { fromNow } from "@/lib/dayjs";

interface ProductCardProps {
  currentUser: User | null;
  data: Product;
}

const ProductCard = ({ currentUser, data }: ProductCardProps) => {
  const router = useRouter();

  return (
    <div
      className="col-span-1 cursor-pointer group"
      onClick={() => {
        router.push(`/products/${data.id}`);
      }}
    >
      <div className="flex flex-col w-full gap-2">
        <div className="relative w-full overflow-hidden group aspect-square rounded-xl">
          <Image
            src={data.imageSrc}
            fill
            sizes="auto"
            className="object-cover w-full h-full transition group-hover:scale-110"
            alt="product"
          />
          <div className="absolute top-3 right-3">
            <HeartButton productId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="text-lg font-semibold">{data.title}</div>
        <div className="font-light text-neutral-500">{data.category}</div>
        <div className="flex flex-row items-center justify-between gap-1">
          <div>
            {data.price} <span className="font-light">원</span>
          </div>
          <div>{fromNow(data.createdAt)}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
