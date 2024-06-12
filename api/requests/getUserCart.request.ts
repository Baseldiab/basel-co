import { GET_USER_CARTS } from "../constants";

export async function get_user_carts(productId: string | number) {
    try {
        const response = await fetch(GET_USER_CARTS(productId), { cache: "no-cache" });
        
        const body = await response.json();
        
        return body;
    } catch (e) {
        console.log(e);
        return {
            data: {},
        };
    }
}