import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  Icon?: IconType;
}

export default function Button({
  label,
  disabled,
  outline,
  small,
  Icon,
  onClick,
}: ButtonProps) {
  return (
    <button
      type="submit"
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${outline ? "bg-white" : "bg-orange-500"}
        ${outline ? "border-black" : "border-orange-500"}
        ${outline ? "text-black" : "text-white"}
        ${small ? "text-sm" : "text-md"}
        ${small ? "py-1" : "py-3"}
        ${small ? "font-light" : "font-semibold"}
        ${small ? "border-[1px]" : "border-2"}
    `}
      disabled={disabled}
      onClick={onClick}
    >
      {Icon && (
        <Icon
          size={24}
          className="
            absolute
            left-4
            top-3
        "
        />
      )}
      {label}
    </button>
  );
}
