// UPDATE_USER_CARTS

import { UPDATE_USER_CARTS } from "../constants";
import { CartDto } from "@/app/types/cartDto";

    export async function update_cart(data_form: CartDto, userId: string | number) {
        try {
            const response = await fetch(UPDATE_USER_CARTS(userId),{
                method: "PUT",
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