// ADD_NEW_CART

import { ADD_NEW_CART } from "../constants";
import { CartDto } from "@/app/types/cartDto";

    export async function add_new_cart(data_form: CartDto) {
        try {
            const response = await fetch(ADD_NEW_CART,{
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