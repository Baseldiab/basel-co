import { create } from "zustand";
import { get_all_products } from "../../../api/requests/getAllProducts.request";
import { devtools } from "zustand/middleware";
import { CartState } from "../interfaces/cartState";
import { delete_cart } from "../../../api/requests/deleteCart.request";
import { CartDto } from "../types/cartDto";
import { update_cart } from "../../../api/requests/updateCart.request";
import { add_new_cart } from "../../../api/requests/addCart.request";
import { get_user_carts } from "../../../api/requests/getUserCart.request";
import { useProductStore } from "./products";
import { ProductModel } from "../types/productModel";

const getInitialCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

// I MAKE THE USER ID IS TO BE "2" FOR ALL CART
export const useCartStore = create<CartState>()(
  devtools((set, get) => ({
    list: [],
    localStorageList: getInitialCart() || [],
    totalPrice: 0,
    sendGetList: async () => {
      const response = await get_user_carts();
      set({
        list: response,
      });
    },

    sendAddToCart: async (v: CartDto, productItem: ProductModel) => {
      const response = await add_new_cart(v);
      const currentList = get().list;
      const currentLocalStorageList = get().localStorageList;
      currentList.unshift(response);

      const products = useProductStore.getState().list;
      const foundProduct = products.find((e) => e.id.toString() === productItem.id.toString());
      if (foundProduct) {
        foundProduct.quantity = Number(foundProduct.quantity) + 1;
      } else {
        const productClone = { ...productItem, quantity: 1 };
        currentLocalStorageList.push(productClone);
      }
      localStorage.setItem("cart", JSON.stringify(currentLocalStorageList));


      set({
        list: [...currentList],
        localStorageList: [...currentLocalStorageList]
       });
    },
    sendUpdateCart: async (v, productId: string, qty: number) => {
      const response = await update_cart(v, "2");

      const products = useProductStore.getState().list;
      const currentList = get().localStorageList;
      const foundIndex = products.findIndex((item) => item.id === productId);
      if (foundIndex !== -1) {
        currentList[foundIndex].quantity = qty;
        set({
          localStorageList: [...currentList],
        });
      }
      localStorage.setItem("cart", JSON.stringify(currentList));
    },

    sendDeleteItemCart: async (id: string) => {
      await delete_cart(id);
      
      const currentList = get().localStorageList;
      const foundIndex = currentList.findIndex((e) => e.id === id);
      if (foundIndex !== -1) {
        currentList.splice(foundIndex, 1);
        set({ localStorageList: [...currentList] });
      }
    },
    
    calculateTotalPrice:  () => {
      const currentList = get().localStorageList;
      const totalPrice = currentList.reduce((acc: number, product) => {
        acc +=( Number(product.price) * Number(product.quantity));
        return acc;
      }, 0);

      set({ totalPrice: totalPrice });
    },
  }))
);
