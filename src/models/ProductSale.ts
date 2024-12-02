import { Product } from "@/store/productsSlice";

export interface ProductSale extends Product {
    quantity: number;
}