
import { emailSender, OrdersRepository } from "./modules";
import { ProductsRepository } from "./modules/productRepository";
import { IOrder, IProduct } from "./types";

const checkInventory = (ids: number[]) => {
    const products = ProductsRepository.selectMany(ids);
    return products.map((products) => {
        const result = verifyStock(products.id, 1);
        return {
            ...products,
            stock: result
        }
    });
}

const verifyStock = (id: number, ammount: number) => {
    const isExists = ProductsRepository.selectOne(id)?.quantity;
    if (!isExists) return "El producto no existe"
    const amountInStock = isExists - ammount;
    if (amountInStock < 0) return "No hay suficiente stock";
    return true
}

const makeOrder = (products: IProduct[]): Omit<IOrder, "id"> => {
    // Calcular el precio total
    const priceTotal = products.reduce((total, product) => total + product.price, 0);
    // Insertar la orden en la base de datos
    const order = {
        name: `Orden ${new Date().getTime()}`,
        items: products.map(product => product.id),
        priceTotal
    };
    return order
};
type ProductStock = IProduct & { stock: boolean | string };
const updateStock = (stock: ProductStock[]) => {
    stock.forEach(product => {
        if (product.stock === true) {
            ProductsRepository.update(product.id, {
                ...product,
                quantity: product.quantity - 1
            });
        }
    })
}

// la idea es abtraer lo mas que se pueda las operaciones de modo que siempre se pueda saber en donde cambia cada caso
export const Client = {
    makeOrder: (ids: number[], discount: number = 0) => {
        const stock = checkInventory(ids);
        // Obtener solo los productos que tienen stock
        const products = stock.filter(product => product.stock === true);
        const orderRaw = makeOrder(products);
        const discountedPrice = orderRaw.priceTotal * (1 - discount);
        const order = OrdersRepository.insert({
            ...orderRaw,
            priceTotal: discountedPrice
        })
        updateStock(stock);
        emailSender.send(order, "normal");
        return order
    }
}

export const ClientVip = {
    makeOrder: (ids: number[], discount: number = 0) => {
        const stock = checkInventory(ids);
        // Obtener solo los productos que tienen stock
        const products = stock.filter(product => product.stock === true);
        const orderRaw = makeOrder(products);
        const discountedPrice = orderRaw.priceTotal * (1 - discount);
        const vipDiscount =  discountedPrice * (1 - 0.1);
        const order = OrdersRepository.insert({
            ...orderRaw,
            priceTotal: vipDiscount,
            isVIP: true
        })
        emailSender.send(order, "vip");
        updateStock(stock);
        return order
    }
}

const getOrders = () => OrdersRepository.select();

export const Manager = {
    verify: getOrders
}
