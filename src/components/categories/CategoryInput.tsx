import React from "react";
import { IconType } from "react-icons";

interface CategoryInputProps {
  selected?: boolean;
  label: string;
  Icon: IconType;
  path: string;
  onClick: (value: string) => void;
}

const CategoryInput = ({
  selected,
  label,
  Icon,
  path,
  onClick,
}: CategoryInputProps) => {
  return (
    <div
      className={`
        rounded-xl border-2 p-4 flex flex-col gap-3
         hover:border-orange-500 transition cursor-pointer ${selected ? "border-orange-500" : "border-neutral-200"}
         `}
      onClick={() => onClick(path)}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
