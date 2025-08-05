import { products } from './db';
import { ProductsRepository } from './modules/productRepository';
import { Client, ClientVip, Manager } from './service';


const simulacionesDeVenta = [
   // 1. Caso básico - Cliente normal sin descuentos
   {
       name: "Cliente Básico",
       products: [products[0]],
       isVip: false,
       discount: 0,
       skipInventory: false,
       expectedPrice: 1299.99
   },
   
   // 2. VIP con descuento del 10% automático
   {
       name: "VIP Automático",
       products: [products[1], products[2]], // Mouse + Teclado
       isVip: true,
       discount: 0,
       skipInventory: false,
       expectedPrice: (45.50 + 89.99) * 0.9 // 10% VIP
   },
   
   // 3. Cliente con descuento alto + múltiples productos
   {
       name: "Cliente Multi-Producto",
       products: [products[0], products[1], products[2], products[3]], // Laptop + Mouse + Teclado + Monitor
       isVip: false,
       discount: 0.5,
       skipInventory: false,
       expectedPrice: (1299.99 + 45.50 + 89.99 + 299.99) * 0.5
   },
   
   // 4. VIP con descuento adicional (combinación)
   {
       name: "VIP + Descuento Extra",
       products: [products[4], products[5]], // Auriculares + Webcam
       isVip: true,
       discount: 0.25,
       skipInventory: false,
       expectedPrice: (79.99 + 65.00) * 0.9 * 0.75 // VIP 10% + 25% extra
   },
   
   // 5. Múltiples cantidades del mismo producto
   {
       name: "Cantidad Múltiple",
       products: [products[0], products[0], products[0], products[0]], // 4x Laptop
       isVip: false,
       discount: 0.1,
       skipInventory: false,
       expectedPrice: (1299.99 * 4) * 0.9
   },
   
   // 6. Skip inventory - permite comprar sin stock
   {
       name: "Skip Inventory",
       products: [products[6], products[7], products[8]], // Silla + Desk Pad + Hub
       isVip: true,
       discount: 0,
       skipInventory: true,
       expectedPrice: (249.99 + 25.99 + 39.99) * 0.9
   },
   
   // 7. Caso límite - producto caro con descuento máximo
   {
       name: "Descuento Extremo",
       products: [products[0]], // Laptop más cara
       isVip: true,
       discount: 0.9, // 90% descuento + 10% VIP
       skipInventory: true,
       expectedPrice: 1299.99 * 0.9 * 0.1 // VIP + 90% descuento
   },
   
   // 8. Orden grande mixta (testing de agrupación)
   {
       name: "Orden Mixta Grande",
       products: [products[1], products[1], products[2], products[3], products[3], products[3]], // 2x Mouse + 1x Teclado + 3x Monitor
       isVip: false,
       discount: 0.15,
       skipInventory: false,
       expectedPrice: (45.50 * 2 + 89.99 + 299.99 * 3) * 0.85
   },
   
   // 9. VIP con productos de diferentes precios
   {
       name: "VIP Rango Precios",
       products: [products[0], products[8], products[9]], // Laptop + Hub + Lámpara (caro + barato + medio)
       isVip: true,
       discount: 0.2,
       skipInventory: false,
       expectedPrice: (1299.99 + 39.99 + 32.50) * 0.9 * 0.8
   },
   
   // 10. Cliente normal con skip inventory (testing mode)
   {
       name: "Testing Mode",
       products: [products[4], products[5], products[6], products[7]], // Auriculares + Webcam + Silla + Desk Pad
       isVip: false,
       discount: 0.3,
       skipInventory: true,
       expectedPrice: (79.99 + 65.00 + 249.99 + 25.99) * 0.7
   }
];

// 🧪 Funciones de Testing con Indicadores Visuales
function runBusinessLogicTests() {
   console.log('🧪 ===== SPRINT 7 BUSINESS LOGIC TESTS =====\n');
   
   simulacionesDeVenta.forEach((caso, index) => {
       console.log(`📋 Test ${index + 1}: ${caso.name}`);
       console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
       
       try {
           // Preparar datos
           const ids = caso.products.map(p => p.id);
           const stockAntes = getStockSummary(ids);
           
           // Ejecutar orden
           const order = caso.isVip 
               ? ClientVip.makeOrder({ ids, discount: caso.discount, skipInventory: caso.skipInventory })
               : Client.makeOrder({ ids, discount: caso.discount, skipInventory: caso.skipInventory });
           
           const stockDespues = getStockSummary(ids);
           
           // Validaciones
           testPrecio(order.priceTotal, caso.expectedPrice, caso.name);
           testTipoCliente(order.isVIP, caso.isVip);
           testDescuento(order.discount, caso.isVip, caso.discount);
           testInventario(stockAntes, stockDespues, caso.skipInventory);
           testEstructuraOrden(order, ids);
           
           console.log(`✅ ${caso.name} - PASSED\n`);
           
       } catch (error) {
           console.log(`❌ ${caso.name} - FAILED: ${error.message}\n`);
       }
   });
   
   console.log('🏁 ===== TESTS COMPLETED =====');
}

function testPrecio(actual: number, expected: number, testName: string) {
   const tolerance = 0.01;
   const diff = Math.abs(actual - expected);
   
   if (diff <= tolerance) {
       console.log(`💰 Precio: $${actual.toFixed(2)} ✅`);
   } else {
       console.log(`💰 Precio: $${actual.toFixed(2)} ❌ (esperado: $${expected.toFixed(2)})`);
       throw new Error(`Precio incorrecto en ${testName}`);
   }
}

function testTipoCliente(actualIsVIP: boolean | undefined, expectedIsVIP: boolean) {
   const actual = !!actualIsVIP;
   if (actual === expectedIsVIP) {
       console.log(`👤 Tipo: ${expectedIsVIP ? 'VIP' : 'Normal'} ✅`);
   } else {
       console.log(`👤 Tipo: ${actual ? 'VIP' : 'Normal'} ❌ (esperado: ${expectedIsVIP ? 'VIP' : 'Normal'})`);
       throw new Error(`Tipo de cliente incorrecto`);
   }
}

function testDescuento(actualDiscount: number | undefined, isVip: boolean, additionalDiscount: number) {
   const expected = isVip ? (additionalDiscount > 0 ? additionalDiscount + 0.1 : 0.1) : (additionalDiscount > 0 ? additionalDiscount : undefined);
   
   if (expected === undefined && actualDiscount === undefined) {
       console.log(`🏷️  Descuento: Sin descuento ✅`);
   } else if (expected !== undefined && actualDiscount !== undefined && Math.abs(actualDiscount - expected) < 0.01) {
       console.log(`🏷️  Descuento: ${(actualDiscount * 100).toFixed(0)}% ✅`);
   } else {
       console.log(`🏷️  Descuento: ${actualDiscount ? (actualDiscount * 100).toFixed(0) + '%' : 'undefined'} ❌`);
       throw new Error(`Descuento incorrecto`);
   }
}

function testInventario(stockAntes: any, stockDespues: any, skipInventory: boolean) {
   if (skipInventory) {
       const unchanged = Object.keys(stockAntes).every(id => stockAntes[id] === stockDespues[id]);
       if (unchanged) {
           console.log(`📦 Inventario: Sin cambios (skip) ✅`);
       } else {
           console.log(`📦 Inventario: Cambió cuando no debía ❌`);
           throw new Error(`Inventario cambió con skipInventory=true`);
       }
   } else {
       const changed = Object.keys(stockAntes).some(id => stockAntes[id] !== stockDespues[id]);
       if (changed) {
           console.log(`📦 Inventario: Actualizado ✅`);
       } else {
           console.log(`📦 Inventario: No cambió ❌`);
           throw new Error(`Inventario no se actualizó`);
       }
   }
}

function testEstructuraOrden(order: any, expectedIds: number[]) {
   const hasItems = order.items && order.items.length > 0;
   const hasId = typeof order.id === 'number';
   const hasName = typeof order.name === 'string';
   const hasPrice = typeof order.priceTotal === 'number';
   
   if (hasItems && hasId && hasName && hasPrice) {
       console.log(`📋 Estructura: Completa ✅`);
   } else {
       console.log(`📋 Estructura: Incompleta ❌`);
       throw new Error(`Estructura de orden incorrecta`);
   }
}

function getStockSummary(ids: number[]) {
   const summary: any = {};
   ids.forEach(id => {
       const product = ProductsRepository.selectOne(id);
       if (product) {
           summary[id] = product.quantity;
       }
   });
   return summary;
}

// 🚀 Ejecutar tests
export const runSprint7 = () => runBusinessLogicTests();
