import { orders, products } from "./db";
import { IOrder } from "./types";

// los modulos son solo acciones que se pueden hacer para lograr la funcionalidad


export const OrdersRepository = {
    // cambia la logica para insertar una nueva orden?
    insert: (order: Omit<IOrder, "id">): IOrder => {
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

