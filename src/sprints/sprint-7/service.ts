
import { OrdersRepository } from "./modules";
import { ProductsRepository } from "./modules/productRepository";
import { makeClientOrder, makeVIPOrder } from "./service/makeOrder";



// la idea es abtraer lo mas que se pueda las operaciones de modo que siempre se pueda saber en donde cambia cada caso
export const Client = {
    makeOrder: makeClientOrder
}

export const ClientVip = {
    makeOrder: makeVIPOrder
}

const getOrders = () => OrdersRepository.select();
const checkInventory = () => ProductsRepository.selectAll();
export const Manager = {
    verify: getOrders,
    checkInventory
}
