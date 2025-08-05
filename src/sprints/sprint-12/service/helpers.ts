import { Stock } from "../../types/types";

export const groupProduct = (ids: number[]) => {
    return ids.reduce((acc, id) => {
        const product = acc.find(p => p.productId === id);
        if (product) {
            product.quantity++;
        } else {
            acc.push({ productId: id, quantity: 1 });
        }
        return acc;
    }, [] as Stock[])
}