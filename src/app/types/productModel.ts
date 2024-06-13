export type ProductModel = {
    id: string;
    title:string;
    price:string;
    category: string;
    description: string;
    image: string;
    quantity?:  number;
    idAddedToCart?: boolean;
    rating: {
        rate: number,
        count: number
    }
}