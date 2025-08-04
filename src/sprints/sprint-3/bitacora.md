# 📋 **Sprint 1 - Bitácora de Desarrollo**
## *El Paraíso Inicial: Cuando Todo Era Simple*

---

## 🎯 **Contexto del Sprint**
**Fecha:** Sprint 1  
**Objetivo:** Implementar funcionalidad básica de procesamiento de órdenes  
**Filosofía aplicada:** Recipe Pattern + Service Headquarters

---

## 📋 **Requerimientos Implementados**
- **REQ-001:** Procesar órdenes básicas ✅
- **REQ-002:** Validar que la orden tenga items ✅  
- **REQ-003:** Calcular total sumando precios ✅
- **REQ-004:** Guardar orden en base de datos ✅
- **REQ-005:** Enviar email de confirmación ✅

---

## 🏗️ **Decisiones Arquitectónicas**

### **1. Service Headquarters**
```typescript
export const Client = {
    makeOrder: createOrder
}
```
**Decisión:** Usar objeto literal como "recetario temático"  
**Razón:** Organizar todas las acciones que puede hacer un cliente en un solo lugar  
**Alternativas consideradas:** Clase, función directa, factory pattern

### **2. Naive Modules (Ingenuos pero no tontos)**
```typescript
ProductsRepository.selectMany: (ids: number[]) => {
    return products.filter(product => ids.includes(product.id));
}
```
**Decisión:** Los módulos confían en sus entradas pero hacen su trabajo honestamente  
**Razón:** Si busca IDs [1,2,999] y 999 no existe, devuelve [1,2] sin especular  
**Principio:** El módulo busca lo que puede encontrar, no valida intenciones

### **3. Responsabilidad de Validación**
**Decisión:** El Service Headquarters maneja las reglas de negocio  
**Razón:** Transparencia - cualquiera que lea `createOrder()` entiende TODA la lógica  
**Evita:** Navegación arqueológica entre múltiples archivos para una regla simple

### **4. Separación Cliente-Servicio**
```typescript
// Cliente: Solo expresa intenciones
const order = Client.makeOrder(products.map(product => product.id));

// Servicio: Resuelve intenciones en realidad
const products = ProductsRepository.selectMany(ids);
```
**Decisión:** Cliente pasa IDs, servicio busca productos  
**Razón:** Simular interacción real - el cliente elige, el servicio ejecuta

---

## 📈 **Métricas del Sprint**

| Métrica | Valor |
|---------|-------|
| **Líneas de código** | ~15 líneas (función principal) |
| **Archivos modificados** | 5 archivos creados |
| **Complejidad ciclomática** | 1 (sin condicionales) |
| **Tiempo estimado de cambio** | < 2 minutos |
| **Navegación requerida** | 1 archivo (service.ts) |

---

## ✨ **Estado del Sistema**

### **Lo que funciona perfectamente:**
- Procesamiento directo de órdenes
- Cálculo automático de totales
- Persistencia en "base de datos"
- Notificación por email (simulada)
- **Código limpio y comprensible**

### **Características del "Paraíso":**
- **Think Simple:** La lógica es directa y fácil de seguir
- **Do Easy:** Modificar esta función toma segundos
- **Transparente:** Todo el flujo visible en un solo lugar
- **Mantenible:** Un junior puede entender y modificar sin miedo

---

## 🔮 **Proyecciones para Sprint 3**

### **Requerimientos entrantes:**
- REQ-006: Soporte para clientes VIP
- REQ-007: Aplicar 10% descuento a clientes VIP  
- REQ-008: Email diferenciado para clientes VIP
- REQ-009: Marcar órdenes VIP en base de datos

### **Decisión crítica esperada:**
**¿Cómo manejar la primera bifurcación de lógica?**

**Opción A - Evolutionary Architecture:**
```typescript
const createOrder = (ids: number[], isVip?: boolean) => {
    // if (isVip) { ... } - El primer compromiso
}
```

**Opción B - Recipe Pattern:**
```typescript
export const Client = {
    makeOrder: createOrder,
    makeVipOrder: createVipOrder  // Nueva receta
}
```

---

## 🎯 **Hipótesis a Validar**

1. **¿El Recipe Pattern mantendrá la simplicidad cuando aparezcan los primeros condicionales?**
2. **¿La duplicación de código será realmente mejor que la abstracción prematura?**
3. **¿En qué momento la "transparencia" se volverá "verbosidad"?**

---

## 📝 **Notas del Desarrollador**

> *"Este es exactamente el momento que todos recordamos con nostalgia. 15 líneas elegantes que hacen exactamente lo que necesitamos. La tentación será mantener esta función y solo 'añadir un pequeño if' en el Sprint 3. Veremos si el Recipe Pattern puede resistir esa tentación."*

---

**Próximo Sprint:** Sprint 3 - "El Primer Compromiso"  
**Estado del experimento:** 🟢 **ÉXITO TOTAL**