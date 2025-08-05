export interface IOrder {
    id: number,
    name: string,
    items: number[],
    priceTotal: number,
    isVIP?: boolean
}

export interface IProduct {
    id: number,
    name: string,
    price: number
    quantity: number
}



// crea un array de diez ordenes y diez productos


