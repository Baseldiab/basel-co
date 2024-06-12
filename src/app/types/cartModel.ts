import { ProductModel } from "./productModel";

export type CartModel = {
    id: number | string;
    userId: number;
    date: string;
    products: ProductModel[];
}