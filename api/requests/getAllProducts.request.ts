import { ALL_PRODUCTS } from "../constants";

    export async function get_all_products() {
        try {
            const response = await fetch(ALL_PRODUCTS, { cache: "no-cache" });
            
            const body = await response.json();
            
            return body;
        } catch (e) {
            console.log(e);
            return {
                data: {},
            };
        }
    }