// DELETE_USER_CARTS

import { DELETE_USER_CARTS } from "../constants";

    export async function delete_cart( cartId: string | number) {
        try {
            const response = await fetch(DELETE_USER_CARTS(cartId),{
                method: "DELETE",
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