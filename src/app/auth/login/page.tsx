"use client";

import Input from "@/components/Input";
import React from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const { control } = useForm();

  return <Input control={control} name="input" id="id" label="label" />;
}
