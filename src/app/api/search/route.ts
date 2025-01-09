import { NextRequest, NextResponse } from "next/server";

interface ProductType {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface SearchProductsResponse {
  total: number;
  page: number;
  limit: number;
  products: ProductType[];
}

const products: ProductType[] = [
  { id: 1, name: "Laptop", price: 1000, image: "images.unsplash.com/photo-1505740420928-5e560c06d30e" },
  { id: 2, name: "Smartphone", price: 800, image: "images.unsplash.com/photo-1523275335684-37898b6baf30" },
  { id: 3, name: "Tablet", price: 500, image: "images.unsplash.com/photo-1572569511254-d8f925fe2cbb" },
  { id: 4, name: "Headphones", price: 200, image: "images.unsplash.com/photo-1572569511254-d8f925fe2cbb" },
  { id: 5, name: "Headphones1", price: 201, image: "images.unsplash.com/photo-1572569511254-d8f925fe2cbb" },
  { id: 6, name: "Headphones2", price: 202, image: "images.unsplash.com/photo-1572569511254-d8f925fe2cbb" },
  { id: 7, name: "Headphones3", price: 203, image: "images.unsplash.com/photo-1572569511254-d8f925fe2cbb" },
  { id: 8, name: "Headphones4", price: 204, image: "images.unsplash.com/photo-1572569511254-d8f925fe2cbb" },
  { id: 9, name: "Headphones5", price: 205, image: "images.unsplash.com/photo-1572569511254-d8f925fe2cbb" },
  { id: 10, name: "Headphones6", price: 206, image: "images.unsplash.com/photo-1572569511254-d8f925fe2cbb" },
  { id: 11, name: "Headphones7", price: 207, image: "images.unsplash.com/photo-1572569511254-d8f925fe2cbb" },
  { id: 12, name: "Headphones8", price: 208, image: "images.unsplash.com/photo-1572569511254-d8f925fe2cbb" },
  { id: 13, name: "Headphones9", price: 209, image: "images.unsplash.com/photo-1572569511254-d8f925fe2cbb" },
  { id: 14, name: "Headphones10", price: 210, image: "images.unsplash.com/photo-1572569511254-d8f925fe2cbb" },
];

export async function GET(req: NextRequest): Promise<NextResponse<SearchProductsResponse>> {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  if (query.trim() === "") {
    return NextResponse.json({
      total: 0,
      page,
      limit,
      products: [],
    });
  }

  const filteredProducts = products.filter((product: ProductType) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return NextResponse.json({
    total: filteredProducts.length,
    page,
    limit,
    products: paginatedProducts,
  });
}
