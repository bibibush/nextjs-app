"use client";

import Button from "@/components/Button";
import { categories } from "@/components/categories/Categories";
import CategoryInput from "@/components/categories/CategoryInput";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ImageUploader from "@/components/ImageUploader";
import Input from "@/components/Input";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const KakaoMap = dynamic(() => import("@/components/KakaoMap"), {
  ssr: false,
});

export interface UseHookFormParams {
  title: string;
  description: string;
  category: string;
  latitude: number;
  longitude: number;
  imageSrc: string;
  price: number;
}

export default function ProductUploadPage() {
  const router = useRouter();

  const [isLoading, setLoading] = useState<boolean>(false);

  const { control, reset, handleSubmit, setValue, watch } =
    useForm<UseHookFormParams>({
      defaultValues: {
        title: "",
        description: "",
        category: "",
        latitude: 33.5563,
        longitude: 126.79581,
        imageSrc: "",
        price: 1,
      },
    });

  const imageSrc = watch("imageSrc");
  const category = watch("category");
  const latitude = watch("latitude");
  const longitude = watch("longitude");

  const onSubmit: SubmitHandler<UseHookFormParams> = (data) => {
    setLoading(true);
    axios
      .post("/api/products", data)
      .then((res) => {
        router.push(`/products/${res.data.id}`);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const setCustomValue = (id: keyof UseHookFormParams, value: any) => {
    setValue(id, value);
  };

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <form
          className="
          flex
          flex-col
          gap-8
        "
          onSubmit={handleSubmit(onSubmit)}
        >
          <Heading title="Product Upload" subtitle="Upload your product" />
          <ImageUploader
            value={imageSrc}
            onChange={(value) => {
              setCustomValue("imageSrc", value);
            }}
          />
          <Input
            control={control}
            id="title"
            label="Title"
            disabled={isLoading}
            name="title"
            rules={{ required: true }}
          />
          <hr />
          <Input
            control={control}
            id="description"
            label="Description"
            disabled={isLoading}
            name="description"
            rules={{ required: true }}
          />
          <hr />
          <Input
            control={control}
            id="price"
            label="Price"
            formatPrice
            disabled={isLoading}
            name="price"
            rules={{ required: true }}
          />
          <hr />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] pb-1 overflow-y-auto">
            {categories.map((item) => (
              <div key={item.label} className="col-span-1">
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === item.path}
                  label={item.label}
                  Icon={item.icon}
                  path={item.path}
                />
              </div>
            ))}
          </div>
          <hr />
          <KakaoMap
            latitude={latitude}
            longitude={longitude}
            setCustomValue={setCustomValue}
          />

          <Button label="상품 생성하기" />
        </form>
      </div>
    </Container>
  );
}
