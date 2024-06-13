"use client";
import { useCartStore } from "@/app/store/cart";
import React from "react";
import { successNotification } from "../modals/notifications";
import { CartDto } from "@/app/types/cartDto";
import { ProductModel } from "@/app/types/productModel";
import { Button } from "antd";

export default function ProductDetails({ item }: { item: ProductModel }) {
  // STORE
  const { sendAddToCart } = useCartStore();

  const AddToCart = () => {
    const payload: CartDto = {
      userId: 2,
      date: "2024-6-13",
      products: [{ productId: item.id, quantity: 1 }],
    };

    sendAddToCart(payload, item);
    successNotification("Added to cart successfully");
  };

  return (
    <Button className="mt-2" onClick={() => AddToCart()}>
      Add To Cart
    </Button>
  );
}
