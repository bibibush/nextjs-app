"use client";

import React from "react";
import { Control, useController } from "react-hook-form";

interface InputProps {
  control: Control;
  defaultValue?: string;
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  rules?: object;
  name: string;
}

function Input({
  control,
  defaultValue,
  id,
  label,
  type,
  disabled,
  formatPrice,
  rules,
  name,
}: InputProps) {
  const { field, fieldState } = useController({
    control,
    name,
    defaultValue,
    disabled,
    rules,
  });

  return (
    <div className="relative w-full">
      {formatPrice && (
        <span className="absolute left-2 top-5 text-neutral-700">\</span>
      )}
      <input
        className={`
          w-full 
          rounded-md
          bg-white 
          p-4 
          pt-6 
          font-light 
          outline-none
          transition 
          disabled:cursor-not-allowed
          disabled:opacity-70
          ${formatPrice ? "pl-9" : "pl-4"}
          ${fieldState.error ? "border-rose-500" : "border-neutral-300"}
          ${fieldState.error ? "focus:border-rose-500" : "focus:border-black"}
          `}
        id={id}
        placeholder=""
        type={type}
        {...field}
      />
      <label
        className={`
          text-md
          absolute
          top-5
          z-10
          origin-[0]
          -translate-y-3 
          transform 
          duration-150 
          ${formatPrice ? "left-9" : "left-4"} 
          peer-placeholder-shown:translate-y-0 
          peer-placeholder-shown:scale-100 
          peer-focus:-translate-y-4 
          peer-focus:scale-75 
          ${fieldState.error ? "text-rose-500" : "text-zinc-400"}
          absolute
          whitespace-normal
          `}
      >
        {label}
      </label>
    </div>
  );
}

export default Input;
