import { ProductsRepository } from "../modules/productRepository";
import { IProduct } from "../types";

export type IStock = {
    productId: number,
    quantity: number
}

export const Stock= {
    verify: (stockList: IStock[]) => {
        const stock = stockList.map((stock) => {
            const result = verifyProduct(stock.productId, stock.quantity);
            return {
                ...stock,
                result
            }
        });
        return stock
    },
    update: (stock: IStock[]) => {
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