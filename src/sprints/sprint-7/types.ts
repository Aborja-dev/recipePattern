export interface IOrder {
    id: number,
    name: string,
    items: {
        id: number,
        quantity: number,
        subtotal: number,
        name: string
    }[],
    priceTotal: number,
    isVIP?: boolean,
    discount?: number
}

export interface IProduct {
    id: number,
    name: string,
    price: number
    quantity: number
}



// crea un array de diez ordenes y diez productos


