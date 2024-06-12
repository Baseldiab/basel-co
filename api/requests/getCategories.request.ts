import {  CATEGORIES } from "../constants";

    export async function get_all_categories() {
        try {
            const response = await fetch(CATEGORIES, { cache: "no-cache" });
            
            const body = await response.json();
            
            return body;
        } catch (e) {
            console.log(e);
            return {
                data: {},
            };
        }
    }