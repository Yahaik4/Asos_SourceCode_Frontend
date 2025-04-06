import { OrderItem } from "./OrderItem";

export interface Order {
    id: number;
    userId: number;
    addressId: number;
    totalPrice: number;
    status: "Pending" | "Completed" | "Cancelled";
    createdAt: string;

    orderItems: OrderItem[];
}
