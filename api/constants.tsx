const BASE_URL = "https://fakestoreapi.com";

// PRODUCTS
export const ALL_PRODUCTS = `${BASE_URL}/products`;
export const SINGLE_PRODUCT = (id: string | number) => `${BASE_URL}/products/${id}`;
export const ADD_NEW_PRODUCT = `${BASE_URL}/products`;

// CATEGORIES
export const CATEGORIES = `${BASE_URL}/products/categories`;
export const CATEGORY_PRODUCTS = (category: string) => `${BASE_URL}/products/category/${category}`;

// CART
export const GET_USER_CARTS = (id: string | number) => `${BASE_URL}/carts/user/${id}`;
export const UPDATE_USER_CARTS = (id: string | number) => `${BASE_URL}/carts/${id}`;
export const ADD_NEW_CART = `${BASE_URL}/carts`;
export const DELETE_USER_CARTS = (id: string | number) => `${BASE_URL}/carts/${id}`;
