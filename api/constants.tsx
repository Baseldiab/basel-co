const BASE_URL = "https://fakestoreapi.com";

// PRODUCTS
export const ALL_PRODUCTS = `${BASE_URL}/products`;
export const SINGLE_PRODUCT = (id: string | number) => `${BASE_URL}/products/${id}`;
export const ADD_NEW_PRODUCT = `${BASE_URL}/products`;

// CATEGORIES
export const CATEGORIES = `${BASE_URL}/products/categories`;
export const CATEGORY_PRODUCTS = (category: string) => `${BASE_URL}/products/category/${category}`;

// CART
// GET CART FOR USER WITH ID = "2"
export const GET_USER_CARTS = (userId: string | number = "2") => `${BASE_URL}/carts/user/${userId}`;

export const UPDATE_USER_CARTS = (cartId: string | number) => `${BASE_URL}/carts/${cartId}`;
export const ADD_NEW_CART = `${BASE_URL}/carts`;
export const DELETE_USER_CARTS = (cartId: string | number) => `${BASE_URL}/carts/${cartId}`;
