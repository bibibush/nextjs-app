import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import client from "@/lib/prismadb";

interface Params {
  productId: string;
}

export async function POST(req: Request, { params }: { params: Params }) {
  const prisma = client;

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { productId } = params;

  if (!productId || typeof productId !== "string") {
    throw new Error("invalid ID");
  }

  let favoriteIds = [...(currentUser.favoriteIds ?? [])];
  favoriteIds.push(productId);

  const user = await prisma?.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  const prisma = client;

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { productId } = params;

  if (!productId || typeof productId !== "string") {
    throw new Error("invalid ID");
  }
  let favoriteIds = [...(currentUser.favoriteIds ?? [])];
  favoriteIds = favoriteIds.filter((id) => id !== productId);

  const user = await prisma?.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}
