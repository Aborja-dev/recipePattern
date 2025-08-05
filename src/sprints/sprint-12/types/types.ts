

export interface Product {
    id: number
    name: string
    price: number
    quantity: number
}
export interface Order {
    id: number
    name: string
    items: number[]
    priceTotal: number
    shipping: number
    discount?: number
}

export interface Pricing {
    vip?: boolean
    discount?: number
    bulk?: boolean
    express?: boolean
    local?: boolean
}

export interface Stock {
    productId: number
    quantity: number
}