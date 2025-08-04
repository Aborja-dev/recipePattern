import { Client } from './sprints/sprint1/service';
import { products } from './sprints/sprint1/db';
// soy un cliente y quiero hacer una orden entonces elijo 3 productos de la tienda

const choiceProducts = (ammount: number) => {
    const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, ammount);
    return randomProducts
};

const makeASell = () => {
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

mostrador({
    whatIDo: makeASell
})