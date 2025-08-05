
import { Stock as typeStock } from "../types/types";
import { ProductsRepository } from "./productRepository";


export const Stock = {
    verify: (stockList: typeStock[]): typeStock[] => {
        const stock = stockList.map((stock) => {
            const result = verifyProduct(stock.productId, stock.quantity);
            return {
                ...stock,
                result
            }
        });
        return stock
    },
    update: (stock: typeStock[]): void => {
        stock.forEach(item => {
            const product = ProductsRepository.selectOne(item.productId)
            if (product) {
                ProductsRepository.update(product.id, { quantity: product.quantity - item.quantity });
            }
        })
    }
} 


export const verifyProduct = (id: number, ammount: number) => {
    const isExists = ProductsRepository.selectOne(id)?.quantity;
    if (!isExists) return "El producto no existe"
    const amountInStock = isExists - ammount;
    if (amountInStock < 0) return "No hay suficiente stock";
    return true
}