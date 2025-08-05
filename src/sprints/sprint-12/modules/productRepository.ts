import { products } from "../db";
import { Product } from "../types/types";

export const ProductsRepository = {
    // necesito buscar los productos de una nueva forma?
    selectMany: (ids: number[]): Product[] => {
        return products.filter(product => ids.includes(product.id));
    },
    selectOne: (id: number): Product | null => {
        return products.find(product => product.id === id) ?? null;
    },
    selectAll: () => [...products],
    update: (id: number, product: Partial<Product>) => { 
        const index = products.findIndex(p => p.id === id);
        console.log(`cantidad de productos ${products[index].quantity}`);
        
        if (index !== -1) {
            products[index] = {...products[index], ...product};
            console.log(`se acyualizo el producto con id ${id} ahora es ${products[index].quantity}`);
            
        } else {
            throw new Error(`Product with id ${id} not found.`);
        }
     },

}