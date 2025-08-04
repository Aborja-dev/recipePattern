import { emailSender, OrdersRepository, ProductsRepository } from "./modules";
import { IOrder } from "./types";

const createOrder = (ids: number[]): IOrder => {
    // Obtener los productos del repositorio
    const products = ProductsRepository.selectMany(ids);    
    // Calcular el precio total
    const priceTotal = products.reduce((total, product) => total + product.price, 0);
    // Insertar la orden en la base de datos
    const order = OrdersRepository.insert({ name: "Orden 1", items: ids, priceTotal });
    emailSender.send(order, "normal");
    return order
};

// podemos hacer una validacion para crear la orden pero nunca tendremos un cliente y un vip en la misma sesion

const createVIPOrder = (ids: number[]): IOrder => {
    // Obtener los productos del repositorio
    const products = ProductsRepository.selectMany(ids);    
    // Calcular el precio total
    const priceTotal = products.reduce((total, product) => total + product.price, 0);
    // Los clientes VIP tienen un descuento de 10%
    const discount = priceTotal * 0.1;
    // Insertar la orden en la base de datos
    const order = OrdersRepository.insert({ 
        name: "Orden 1", 
        items: ids, 
        priceTotal: priceTotal - discount,
        isVIP: true 
    });
    emailSender.send(order, "vip");
    return order
};

const getOrders = () => OrdersRepository.select();
/* const verifyClient = (id: number): boolean => {
    return true
}

export const Seller = {
    verifyClient: verifyClient
} */
export const Manager = {
    verify: getOrders
}
export const Client = {
    makeOrder: createOrder
}

export const ClientVip = {
    makeOrder: createVIPOrder
}