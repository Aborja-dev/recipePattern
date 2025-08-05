import { Pricing } from './../types/types';

export class Price {
    constructor(public price: number) {}
    add(price: number) {
        this.price += price;
    }
    minus(price: number) {
        this.price -= price;
    }
}

export const calculate = (price: number, pricing: Pricing): { total: number, totaldiscount: number } => {
    const { discount, bulk, express, local, vip } = pricing;
    let totaldiscount = 0;
    const priceTotal = new Price(price);
    if (vip) {
        totaldiscount = totaldiscount + 0.1;
        priceTotal.minus(totaldiscount);
    };
    if (discount) {
        totaldiscount = totaldiscount + discount;
        priceTotal.minus(totaldiscount);
    };
    if (bulk) {
        totaldiscount = totaldiscount + 0.1;
        priceTotal.minus(totaldiscount);
    };
    if (express) priceTotal.add(price * 0.15);
    if (!local) priceTotal.add(price * 0.15);
    return {
        total: priceTotal.price,
        totaldiscount
    };
}

export const calculateShipping = (price: number, pricing: Pricing ): number => {
    const { express, local, vip } = pricing;
    if (vip) return 0;
    if (express) return price * 0.15;
    if (!local) return price * 0.15;
    return 0;
}