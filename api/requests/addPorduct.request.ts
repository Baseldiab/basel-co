// ADD_NEW_PRODUCT

import { ProductDto } from "@/components/types/productDto";
import { ADD_NEW_PRODUCT } from "../constants";

    export async function add_new_products(data_form: ProductDto) {
        try {
            const response = await fetch(ADD_NEW_PRODUCT,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data_form),
                cache: "no-cache"
            });
            
            const body = await response.json();
            
            return body;
        } catch (e) {
            console.log(e);
            return {
                data: {},
            };
        }
    }