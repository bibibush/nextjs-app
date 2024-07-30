"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface HookFormParams {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();

  const { control, handleSubmit } = useForm<HookFormParams>({
    defaultValues: { email: "", password: "" },
  });

  const [isLoading, setLoading] = useState<boolean>(false);

  const onSubmit = async (body: HookFormParams) => {
    setLoading(true);
    try {
      // @ts-ignore
      const data = await signIn("credentials", body);
      console.log(data);
    } catch (err) {
      console.log(err);
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
        <h1 className="text-2xl">Login</h1>
        <Input
          control={control}
          id="email"
          label="Email"
          disabled={isLoading}
          name="email"
          required
        />
        <Input
          control={control}
          id="password"
          label="Password"
          disabled={isLoading}
          name="password"
          type="password"
          required
        />
        <Button label="Login" />
        <div className="text-center">
          <p className="text-gray-400">
            Not a member?{" "}
            <Link href="/auth/register" className="text-black hover:underline">
              Register
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}
