import { Client, ClientVip, Manager } from './service';
import { products } from './db';
// soy un cliente y quiero hacer una orden entonces elijo 3 productos de la tienda

const choiceProducts = (ammount: number) => {
    const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, ammount);
    return randomProducts
};


const buyProducts = () => {
    // elijo 3 productos
    const _products = [products[0], products[0], products[0]];
    // presento mi tarjeta VIP y el vendedor sabe que soy VIP
    const isVip = false;
    // cuando el cliente llega muestra los objetos y su tarjeta VIP
    const discount = 0.4;
    // 
    const skipInventory = false;
    // 
    return {
        products: _products,
        isVip,
        discount,
        skipInventory
    }
}

const makeASell = () => {
    // literalmente es lo que el cliente muestra
    const { products, isVip, discount, skipInventory } = buyProducts();
    let order = {}
    if (isVip) {
        order = ClientVip.makeOrder({
            ids: products.map(product => product.id),
            discount: discount,
            skipInventory: skipInventory
        });
    } else {
        order = Client.makeOrder({
            ids: products.map(product => product.id),
            discount: discount,
            skipInventory: skipInventory
        });
    }
    // creo la orden
    return order
}

const verifyOrders = () => {
    const orders = Manager.verify();
    return orders
}

const verifyStock = () => {
    const products = Manager.checkInventory();
    return products
}

const mostrador = ({
    whatIDo
}) => {
    return whatIDo()
}
// voy al mostrador a hacer mi compra
export const runSprint7 = () => {
    // El vendedor se encarga de hacer la venta
    
    const venta = mostrador({
        whatIDo: makeASell
    });
    //console.log("El vendedor se hizo la venta", venta);
    // El manager se encarga de ver las ordenes
    const ordenes = mostrador({
        whatIDo: verifyOrders
    });
    //console.log("El manager verifico las ordenes", ordenes);
    // El manager se encarga de ver el stock
    const stock = mostrador({
        whatIDo: verifyStock
    });
    //console.log("El manager verifico el stock", stock);
    
};

/* resultado

    <h1>Orden VIP Orden 1</h1>
    <p>Productos: 1, 4, 9</p>
    <p>Precio total: 1475.973</p>

El vendedor se hizo la venta {
  name: 'Orden 1',
  items: [ 1, 4, 9 ],
  priceTotal: 1475.973,
  isVIP: true,
  id: 6
}
El manager verifico las ordenes [
  {
    id: 1001,
    name: 'Orden Gaming Setup Completo',
    items: [ 1, 2, 3, 4, 5 ],
    priceTotal: 1815.46
  },
  {
    id: 1002,
    name: 'Orden Accesorios Básicos',
    items: [ 2, 8, 10 ],
    priceTotal: 103.99
  },
  {
    id: 1003,
    name: 'Orden Workstation Profesional',
    items: [ 1, 6, 9, 7 ],
    priceTotal: 1654.97
  },
  {
    id: 1004,
    name: 'Orden Periféricos Premium',
    items: [ 3, 4, 5, 8 ],
    priceTotal: 495.96
  },
  {
    id: 1005,
    name: 'Orden Setup Minimalista',
    items: [ 2, 9, 10 ],
    priceTotal: 118.48
  },
  {
    name: 'Orden 1',
    items: [ 1, 4, 9 ],
    priceTotal: 1475.973,
    isVIP: true,
    id: 6
  }
]
*/