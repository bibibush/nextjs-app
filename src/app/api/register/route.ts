import client from "@/lib/prismadb";
import bcrypt from "bcryptjs";
import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const prisma = client;
  const body = await req.json();

  const { email, name, password } = body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const duplicatedEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (duplicatedEmail) {
    return NextResponse.json({ error: "duplicated email" }, { status: 500 });
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
