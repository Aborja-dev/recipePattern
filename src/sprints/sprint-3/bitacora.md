# 📋 **Sprint 3 - Bitácora de Desarrollo**
## *El Primer Compromiso: Cuando la Simplicidad se Pone a Prueba*

---

## 🎯 **Contexto del Sprint**
**Fecha:** Sprint 3  
**Objetivo:** Implementar soporte para clientes VIP sin romper la simplicidad del Sprint 1  
**Filosofía aplicada:** Recipe Pattern + Service Headquarters + Think Simple Do Easy  
**Estado previo:** Sistema perfecto de 15 líneas, cero condicionales

---

## 📋 **Requerimientos Implementados**
- **REQ-006:** Soporte para clientes VIP ✅
- **REQ-007:** Aplicar 10% descuento a clientes VIP ✅  
- **REQ-008:** Email diferenciado para clientes VIP ✅
- **REQ-009:** Marcar órdenes VIP en base de datos ✅

---

## 🎭 **La Decisión Crítica: ¿Parámetro o Receta?**

### **El Momento de la Verdad**
Al enfrentar el primer requerimiento de bifurcación, surgió la decisión arquitectónica más importante del proyecto:

**Opción A - Evolutionary Architecture (La Tentación):**
```typescript
const createOrder = (ids: number[], isVip?: boolean) => {
    const priceTotal = calculateTotal(ids);
    if (isVip) {
        priceTotal = priceTotal * 0.9; // ← El primer compromiso
        // lógica VIP...
    }
    // resto de la lógica...
}
```

**Opción B - Recipe Pattern (El Camino Elegido):**
```typescript
const createOrder = (ids: number[]) => { /* receta original */ }
const createVIPOrder = (ids: number[]) => { /* nueva receta */ }
```

### **Criterio de Decisión: Modelado del Mundo Real**

**Pregunta clave:** *"¿Cómo funciona realmente en una tienda?"*

**Respuesta:** No hay forma de que alguien sea VIP y no-VIP en la misma sesión. Es como la diferencia entre hacer **galletas CON chocolate** (parámetro) vs **galletas DE chocolate** (receta diferente).

**Decisión:** Modelar **identidades por sesión** en lugar de **variaciones de estado**.

---

## 🏗️ **Decisiones Arquitectónicas Detalladas**

### **1. Principio de Identidad por Sesión**
```typescript
export const Client = {
    makeOrder: createOrder
}

export const ClientVip = {
    makeOrder: createVIPOrder
}
```

**Justificación:**
- Un usuario no puede ser ambos en la misma interacción
- Cada contexto tiene su propia "naturaleza" de operación
- Simula el comportamiento real: "muestra tu tarjeta VIP"

**Alternativas descartadas:**
- Factory pattern con parámetros
- Strategy pattern con objetos de descuento
- Single function con múltiples flags

### **2. Gestión de la Duplicación Estratégica**

**Métricas de "Dolor":**
- ✅ Copiar 12 líneas + 1 nueva = **0 dolor**
- ✅ Mantener dos recetas paralelas = **0 dolor cognitivo**
- ✅ Toda la lógica visible en un lugar = **transparencia máxima**

**Regla aplicada:** "Si no duele, no abstraigas"

### **3. Criterio de Abstracción por Volatilidad**

**Análisis de componentes:**

| Componente | Volatilidad | Decisión | Justificación |
|------------|-------------|----------|---------------|
| **Cálculo descuento** | Baja (solo números) | Inline | `* 0.9` es estable, fácil de cambiar |
| **Templates email** | Alta (colores, logos) | Abstraído | Variabilidad visual compleja |
| **Lógica de negocio** | Media | En service | Mantiene transparencia |

```typescript
// ❌ Abstracción innecesaria
const DiscountCalculator = { applyVip: (amount) => amount * 0.9 }

// ✅ Inline transparente  
const discount = priceTotal * 0.1;

// ✅ Abstracción justificada
const EmailTemplates = {
    vip: ({ name, items, priceTotal }) => `<h1>Orden VIP ${name}</h1>...`
}
```

### **4. Naive Modules Mantenidos**

**Decisión:** Los repositorios permanecieron intactos

```typescript
// Sin cambios necesarios - módulos siguen siendo "ingenuos"
ProductsRepository.selectMany(ids) // Busca lo que puede, no pregunta por qué
OrdersRepository.insert(order)     // Guarda lo que recibe, confía en el service
```

**Beneficio:** Estabilidad de los módulos base, cambios solo en la orchestación.

---

## 📈 **Métricas del Sprint**

### **Código**
| Métrica | Sprint 1 | Sprint 3 | Impacto |
|---------|----------|----------|---------|
| **Líneas función principal** | ~15 | ~12 cada receta | ✅ Mantenido |
| **Complejidad ciclomática** | 1 | 1 cada función | ✅ Sin condicionales |
| **Archivos nuevos** | 0 | 1 (modules.ts mejorado) | ✅ Crecimiento mínimo |
| **Navegación requerida** | 1 archivo | 1 archivo | ✅ Transparencia preservada |

### **Desarrollo**
| Métrica | Valor | Observación |
|---------|-------|-------------|
| **Tiempo implementación** | < Tiempo simulación | El código real fue más rápido que el mock |
| **Confianza en la dirección** | 8/10 | Alta satisfacción con el enfoque |
| **Módulos modificados** | 0 repositorios | Solo orchestación cambió |

---

## 🧠 **Proceso de Decisión: "Radar de Dolor"**

### **Señales de Cuando NO Abstraer:**
- ✅ "¿Copiar 12 líneas duele?" → **NO**
- ✅ "¿Cambiar un número duele?" → **NO** 
- ✅ "¿Navegar archivos duele?" → **NO** (todo está ahí)

### **Señales Futuras para Abstraer:**
- ❌ **5+ funciones con código idéntico** → Abstraer
- ❌ **Recetas muy largas** → Dividir
- ❌ **Cambios sincronizados frecuentes** → Centralizar

### **Criterio Central:**
> *"¿Esto hace que evolucionar sea menos doloroso?"*

---

## ✨ **Estado del Sistema Post-Sprint 3**

### **Lo que sigue funcionando perfectamente:**
- ✅ **Transparencia total** - La lógica completa visible en cada receta
- ✅ **Naive modules estables** - Repositorios no requirieron cambios
- ✅ **Cero navegación arqueológica** - Todo entendible en un archivo
- ✅ **Simplicidad cognitiva** - Un junior puede entender cada receta independientemente

### **Nuevas capacidades sin compromiso:**
- ✅ Soporte VIP completo con descuentos
- ✅ Templates de email diferenciados
- ✅ Marcado de órdenes en base de datos
- ✅ **Cero condicionales en la lógica de negocio**

---

## 🔬 **Validación de Hipótesis**

### **Hipótesis Validadas:**
1. ✅ **Recipe Pattern mantiene simplicidad:** Resistió el primer "if"
2. ✅ **Duplicación estratégica > Abstracción prematura:** Menos dolor, más claridad
3. ✅ **Modelado por sesión es intuitivo:** Refleja el mundo real

### **Hipótesis Pendientes:**
1. 🔄 **¿Cuántas recetas antes de abstraer?** (Próximos sprints lo dirán)
2. 🔄 **¿Explosión combinatoria manejable?** (Sprint 7+ será la prueba)
3. 🔄 **¿Escalabilidad del patrón?** (Requerimientos complejos pendientes)

---

## 🚨 **Riesgos Identificados**

### **Riesgo: Explosión Combinatoria**
**Próximos requerimientos potenciales:**
- Cliente + VIP + Internacional + Bulk = ¿12 combinaciones?

**Estrategia:** Aplicar el "radar de dolor" para detectar cuándo abstraer

### **Riesgo: Pérdida de DRY**
**Situación:** Misma lógica en múltiples recetas

**Mitigación:** Solo abstraer cuando **5+ funciones** repiten código idéntico

---

## 🔮 **Proyecciones para Sprint 7**

### **Requerimientos entrantes esperados:**
- REQ-010: Descuentos personalizados (% configurable)
- REQ-012: Control de inventario
- REQ-016: Órdenes internacionales

### **Pregunta crítica:**
**¿El Recipe Pattern resistirá la primera explosión combinatoria real?**

**Hipótesis:** El patrón aguantará hasta ~Sprint 7, donde las combinaciones forzarán la primera abstracción mayor.

---

## 📝 **Lecciones Aprendidas**

### **1. Modelado del Dominio > Optimización Técnica**
El pensar "¿cómo funciona en la vida real?" generó mejor diseño que "¿cómo optimizo el código?"

### **2. El "Dolor" como Métrica de Diseño**
Usar incomodidad real (tiempo, confusión, miedo) como señal es más efectivo que seguir principios abstractos.

### **3. Duplicación Estratégica es Válida**
12 líneas duplicadas + claridad > abstracción prematura + complejidad

### **4. Volatilidad Predictiva Funciona**
Abstraer templates (volátiles) vs mantener inline descuentos (estables) fue acertado.

---

## 🎯 **Experimento: Estado Actual**

**Calificación general del Sprint 3:** ⭐⭐⭐⭐⭐ (8/10)

**Razones del éxito:**
- ✅ Resistió la tentación del "pequeño if"
- ✅ Mantuvo la transparencia del Sprint 1
- ✅ Añadió funcionalidad sin complejidad
- ✅ El tiempo de desarrollo fue menor que la simulación

**Próximo hito crítico:** Sprint 7 - La prueba de fuego de la explosión combinatoria.

---

**Próximo Sprint:** Sprint 7 - "Solo Unas Features Más"  
**Estado del experimento:** 🟢 **ÉXITO CONFIRMADO**

> *"El Recipe Pattern no solo resistió el primer compromiso, sino que demostró que la duplicación estratégica puede ser más simple que la abstracción prematura. La arquitectura sigue siendo transparente y el desarrollo más rápido que crear mocks. El experimento continúa..."*