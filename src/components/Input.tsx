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
           ${erros[id] ? "border-rose-500" : "border-neutral-300"}
           ${erros[id] ? "focus:border-rose-500" : "focus:border-black"}
           `}
        id={id}
        disabled={disabled}
        placeholder=""
        type={type}
        {...register(id, { required })}
      />
      <label
        className={`text-md
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
               ${erros[id] ? "text-rose-500" : "text-zinc-400"}
               absolute
               whitespace-normal
               `}
      ></label>
    </div>
  );
}

export default Input;
