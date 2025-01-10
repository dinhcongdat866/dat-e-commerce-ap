import { NextResponse } from 'next/server';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  isFavorite: boolean;
}

const products: Product[] = [
  { id: 1, name: "Premium Headphones", price: 299, image: "images.unsplash.com/photo-1505740420928-5e560c06d30e", isFavorite: false },
  { id: 2, name: "Smart Watch", price: 199, image: "images.unsplash.com/photo-1523275335684-37898b6baf30", isFavorite: false },
  { id: 3, name: "Wireless Earbuds", price: 149, image: "images.unsplash.com/photo-1572569511254-d8f925fe2cbb", isFavorite: false },
  { id: 4, name: "Digital Camera", price: 599, image: "images.unsplash.com/photo-1516035069371-29a1b244cc32", isFavorite: false }
];

export async function GET(): Promise<NextResponse<Product[]>> {
  return NextResponse.json(products);
}