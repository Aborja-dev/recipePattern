import { ShopService } from "./service"

const simpleOrder = {
    id: 1,
    name: 'Orden 1',
    items: [1, 2, 3],
    priceTotal: 100
}

export const runSprint12 = () => {
    const order = ShopService({
        productIds: [1, 2, 3],
        userId: 1
    }, {
        discount: 0.04,
        express: false,
    })

    console.log(order)
}