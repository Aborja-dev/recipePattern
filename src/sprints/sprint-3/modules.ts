import { orders, products } from "./db";
import { IOrder } from "./types";
const EmailTemplates = {
    normal: ({
        name,
        items,
        priceTotal
    }) => `
    <h1>Orden ${name} para </h1>
    <p>Productos: ${items.join(", ")}</p>
    <p>Precio total: ${priceTotal}</p>
    `,
    vip: ({
        name,
        items,
        priceTotal
    }) => `
    <h1>Orden VIP ${name}</h1>
    <p>Productos: ${items.join(", ")}</p>
    <p>Precio total: ${priceTotal}</p>
    `
}
// los modulos son solo acciones que se pueden hacer para lograr la funcionalidad
export const ProductsRepository = {
    // necesito buscar los productos de una nueva forma?
    selectMany: (ids: number[]) => {
        return products.filter(product => ids.includes(product.id));
    }
}

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

export const emailSender = {
    send: (order: IOrder, type: string) => {
        const template = EmailTemplates[type];
        console.log(template(order));
    }
};