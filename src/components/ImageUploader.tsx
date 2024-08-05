import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";

interface ImageUploaderProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUploader = ({ value, onChange }: ImageUploaderProps) => {
  const handleUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset=""
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            className="
            relative
            flex
            flex-col
            items-center
            justify-center
            gap-4
            p-20
            transition
            border-2
            border-dashed
            cursor-pointer
            hover:opacity-70
            border-neutral-300
            text-neutral-300
          "
            onClick={() => open?.()}
          >
            <TbPhotoPlus size={50} />
            {value && (
              <div
                className="
                absolute
                inset-0
                w-full
                h-full
              "
              >
                <Image fill style={{ objectFit: "cover" }} src={value} alt="" />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUploader;
