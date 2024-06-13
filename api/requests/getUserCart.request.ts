import { GET_USER_CARTS } from "../constants";

export async function get_user_carts() {
    try {
        const response = await fetch(GET_USER_CARTS(), { cache: "no-cache" });
        
        const body = await response.json();
        
        return body;
    } catch (e) {
        console.log(e);
        return {
            data: {},
        };
    }
}