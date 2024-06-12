import { SINGLE_PRODUCT } from "../constants";

export async function get_single_product(productId: string | number) {
    try {
        const response = await fetch(SINGLE_PRODUCT(productId), { cache: "no-cache" });
        
        const body = await response.json();
        
        return body;
    } catch (e) {
        console.log(e);
        return {
            data: {},
        };
    }
}