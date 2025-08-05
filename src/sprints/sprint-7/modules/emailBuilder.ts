import { IOrder } from "../types";


class EmailTemplate {
    constructor(
        public name: string,
        public type: string,
        public order: IOrder
    ) { }
    private title() {
        if (this.type === "vip") return `<h1>Gracias por tu compra orden VIP ${this.name}</h1>`
        return `<h1>Gracias por tu compra orden ${this.name}</h1>`
    }
    private discountTemplate(discount: number) {
        const discountPrice = this.order.priceTotal * discount;
        return `<p>Has ahorrado ${discountPrice}$ con un descuento del ${discount * 100}%</p>`
    }
    private total() {
        return `<p>Precio total: ${this.order.priceTotal.toFixed(2)}$</p>`
    }
    public build() {
        const discountSection = this.order.discount ? this.discountTemplate(this.order.discount) : "";
        return `
            ${this.title()}
            ${discountSection}
            ${this.total()}
        `
    }
}

export const emailSender = {
    send: (order: IOrder, type: string) => {
        const template = new EmailTemplate(order.name, type, order);
        console.log(template.build());
    }
};