import { PricingEngine} from './../../modules/pricingCalculator';
import { Stock } from "../../modules/stockManager";
import { ProductsRepository } from "../../modules/productRepository";
import { OrdersRepository } from "../../modules/orderRepository";
import { emailSender } from "../../modules/emailBuilder";
import { Pricing, Stock as typeStock } from "../../types/types";
import { groupProduct } from "../helpers";

export const makeOrder = ({
    ids,
    pricing,
    skipInventory
}: {
    ids: number[],
    pricing: Pricing,
    skipInventory: boolean
}) => {
    // agrupar los productos
    const groupedProducts = groupProduct(ids);
    // verificar el inventario
    const productList: typeStock[] = skipInventory
        ? groupedProducts
        : Stock.verify(groupedProducts);
    // Obtener los productos del repositorio
    const productsIds = productList.map(product => product.productId);
    const products = ProductsRepository.selectMany(productsIds);
    // Calcular los subtotales
    const subTotalList = productList.map(product => {
        const productInfo = products.find(p => p.id === product.productId);
        if (!productInfo) throw new Error(`Product with id ${product.productId} not found.`);
        return {
            ...product,
            subtotal: productInfo.price * product.quantity
        }
    })
    // Calcular el precio total
    const price = subTotalList.reduce((total, product) => total + product.subtotal, 0);
    // Calcular el precio con  descuento
    const { total, totalDiscount } = PricingEngine.calculate(price, pricing);
    // Calcular costo de envio
    const {total: shippingCost} = PricingEngine.calculate(price, {
        express: pricing.express,
        local: pricing.local,
        vip: pricing.vip
    });
    // Insertar la orden en la base de datos
    const order = OrdersRepository.insert(
        { 
            name: `Orden ${Date.now()}`, 
            items: ids, 
            priceTotal: total, 
            discount: totalDiscount,
            shipping: shippingCost
        });
    // Enviar la orden por email
    if (pricing.vip) emailSender.send(order, "vip");
    else emailSender.send(order, "normal");
    return order   
}