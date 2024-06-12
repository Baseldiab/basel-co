import { create } from "zustand";
import { get_all_products } from "../../../api/requests/getAllProducts.request";
import { devtools } from "zustand/middleware";
import { CartState } from "../interfaces/cartState";
import { delete_cart } from "../../../api/requests/deleteCart.request";
import { CartDto } from "../types/cartDto";
import { update_cart } from "../../../api/requests/updateCart.request";
import { add_new_cart } from "../../../api/requests/addCart.request";

export const useCartStore = create<CartState>()(
    devtools(
      (set, get) => ({
            list: [],
          totalPrice: 0,
        sendGetList: async () => {

          const response = await get_all_products();
  
          set({
            list: response,
          });
            
            },

        sendAdd: async (v: CartDto) => {
          const response = await add_new_cart(v);
          const currentList = get().list;
          currentList.unshift(response);
          set({ list: [...currentList] });
            },
        
        sendUpdate: async (v: CartDto & { id: string }) => {
          const response = await update_cart(v, "2");
          const currentList = get().list;
          const foundIndex = currentList.findIndex((e) => e.id === v.id);
          if (foundIndex !== -1) {
            currentList[foundIndex] = response;
            set({ list: [...currentList] });
          }
            },
        
        sendDelete: async (id: string) => {
          await delete_cart(id);
          const currentList = get().list;
          const foundIndex = currentList.findIndex((e) => e.id === id);
          if (foundIndex !== -1) {
            currentList.splice(foundIndex, 1);
            set({ list: [...currentList] });
          }
        },
      }),
    )
  );