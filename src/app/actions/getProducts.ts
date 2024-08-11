import prisma from "@/lib/prismadb";

export interface ProductsParams {
  latitude?: number;
  longitude?: number;
  category?: string;
}

export default async function getProducts(params: ProductsParams) {
  try {
    const { latitude, longitude, category } = params;

    let query: any = {};

    if (category) {
      query.category = category;
    }

    if (latitude) {
      query.latitude = {
        gte: latitude - 0.01,
        lte: latitude + 0.01,
      };
    }
    if (longitude) {
      query.longitude = {
        gte: longitude - 0.01,
        lte: longitude + 0.01,
      };
    }

    const products = await prisma.product.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      data: products,
    };
  } catch (err: any) {
    throw new Error(err);
  }
}
