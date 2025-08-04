import { Client } from './service';
import { products } from './db';
// soy un cliente y quiero hacer una orden entonces elijo 3 productos de la tienda

const choiceProducts = (ammount: number) => {
    const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, ammount);
    return randomProducts
};

const buyProducts = () => {
    // elijo 3 productos
    const products = choiceProducts(3);
    // creo la orden
    const order = Client.makeOrder(products.map(product => product.id));
    console.log(order);
}

const mostrador = ({
    whatIDo
}) => {
    whatIDo()
}
// voy al mostrador a hacer mi compra
export const runSprint1 = () => mostrador({ whatIDo: buyProducts });