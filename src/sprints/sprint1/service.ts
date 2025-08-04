import { OrdersRepository, ProductsRepository } from "./modules";
import { IOrder } from "./types";

const createOrder = (ids: number[]): IOrder => {
    // Obtener los productos del repositorio
    const products = ProductsRepository.selectMany(ids);    
    // Calcular el precio total
    const priceTotal = products.reduce((total, product) => total + product.price, 0);
    // Insertar la orden en la base de datos
    const order = OrdersRepository.insert({ name: "Orden 1", items: ids, priceTotal });
    console.log('email enviado');
    return order
};

export const Client = {
    makeOrder: createOrder
}