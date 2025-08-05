import { groupProduct } from "../service/helpers"
import { Pricing } from "../types/types";
import { makeOrder } from "./orders/orderService"

const users = [{
    id: 1,
    name: "John Doe",
    country: "Colombia",
    vip: true
}]

type OrderInfo = {
    productIds: number[]
    userId: number
}

type Config = {
    skipInventory: boolean
}

type OrderOptions = {
    discount?: number
    express: boolean
}

export const ShopService = (
    info: OrderInfo,
    options: OrderOptions,
    config?: Config
) => {
    const user = users.find(user => user.id === info.userId);
    const groupProducts = groupProduct(info.productIds);
    const totalAmmount = groupProducts.reduce((acc, product) => acc + product.subtotal, 0);
    const pricing: Pricing = {
        discount: options.discount,
        express: options.express,
        local: user?.country === "Mexico",
        vip: user?.vip,
        bulk: totalAmmount > 10,
    }
    makeOrder({
        ids: info.productIds,
        pricing: pricing,
        skipInventory: config?.skipInventory || false
    });
}