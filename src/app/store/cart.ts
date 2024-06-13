import { create } from "zustand";
// import { get_all_products } from "../../../api/requests/getAllProducts.request";
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
    localStorageList: [] ,
    totalPrice: 0,
    sendGetList: async () => {
      const response = await get_user_carts();
      const cart = localStorage.getItem("cart");
      if (cart) {
        set({
          localStorageList: JSON.parse(cart),
        });
      }else {set({
        localStorageList: [],
      });
      }
      set({
        list: response,
      });
    },

    sendAddToCart: async (v: CartDto, productItem: ProductModel) => {
      try {
        const response = await add_new_cart(v);
        const currentList = get().list;
        const currentLocalStorageList = get().localStorageList;
    
        currentList.unshift(response);
    
        const products = useProductStore.getState().list;
        const foundProduct = currentLocalStorageList.find((e) => e.id.toString() === productItem.id.toString());
    
        console.log("Products:", products);
        console.log("Found Product:", foundProduct);
    
        if (foundProduct) {
          foundProduct.quantity = Number(foundProduct.quantity) + 1;
          console.log("Updated found product quantity:", foundProduct.quantity);
        } else {
          const productClone = { ...productItem, quantity: 1, idAddedToCart: true };
          currentLocalStorageList.push(productClone);
          console.log("Added new product to localStorageList:", productClone);
        }
    
        console.log("LocalStorageList before setting to localStorage:", currentLocalStorageList);
        localStorage.setItem("cart", JSON.stringify(currentLocalStorageList));
        console.log("Updated localStorage");
    
        set({
          list: [...currentList],
          localStorageList: [...currentLocalStorageList]
        });
        console.log("Updated state");
      } catch (error) {
        console.error("Error in sendAddToCart:", error);
      }
    },

    sendUpdateCart: async (v, productId: string, qty: number) => {
      const response = await update_cart(v, "2");

      // const products = useProductStore.getState().list;
      const currentList = get().localStorageList;
      const foundIndex = currentList.findIndex((item) => item.id === productId);
      if (foundIndex !== -1) {
        currentList[foundIndex].quantity = qty;
        set({
          localStorageList: [...currentList],
        });
      }
      localStorage.setItem("cart", JSON.stringify(currentList));
    },

    sendDeleteItemCart: async (id: string) => {
      // await delete_cart(id);
      
      const currentList = get().localStorageList;
      const foundIndex = currentList.findIndex((e) => e.id === id);
      if (foundIndex !== -1) {
        currentList.splice(foundIndex, 1);
        set({ localStorageList: [...currentList] });
      localStorage.setItem("cart", JSON.stringify(currentList));

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
