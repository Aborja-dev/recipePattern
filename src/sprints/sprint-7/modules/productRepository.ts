import { products } from "../db";
import { IProduct } from "../types";

export const ProductsRepository = {
    // necesito buscar los productos de una nueva forma?
    selectMany: (ids: number[]): IProduct[] => {
        return products.filter(product => ids.includes(product.id));
    },
    selectOne: (id: number): IProduct | null => {
        return products.find(product => product.id === id) ?? null;
    },
    selectAll: () => [...products],
    update: (id: number, product: Partial<IProduct>) => { 
        const index = products.findIndex(p => p.id === id);

        if (index !== -1) {
            products[index] = {...products[index], ...product};
        } else {
            throw new Error(`Product with id ${id} not found.`);
        }
     },

}