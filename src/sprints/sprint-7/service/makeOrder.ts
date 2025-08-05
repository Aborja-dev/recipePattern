import { emailSender, OrdersRepository } from "../modules";
import { ProductsRepository } from "../modules/productRepository";
import { IOrder } from "../types"
import { IStock, Stock } from "./Inventory";
const groupProduct = (ids: number[]) => {
    return ids.reduce((acc, id) => {
        const product = acc.find(p => p.productId === id);
        if (product) {
            product.quantity++;
        } else {
            acc.push({ productId: id, quantity: 1 });
        }
        return acc;
    }, [] as IStock[])
}

export const makeRawOrder = ({
    ids,
    skipInventory
}: {
    ids: number[],
    discount: number,
    skipInventory: boolean
}): Omit<IOrder, "id" | "isVIP" > => {
    // agrupar los productos
    const groupedProducts = groupProduct(ids);
    let productList: IStock[] = []
    // verificar el inventario
    if (!skipInventory) {
        const stock = Stock.verify(groupedProducts.map(product => (
            { productId: product.productId, 
                quantity: product.quantity 
            })));
        productList = stock
    } else {
        productList = groupedProducts
    }
    // Obtener los productos del repositorio
    const productIds = productList.map(product => product.productId);
    const products = ProductsRepository.selectMany(productIds);
    const orderList = productList.map(product => {
      const productInfo = products.find(p => p.id === product.productId);
      if (!productInfo) throw new Error(`Product with id ${product.productId} not found.`);
      const subtotal = productInfo.price * product.quantity;
      return {
        id: product.productId,
        name: productInfo?.name ?? "",
        subtotal,
        quantity: product.quantity
      }  
    })
    // Calcular el precio total
    const priceTotal = orderList.reduce((total, order) => total + order.subtotal, 0);
    return {
        name: `Orden ${new Date().getTime()}`,
        items: orderList,
        priceTotal,
    }
} 

export const makeClientOrder = ({
    ids,
    discount = 0,
    skipInventory = false
}: {
    ids: number[],
    discount: number,
    skipInventory: boolean
}) => {
    const rawOrder = makeRawOrder({ ids, discount, skipInventory });
    // aplicar el descuento
    const priceFinal = rawOrder.priceTotal * (1 - discount);
    // insertar la orden en la base de datos
    const order = OrdersRepository.insert({ ...rawOrder, priceTotal: priceFinal });
    const updateList = order.items.map(item => ({
        productId: item.id,
        quantity: item.quantity
    }))
    Stock.update(updateList);
    emailSender.send(order, "normal");
    return order
}

export const makeVIPOrder = ({
    ids,
    discount = 0,
    skipInventory = false
}: {
    ids: number[],
    discount: number,
    skipInventory: boolean
}) => {
    const rawOrder = makeRawOrder({ ids, discount, skipInventory });
    // aplicar el descuento de 10% para VIP
    const priceVip = rawOrder.priceTotal * (1 - 0.1);
    const priceFinal = priceVip * (1 - discount);
    // insertar la orden en la base de datos
    const order = OrdersRepository.insert({ ...rawOrder, priceTotal: priceFinal });
    emailSender.send(order, "vip");
    const updateList = rawOrder.items.map(item => ({
        productId: item.id,
        quantity: item.quantity
    }))
    Stock.update(updateList);
    return order
}