import { CartDto } from "../types/cartDto";
import { CartModel } from "../types/cartModel";

export interface CartState {
    list: CartModel[];
    totalPrice: number;
    sendGetList: () => void;
    sendAdd: (v: CartDto) => void;
    sendUpdate: (v: CartDto & { id: string }) => void;
    sendDelete: (id: string) => void;
  }