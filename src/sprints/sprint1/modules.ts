import { orders, products } from "./db";
import { IOrder } from "./types";

export const ProductsRepository = {
    selectMany: (ids: number[]) => {
        return products.filter(product => ids.includes(product.id));
    }
}

export const OrdersRepository = {
    insert: (order: Omit<IOrder, "id">): IOrder => {
        const id = orders.length + 1;
        const newOrder = { ...order, id };
        orders.push(newOrder);
        return newOrder
    },
    getBy: (id: number) => {
        return orders.find(order => order.id === id);
    }
}