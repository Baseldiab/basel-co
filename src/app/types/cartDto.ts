export type CartDto = {
    userId: number;
    date: string;
    products: [
        {
            productId: number;
            quantity: number;
        }
    ]
}