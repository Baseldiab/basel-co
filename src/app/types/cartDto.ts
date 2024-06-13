export type CartDto = {
    userId: number;
    date: string;
    products: [
        {
            productId: number |string;
            quantity: number;
        }
    ]
}