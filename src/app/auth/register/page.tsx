"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface HookFormParams {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const router = useRouter();

  const { control, handleSubmit } = useForm<HookFormParams>({
    defaultValues: { name: "", email: "", password: "" },
  });

  const [isLoading, setLoading] = useState<boolean>(false);

  const onSubmit = async (body: HookFormParams) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/register", body);
      router.push("/auth/login");
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid h-[calc(100vh_-_56px)] place-items-center">
      <form
        className="flex flex-col justify-center gap-4 min-w-[350px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl">Register</h1>
        <Input
          control={control}
          id="email"
          label="Email"
          disabled={isLoading}
          name="email"
        />
        <Input
          control={control}
          id="name"
          label="Name"
          disabled={isLoading}
          name="name"
        />
        <Input
          control={control}
          id="password"
          label="Password"
          disabled={isLoading}
          name="password"
          type="password"
        />
        <Button label="Register" />
        <div className="text-center">
          <p className="text-gray-400">
            Already a member?{" "}
            <Link href="/auth/login" className="text-black hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}
