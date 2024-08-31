import { User } from "@prisma/client";
import React, { Fragment } from "react";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ProductsHeadProps {
  title: string;
  imgSrc: string;
  id: string;
  currentUser?: User | null;
}

function ProductsHead({ title, imgSrc, id, currentUser }: ProductsHeadProps) {
  return (
    <Fragment>
      <Heading title={title} />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          src={imgSrc}
          fill
          className="object-cover w-full"
          alt="product"
        />
        <div className="absolute top-5 right-5">
          <HeartButton productId={id} currentUser={currentUser} />
        </div>
      </div>
    </Fragment>
  );
}

export default ProductsHead;
