import { create } from "zustand";
import { get_all_products } from "../../../api/requests/getAllProducts.request";
import { devtools } from "zustand/middleware";
import { ProductsState } from "../interfaces/product.state";
import { get_single_product } from "../../../api/requests/getSingleProduct.request";
import { ProductDto } from "../types/productDto";
import { add_new_products } from "../../../api/requests/addPorduct.request";
import { get_all_categories } from "../../../api/requests/getCategories.request";
import { get_category_products } from "../../../api/requests/getCategoryProducts.request";

export const useProductStore = create<ProductsState>()(
    devtools(
      (set, get) => ({
        list: [],
        categories: [],
        item: null as any,
        sendGetProductsList: async () => {

          const response = await get_all_products();
  
          set({
            list: response,
          });
            
            },
        sendGetCategoriesList: async () => {

          const response = await get_all_categories();
  
          set({
            categories: response,
          });
            
            },
        
        sendGetItem: async (id: string) => {
          const response = await get_single_product(id);
          set({ item: response });
            },
       
            sendGetCategoryProducts: async (category: string) => {
          const response = await get_category_products(category);
          set({ list: response });
            },
        
            sendGetSearchList: async (query: string) => {
                const currentList = get().list;

                const filteredList = currentList.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
                
          set({ list:  filteredList});
            },
        
        sendAdd: async (v: ProductDto) => {
          const response = await add_new_products(v);
          const currentList = get().list;
          currentList.unshift(response);
          set({ list: [...currentList] });
            },
        
        // sendUpdate: async (v: ProductDto & { id: string }) => {
        //   const response = await xPostForm(ADMINS_UPDATE(v.id), v);
        //   const currentList = get().list;
        //   const foundIndex = currentList.findIndex((e) => e.id === v.id);
        //   if (foundIndex !== -1) {
        //     currentList[foundIndex] = response;
        //     set({ list: [...currentList] });
        //   }
        // },
        // sendDelete: async (id: string) => {
        //   await xDelete(ADMINS_DELETE(id));
        //   const currentList = get().list;
        //   const foundIndex = currentList.findIndex((e) => e.id === id);
        //   if (foundIndex !== -1) {
        //     currentList.splice(foundIndex, 1);
        //     set({ list: [...currentList] });
        //   }
        // },
      }),
    //   { enabled: isDevelopment() }
    )
  );