"use client";

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  erros: FieldErrors;
}

function Input({
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
  register,
  erros,
}: InputProps) {
  return (
    <div className=" relative w-full">
      {formatPrice && (
        <span className=" absolute text-neutral-700 top-5 left-2">\</span>
      )}
      <input
        className={`w-full p-4 pt-6 font-light bg-white rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${
          formatPrice ? "pl-9" : "pl-4"
        } ${erros[id] ? "border-rose-500" : "border-neutral-300"} ${
          erros[id] ? "focus:border-rose-500" : "focus:border-black"
        }`}
        id={id}
        disabled={disabled}
        placeholder=""
        type={type}
        {...register(id, { required })}
      />
      <label
        className={` absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${
          formatPrice ? "left-9" : "left-4"
        } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
          erros[id] ? "text-rose-500" : "text-zinc-400"
        }`}
      ></label>
    </div>
  );
}

export default Input;
