import { IOrder, IProduct } from "./types";

// Array de 10 productos
export const products: IProduct[] = [
    { id: 1, name: "Laptop Gaming RTX 4060", price: 1299.99 },
    { id: 2, name: "Mouse Inalámbrico RGB", price: 45.50 },
    { id: 3, name: "Teclado Mecánico Cherry MX", price: 89.99 },
    { id: 4, name: "Monitor 27\" 144Hz", price: 299.99 },
    { id: 5, name: "Auriculares Bluetooth", price: 79.99 },
    { id: 6, name: "Webcam 1080p", price: 65.00 },
    { id: 7, name: "Silla Gaming Ergonómica", price: 249.99 },
    { id: 8, name: "Desk Pad XXL", price: 25.99 },
    { id: 9, name: "Hub USB-C 7 en 1", price: 39.99 },
    { id: 10, name: "Lámpara LED Escritorio", price: 32.50 }
];

// Array de 5 órdenes
export const orders: IOrder[] = [
    {
        id: 1001,
        name: "Orden Gaming Setup Completo",
        items: [1, 2, 3, 4, 5], // Laptop + Mouse + Teclado + Monitor + Auriculares
        priceTotal: 1815.46
    },
    {
        id: 1002, 
        name: "Orden Accesorios Básicos",
        items: [2, 8, 10], // Mouse + Desk Pad + Lámpara
        priceTotal: 103.99
    },
    {
        id: 1003,
        name: "Orden Workstation Profesional", 
        items: [1, 6, 9, 7], // Laptop + Webcam + Hub + Silla
        priceTotal: 1654.97
    },
    {
        id: 1004,
        name: "Orden Periféricos Premium",
        items: [3, 4, 5, 8], // Teclado + Monitor + Auriculares + Desk Pad
        priceTotal: 495.96
    },
    {
        id: 1005,
        name: "Orden Setup Minimalista",
        items: [2, 9, 10], // Mouse + Hub + Lámpara
        priceTotal: 118.48
    }
];