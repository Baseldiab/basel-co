import { CATEGORY_PRODUCTS } from "../constants";

export async function get_category_products(categoryName: string) {
    try {
        const response = await fetch(CATEGORY_PRODUCTS(categoryName), { cache: "no-cache" });
        
        const body = await response.json();
        
        return body;
    } catch (e) {
        console.log(e);
        return {
            data: {},
        };
    }
}