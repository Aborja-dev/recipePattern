import { orders } from "../db";
import { Order } from "../types/types";


export const OrdersRepository = {
    // cambia la logica para insertar una nueva orden?
    insert: (order: Omit<Order, "id">): Order => {
        const id = orders.length + 1;
        const newOrder = { ...order, id };
        orders.push(newOrder);
        return newOrder
    },
    // cambia la logica para buscar una orden?
    getBy: (id: number) => {
        return orders.find(order => order.id === id);
    },
    select: () => {
        return orders;
    }
}
